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

import * as React from 'react';
import { Icon, Input } from 'antd';

import * as markers from './TracePageSearchBar.markers';

import './TracePageSearchBar.css';

                                
                                   
                     
                         
                         
                          
                      
                                          
  

export function TracePageSearchBarFn(props                         ) {
  const {
    prevResult,
    nextResult,
    clearSearch,
    resultCount,
    updateTextFilter,
    textFilter,
    forwardedRef,
  } = props;

  const count = textFilter ? <span className="TracePageSearchBar--count">{resultCount}</span> : null;

  const updateFilter = event => updateTextFilter(event.target.value);
  const onKeyDown = e => {
    if (e.keyCode === 27) clearSearch();
  };

  const btnClass = `TracePageSearchBar--btn${textFilter ? '' : ' is-disabled'}`;

  return (
    <div className="ub-flex-auto ub-mr2 TracePageSearchBar">
      {/* style inline because compact overwrites the display */}
      <Input.Group compact style={{ display: 'flex' }}>
        <Input
          name="search"
          className="TracePageSearchBar--bar ub-flex-auto"
          placeholder="Search..."
          onChange={updateFilter}
          value={textFilter}
          data-test={markers.IN_TRACE_SEARCH}
          suffix={count}
          ref={forwardedRef}
          onKeyDown={onKeyDown}
          onPressEnter={nextResult}
        />
       <button><Icon type="up" className={btnClass} disabled={!textFilter} onClick={prevResult}/></button>
       <button><Icon type="down"className={btnClass} disabled={!textFilter} onClick={nextResult}/></button>
       <button><Icon type="close"className={btnClass} disabled={!textFilter} onClick={clearSearch}/></button>
      </Input.Group>
    </div>
  );
}

// ghetto fabulous cast because the 16.3 API is not in flow yet
// https://github.com/facebook/flow/issues/6103
export default (React     ).forwardRef((props, ref) => (
  <TracePageSearchBarFn {...props} forwardedRef={ref} />
));
