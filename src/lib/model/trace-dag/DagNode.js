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

                                      

export default class DagNode           {
  static getID(service        , operation        , hasChildren         , parentID          )         {
    const name = `${service}\t${operation}${hasChildren ? '' : '\t__LEAF__'}`;
    return parentID ? `${parentID}\n${name}` : name;
  }

                  
                    
                    
             
                
                        
          

  constructor(service        , operation        , hasChildren         , parentID          , data   ) {
    this.service = service;
    this.operation = operation;
    this.parentID = parentID;
    this.id = DagNode.getID(service, operation, hasChildren, parentID);
    this.count = 0;
    this.children = new Set();
    this.data = data;
  }
}
