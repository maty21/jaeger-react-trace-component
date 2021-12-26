'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processTemplate = processTemplate;
exports.createTestFunction = createTestFunction;
exports.processLinkPattern = processLinkPattern;
exports.getParameterInArray = getParameterInArray;
exports.getParameterInAncestor = getParameterInAncestor;
exports.computeLinks = computeLinks;
exports.createGetLinks = createGetLinks;

var _uniq2 = require('lodash/uniq');

var _uniq3 = _interopRequireDefault(_uniq2);

var _getConfig = require('../utils/config/get-config');

var _span = require('./span');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parameterRegExp = /#\{([^{}]*)\}/g; //      

// Copyright (c) 2017 The Jaeger Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

function getParamNames(str) {
  var names = new Set();
  str.replace(parameterRegExp, function (match, name) {
    names.add(name);
    return match;
  });
  return Array.from(names);
}

function stringSupplant(str, encodeFn, map) {
  return str.replace(parameterRegExp, function (_, name) {
    var value = map[name];
    return value == null ? '' : encodeFn(value);
  });
}

function processTemplate(template, encodeFn) {
  if (typeof template !== 'string') {
    /*
     // kept on ice until #123 is implemented:
    if (template && Array.isArray(template.parameters) && (typeof template.template === 'function')) {
      return template;
    }
     */
    throw new Error('Invalid template');
  }
  return {
    parameters: getParamNames(template),
    template: stringSupplant.bind(null, template, encodeFn)
  };
}

function createTestFunction(entry) {
  if (typeof entry === 'string') {
    return function (arg) {
      return arg === entry;
    };
  }
  if (Array.isArray(entry)) {
    return function (arg) {
      return entry.indexOf(arg) > -1;
    };
  }
  /*
   // kept on ice until #123 is implemented:
  if (entry instanceof RegExp) {
    return (arg: any) => entry.test(arg);
  }
  if (typeof entry === 'function') {
    return entry;
  }
   */
  if (entry == null) {
    return function () {
      return true;
    };
  }
  throw new Error('Invalid value: ' + entry);
}

var identity = function identity(a) {
  return a;
};

function processLinkPattern(pattern) {
  try {
    var url = processTemplate(pattern.url, encodeURIComponent);
    var text = processTemplate(pattern.text, identity);
    return {
      object: pattern,
      type: createTestFunction(pattern.type),
      key: createTestFunction(pattern.key),
      value: createTestFunction(pattern.value),
      url: url,
      text: text,
      parameters: (0, _uniq3.default)(url.parameters.concat(text.parameters))
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Ignoring invalid link pattern: ' + error, pattern);
    return null;
  }
}

function getParameterInArray(name, array) {
  if (array) {
    return array.find(function (entry) {
      return entry.key === name;
    });
  }
  return undefined;
}

function getParameterInAncestor(name, span) {
  var currentSpan = span;
  while (currentSpan) {
    var result = getParameterInArray(name, currentSpan.tags) || getParameterInArray(name, currentSpan.process.tags);
    if (result) {
      return result;
    }
    currentSpan = (0, _span.getParent)(currentSpan);
  }
  return undefined;
}

function callTemplate(template, data) {
  return template.template(data);
}

function computeLinks(linkPatterns, span, items, itemIndex) {
  var item = items[itemIndex];
  var type = 'logs';
  var processTags = span.process.tags === items;
  if (processTags) {
    type = 'process';
  }
  var spanTags = span.tags === items;
  if (spanTags) {
    type = 'tags';
  }
  var result = [];
  linkPatterns.forEach(function (pattern) {
    if (pattern.type(type) && pattern.key(item.key) && pattern.value(item.value)) {
      var parameterValues = {};
      var allParameters = pattern.parameters.every(function (parameter) {
        var entry = getParameterInArray(parameter, items);
        if (!entry && !processTags) {
          // do not look in ancestors for process tags because the same object may appear in different places in the hierarchy
          // and the cache in getLinks uses that object as a key
          entry = getParameterInAncestor(parameter, span);
        }
        if (entry) {
          parameterValues[parameter] = entry.value;
          return true;
        }
        // eslint-disable-next-line no-console
        console.warn('Skipping link pattern, missing parameter ' + parameter + ' for key ' + item.key + ' in ' + type + '.', pattern.object);
        return false;
      });
      if (allParameters) {
        result.push({
          url: callTemplate(pattern.url, parameterValues),
          text: callTemplate(pattern.text, parameterValues)
        });
      }
    }
  });
  return result;
}

function createGetLinks(linkPatterns, cache) {
  return function (span, items, itemIndex) {
    if (linkPatterns.length === 0) {
      return [];
    }
    var item = items[itemIndex];
    var result = cache.get(item);
    if (!result) {
      result = computeLinks(linkPatterns, span, items, itemIndex);
      cache.set(item, result);
    }
    return result;
  };
}

exports.default = createGetLinks(((0, _getConfig.getConfigValue)('linkPatterns') || []).map(processLinkPattern).filter(Boolean), new WeakMap());