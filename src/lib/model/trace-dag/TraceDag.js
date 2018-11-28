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

import DagNode from './DagNode';
import DenseTrace from './DenseTrace';

                                      
                                               

                   
            
            
  

export default class TraceDag           {
  static newFromTrace(trace       ) {
    const dt             = new TraceDag();
    dt._initFromTrace(trace);
    return dt;
  }

  static diff(a               , b               ) {
    const dt                       = new TraceDag();
    let key = 'a';

    function pushDagNode(src              ) {
      const node = dt._getDagNode(src.service, src.operation, src.children.size > 0, src.parentID, {
        a: 0,
        b: 0,
      });
      const { data } = node;
      data[key] = src.count;
      node.count = data.b - data.a;
      if (!node.parentID) {
        dt.rootIDs.add(node.id);
      }
    }
    key = 'a';
    [...a.nodesMap.values()].forEach(pushDagNode);
    key = 'b';
    [...b.nodesMap.values()].forEach(pushDagNode);
    return dt;
  }

                          
                                    
                       

  constructor() {
    this.denseTrace = null;
    this.nodesMap = new Map();
    this.rootIDs = new Set();
  }

  _initFromTrace(trace       , data   ) {
    this.denseTrace = new DenseTrace(trace);
    [...this.denseTrace.rootIDs].forEach(id => this._addDenseSpan(id, null, data));
  }

  _getDagNode(
    service        ,
    operation        ,
    hasChildren         ,
    parentID          ,
    data   
  )             {
    const nodeID = DagNode.getID(service, operation, hasChildren, parentID);
    let node = this.nodesMap.get(nodeID);
    if (node) {
      return node;
    }
    node = new DagNode(service, operation, hasChildren, parentID, data);
    this.nodesMap.set(nodeID, node);
    if (!parentID) {
      this.rootIDs.add(nodeID);
    } else {
      const parentDag = this.nodesMap.get(parentID);
      if (parentDag) {
        parentDag.children.add(nodeID);
      }
    }
    return node;
  }

  _addDenseSpan(spanID        , parentNodeID          , data   ) {
    const denseSpan = this.denseTrace && this.denseTrace.denseSpansMap.get(spanID);
    if (!denseSpan) {
      console.warn(`Missing dense span: ${spanID}`);
      return;
    }
    const { children, operation, service, skipToChild } = denseSpan;
    let nodeID          = null;
    if (!skipToChild) {
      const node = this._getDagNode(service, operation, children.size > 0, parentNodeID, data);
      node.count++;
      nodeID = node.id;
    } else {
      nodeID = parentNodeID;
    }
    [...children].forEach(id => this._addDenseSpan(id, nodeID, data));
  }
}
