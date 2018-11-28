//      

// Copyright (c) 2017 Uber Technologies, Inc.
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

import CanvasSpanGraph from './CanvasSpanGraph';
import TickLabels from './TickLabels';
import ViewingLayer from './ViewingLayer';
                                                               
                                                        

const TIMELINE_TICK_INTERVAL = 4;

                       
                 
               
                       
                                                
                                                       
  

/**
 * Store `items` in state so they are not regenerated every render. Otherwise,
 * the canvas graph will re-render itself every time.
 */
                       
          
                        
                       
                        
      
  

function getItem(span      ) {
  return {
    valueOffset: span.relativeStartTime,
    valueWidth: span.duration,
    serviceName: span.process.serviceName,
  };
}

export default class SpanGraph extends React.PureComponent                                 {
                        
                        

  static defaultProps = {
    height: 60,
  };

  constructor(props                ) {
    super(props);
    const { trace } = props;
    this.state = {
      items: trace ? trace.spans.map(getItem) : [],
    };
  }

  componentWillReceiveProps(nextProps                ) {
    const { trace } = nextProps;
    if (this.props.trace !== trace) {
      this.setState({
        items: trace ? trace.spans.map(getItem) : [],
      });
    }
  }

  render() {
    const { height, trace, viewRange, updateNextViewRangeTime, updateViewRangeTime } = this.props;
    if (!trace) {
      return <div />;
    }
    const { items } = this.state;
    return (
      <div className="ub-px2">
        <TickLabels numTicks={TIMELINE_TICK_INTERVAL} duration={trace.duration} />
        <div className="ub-relative">
          <CanvasSpanGraph valueWidth={trace.duration} items={items} />
          <ViewingLayer
            viewRange={viewRange}
            numTicks={TIMELINE_TICK_INTERVAL}
            height={height}
            updateViewRangeTime={updateViewRangeTime}
            updateNextViewRangeTime={updateNextViewRangeTime}
          />
        </div>
      </div>
    );
  }
}
