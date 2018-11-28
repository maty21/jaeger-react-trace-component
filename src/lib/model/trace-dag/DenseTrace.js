//      

// Copyright (c) 2018 Uber Technologies, Inc.
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

import denseTransforms from './denseTransforms';

                                         
                                                     

function convSpans(spans        ) {
  const map                          = new Map();
  const roots              = new Set();
  const ids           = [];
  spans.forEach(span => {
    const { spanID: id, operationName: operation, process, references, tags: spanTags } = span;
    ids.push(id);
    const { serviceName: service } = process;
    const tags = spanTags.reduce((accum, tag) => {
      const { key, value } = tag;
      // eslint-disable-next-line no-param-reassign
      accum[key] = value;
      return accum;
    }, {});
    let parentID          = null;
    if (references && references.length) {
      const { refType, spanID } = references[0];
      if (refType !== 'CHILD_OF' && refType !== 'FOLLOWS_FROM') {
        console.warn(`Unrecognized ref type: ${refType}`);
      } else {
        parentID = spanID;
      }
    }

    const denseSpan = {
      id,
      operation,
      parentID,
      service,
      span,
      tags,
      children: new Set(),
      skipToChild: false,
    };
    const parent = parentID && map.get(parentID);
    if (!parent) {
      // some root spans have a parent ID but it is missing
      roots.add(id);
    } else {
      parent.children.add(id);
    }
    map.set(id, denseSpan);
  });
  return { ids, map, roots };
}

function makeDense(spanIDs          , map                         ) {
  spanIDs.forEach(id => {
    const denseSpan = map.get(id);
    // make flow happy
    if (denseSpan) {
      denseTransforms(denseSpan, map);
    }
  });
}

export default class DenseTrace {
               
                       
                                         

  constructor(trace       ) {
    this.trace = trace;
    const { ids, map, roots } = convSpans(trace.spans);
    makeDense(ids, map);
    this.rootIDs = roots;
    this.denseSpansMap = map;
  }
}