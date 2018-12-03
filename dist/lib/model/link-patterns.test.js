'use strict';

var _linkPatterns = require('./link-patterns');

describe('processTemplate()', function () {
  it('correctly replaces variables', function () {
    var processedTemplate = (0, _linkPatterns.processTemplate)('this is a test with #{oneVariable}#{anotherVariable} and the same #{oneVariable}', function (a) {
      return a;
    });
    expect(processedTemplate.parameters).toEqual(['oneVariable', 'anotherVariable']);
    expect(processedTemplate.template({ oneVariable: 'MYFIRSTVAR', anotherVariable: 'SECOND' })).toBe('this is a test with MYFIRSTVARSECOND and the same MYFIRSTVAR');
  });

  it('correctly uses the encoding function', function () {
    var processedTemplate = (0, _linkPatterns.processTemplate)('this is a test with #{oneVariable}#{anotherVariable} and the same #{oneVariable}', function (e) {
      return '/' + e + '\\';
    });
    expect(processedTemplate.parameters).toEqual(['oneVariable', 'anotherVariable']);
    expect(processedTemplate.template({ oneVariable: 'MYFIRSTVAR', anotherVariable: 'SECOND' })).toBe('this is a test with /MYFIRSTVAR\\/SECOND\\ and the same /MYFIRSTVAR\\');
  });

  /*
  // kept on ice until #123 is implemented:
   it('correctly returns the same object when passing an already processed template', () => {
    const alreadyProcessed = {
      parameters: ['b'],
      template: data => `a${data.b}c`,
    };
    const processedTemplate = processTemplate(alreadyProcessed, a => a);
    expect(processedTemplate).toBe(alreadyProcessed);
  });
   */

  it('reports an error when passing an object that does not look like an already processed template', function () {
    expect(function () {
      return (0, _linkPatterns.processTemplate)({
        template: function template(data) {
          return 'a' + data.b + 'c';
        }
      }, function (a) {
        return a;
      });
    }).toThrow();
    expect(function () {
      return (0, _linkPatterns.processTemplate)({
        parameters: ['b']
      }, function (a) {
        return a;
      });
    }).toThrow();
    expect(function () {
      return (0, _linkPatterns.processTemplate)({}, function (a) {
        return a;
      });
    }).toThrow();
  });
}); // Copyright (c) 2017 The Jaeger Authors.
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

describe('createTestFunction()', function () {
  it('accepts a string', function () {
    var testFn = (0, _linkPatterns.createTestFunction)('myValue');
    expect(testFn('myValue')).toBe(true);
    expect(testFn('myFirstValue')).toBe(false);
    expect(testFn('mySecondValue')).toBe(false);
    expect(testFn('otherValue')).toBe(false);
  });

  it('accepts an array', function () {
    var testFn = (0, _linkPatterns.createTestFunction)(['myFirstValue', 'mySecondValue']);
    expect(testFn('myValue')).toBe(false);
    expect(testFn('myFirstValue')).toBe(true);
    expect(testFn('mySecondValue')).toBe(true);
    expect(testFn('otherValue')).toBe(false);
  });

  /*
  // kept on ice until #123 is implemented:
   it('accepts a regular expression', () => {
    const testFn = createTestFunction(/^my.*Value$/);
    expect(testFn('myValue')).toBe(true);
    expect(testFn('myFirstValue')).toBe(true);
    expect(testFn('mySecondValue')).toBe(true);
    expect(testFn('otherValue')).toBe(false);
  });
   it('accepts a function', () => {
    const mockCallback = jest.fn();
    mockCallback
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true)
      .mockReturnValue(false);
    const testFn = createTestFunction(mockCallback);
    expect(testFn('myValue')).toBe(true);
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith('myValue');
    expect(testFn('myFirstValue')).toBe(false);
    expect(mockCallback).toHaveBeenCalledTimes(2);
    expect(mockCallback).toHaveBeenCalledWith('myFirstValue');
    expect(testFn('mySecondValue')).toBe(true);
    expect(mockCallback).toHaveBeenCalledTimes(3);
    expect(mockCallback).toHaveBeenCalledWith('mySecondValue');
    expect(testFn('otherValue')).toBe(false);
    expect(mockCallback).toHaveBeenCalledTimes(4);
    expect(mockCallback).toHaveBeenCalledWith('otherValue');
  });
   */

  it('accepts undefined', function () {
    var testFn = (0, _linkPatterns.createTestFunction)();
    expect(testFn('myValue')).toBe(true);
    expect(testFn('myFirstValue')).toBe(true);
    expect(testFn('mySecondValue')).toBe(true);
    expect(testFn('otherValue')).toBe(true);
  });

  it('rejects unknown values', function () {
    expect(function () {
      return (0, _linkPatterns.createTestFunction)({});
    }).toThrow();
    expect(function () {
      return (0, _linkPatterns.createTestFunction)(true);
    }).toThrow();
    expect(function () {
      return (0, _linkPatterns.createTestFunction)(false);
    }).toThrow();
    expect(function () {
      return (0, _linkPatterns.createTestFunction)(0);
    }).toThrow();
    expect(function () {
      return (0, _linkPatterns.createTestFunction)(5);
    }).toThrow();
  });
});

describe('getParameterInArray()', function () {
  var data = [{ key: 'mykey', value: 'ok' }, { key: 'otherkey', value: 'v' }];

  it('returns an entry that is present', function () {
    expect((0, _linkPatterns.getParameterInArray)('mykey', data)).toBe(data[0]);
    expect((0, _linkPatterns.getParameterInArray)('otherkey', data)).toBe(data[1]);
  });

  it('returns undefined when the entry cannot be found', function () {
    expect((0, _linkPatterns.getParameterInArray)('myotherkey', data)).toBeUndefined();
  });

  it('returns undefined when there is no array', function () {
    expect((0, _linkPatterns.getParameterInArray)('otherkey')).toBeUndefined();
    expect((0, _linkPatterns.getParameterInArray)('otherkey', null)).toBeUndefined();
  });
});

describe('getParameterInAncestor()', function () {
  var spans = [{
    depth: 0,
    process: {
      tags: [{ key: 'a', value: 'a7' }, { key: 'b', value: 'b7' }, { key: 'c', value: 'c7' }, { key: 'd', value: 'd7' }, { key: 'e', value: 'e7' }, { key: 'f', value: 'f7' }, { key: 'g', value: 'g7' }, { key: 'h', value: 'h7' }]
    },
    tags: [{ key: 'a', value: 'a6' }, { key: 'b', value: 'b6' }, { key: 'c', value: 'c6' }, { key: 'd', value: 'd6' }, { key: 'e', value: 'e6' }, { key: 'f', value: 'f6' }, { key: 'g', value: 'g6' }]
  }, {
    depth: 1,
    process: {
      tags: [{ key: 'a', value: 'a5' }, { key: 'b', value: 'b5' }, { key: 'c', value: 'c5' }, { key: 'd', value: 'd5' }, { key: 'e', value: 'e5' }, { key: 'f', value: 'f5' }]
    },
    tags: [{ key: 'a', value: 'a4' }, { key: 'b', value: 'b4' }, { key: 'c', value: 'c4' }, { key: 'd', value: 'd4' }, { key: 'e', value: 'e4' }]
  }, {
    depth: 1,
    process: {
      tags: [{ key: 'a', value: 'a3' }, { key: 'b', value: 'b3' }, { key: 'c', value: 'c3' }, { key: 'd', value: 'd3' }]
    },
    tags: [{ key: 'a', value: 'a2' }, { key: 'b', value: 'b2' }, { key: 'c', value: 'c2' }]
  }, {
    depth: 2,
    process: {
      tags: [{ key: 'a', value: 'a1' }, { key: 'b', value: 'b1' }]
    },
    tags: [{ key: 'a', value: 'a0' }]
  }];
  spans[1].references = [{
    refType: 'CHILD_OF',
    span: spans[0]
  }];
  spans[2].references = [{
    refType: 'CHILD_OF',
    span: spans[0]
  }];
  spans[3].references = [{
    refType: 'CHILD_OF',
    span: spans[2]
  }];

  it('uses current span tags', function () {
    expect((0, _linkPatterns.getParameterInAncestor)('a', spans[3])).toEqual({ key: 'a', value: 'a0' });
    expect((0, _linkPatterns.getParameterInAncestor)('a', spans[2])).toEqual({ key: 'a', value: 'a2' });
    expect((0, _linkPatterns.getParameterInAncestor)('a', spans[1])).toEqual({ key: 'a', value: 'a4' });
    expect((0, _linkPatterns.getParameterInAncestor)('a', spans[0])).toEqual({ key: 'a', value: 'a6' });
  });

  it('uses current span process tags', function () {
    expect((0, _linkPatterns.getParameterInAncestor)('b', spans[3])).toEqual({ key: 'b', value: 'b1' });
    expect((0, _linkPatterns.getParameterInAncestor)('d', spans[2])).toEqual({ key: 'd', value: 'd3' });
    expect((0, _linkPatterns.getParameterInAncestor)('f', spans[1])).toEqual({ key: 'f', value: 'f5' });
    expect((0, _linkPatterns.getParameterInAncestor)('h', spans[0])).toEqual({ key: 'h', value: 'h7' });
  });

  it('uses parent span tags', function () {
    expect((0, _linkPatterns.getParameterInAncestor)('c', spans[3])).toEqual({ key: 'c', value: 'c2' });
    expect((0, _linkPatterns.getParameterInAncestor)('e', spans[2])).toEqual({ key: 'e', value: 'e6' });
    expect((0, _linkPatterns.getParameterInAncestor)('f', spans[2])).toEqual({ key: 'f', value: 'f6' });
    expect((0, _linkPatterns.getParameterInAncestor)('g', spans[2])).toEqual({ key: 'g', value: 'g6' });
    expect((0, _linkPatterns.getParameterInAncestor)('g', spans[1])).toEqual({ key: 'g', value: 'g6' });
  });

  it('uses parent span process tags', function () {
    expect((0, _linkPatterns.getParameterInAncestor)('d', spans[3])).toEqual({ key: 'd', value: 'd3' });
    expect((0, _linkPatterns.getParameterInAncestor)('h', spans[2])).toEqual({ key: 'h', value: 'h7' });
    expect((0, _linkPatterns.getParameterInAncestor)('h', spans[1])).toEqual({ key: 'h', value: 'h7' });
  });

  it('uses grand-parent span tags', function () {
    expect((0, _linkPatterns.getParameterInAncestor)('e', spans[3])).toEqual({ key: 'e', value: 'e6' });
    expect((0, _linkPatterns.getParameterInAncestor)('f', spans[3])).toEqual({ key: 'f', value: 'f6' });
    expect((0, _linkPatterns.getParameterInAncestor)('g', spans[3])).toEqual({ key: 'g', value: 'g6' });
  });

  it('uses grand-parent process tags', function () {
    expect((0, _linkPatterns.getParameterInAncestor)('h', spans[3])).toEqual({ key: 'h', value: 'h7' });
  });

  it('returns undefined when the entry cannot be found', function () {
    expect((0, _linkPatterns.getParameterInAncestor)('i', spans[3])).toBeUndefined();
  });

  it('does not break if some tags are not defined', function () {
    var spansWithUndefinedTags = [{
      depth: 0,
      process: {}
    }];
    expect((0, _linkPatterns.getParameterInAncestor)('a', spansWithUndefinedTags[0])).toBeUndefined();
  });
});

describe('computeLinks()', function () {
  var linkPatterns = [{
    type: 'tags',
    key: 'myKey',
    url: 'http://example.com/?myKey=#{myKey}',
    text: 'first link (#{myKey})'
  }, {
    key: 'myOtherKey',
    url: 'http://example.com/?myKey=#{myOtherKey}&myKey=#{myKey}',
    text: 'second link (#{myOtherKey})'
  }].map(_linkPatterns.processLinkPattern);

  var spans = [{ depth: 0, process: {}, tags: [{ key: 'myKey', value: 'valueOfMyKey' }] }, { depth: 1, process: {}, logs: [{ fields: [{ key: 'myOtherKey', value: 'valueOfMy+Other+Key' }] }] }];
  spans[1].references = [{
    refType: 'CHILD_OF',
    span: spans[0]
  }];

  it('correctly computes links', function () {
    expect((0, _linkPatterns.computeLinks)(linkPatterns, spans[0], spans[0].tags, 0)).toEqual([{
      url: 'http://example.com/?myKey=valueOfMyKey',
      text: 'first link (valueOfMyKey)'
    }]);
    expect((0, _linkPatterns.computeLinks)(linkPatterns, spans[1], spans[1].logs[0].fields, 0)).toEqual([{
      url: 'http://example.com/?myKey=valueOfMy%2BOther%2BKey&myKey=valueOfMyKey',
      text: 'second link (valueOfMy+Other+Key)'
    }]);
  });
});

describe('getLinks()', function () {
  var linkPatterns = [{
    key: 'mySpecialKey',
    url: 'http://example.com/?mySpecialKey=#{mySpecialKey}',
    text: 'special key link (#{mySpecialKey})'
  }].map(_linkPatterns.processLinkPattern);
  var template = jest.spyOn(linkPatterns[0].url, 'template');

  var span = { depth: 0, process: {}, tags: [{ key: 'mySpecialKey', value: 'valueOfMyKey' }] };

  var cache = void 0;

  beforeEach(function () {
    cache = new WeakMap();
    template.mockClear();
  });

  it('does not access the cache if there is no link pattern', function () {
    cache.get = jest.fn();
    var getLinks = (0, _linkPatterns.createGetLinks)([], cache);
    expect(getLinks(span, span.tags, 0)).toEqual([]);
    expect(cache.get).not.toHaveBeenCalled();
  });

  it('returns the result from the cache', function () {
    var result = [];
    cache.set(span.tags[0], result);
    var getLinks = (0, _linkPatterns.createGetLinks)(linkPatterns, cache);
    expect(getLinks(span, span.tags, 0)).toBe(result);
    expect(template).not.toHaveBeenCalled();
  });

  it('adds the result to the cache', function () {
    var getLinks = (0, _linkPatterns.createGetLinks)(linkPatterns, cache);
    var result = getLinks(span, span.tags, 0);
    expect(template).toHaveBeenCalledTimes(1);
    expect(result).toEqual([{
      url: 'http://example.com/?mySpecialKey=valueOfMyKey',
      text: 'special key link (valueOfMyKey)'
    }]);
    expect(cache.get(span.tags[0])).toBe(result);
  });
});