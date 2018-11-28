'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Copyright (c) 2017 Uber Technologies, Inc.
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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _TimelineViewingLayer = require('./TimelineViewingLayer');

var _TimelineViewingLayer2 = _interopRequireDefault(_TimelineViewingLayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapFromSubRange(viewStart, viewEnd, value) {
  return viewStart + value * (viewEnd - viewStart);
}

describe('<TimelineViewingLayer>', function () {
  var wrapper = void 0;
  var instance = void 0;

  var viewStart = 0.25;
  var viewEnd = 0.9;
  var props = {
    boundsInvalidator: Math.random(),
    updateNextViewRangeTime: jest.fn(),
    updateViewRangeTime: jest.fn(),
    viewRangeTime: {
      current: [viewStart, viewEnd]
    }
  };

  beforeEach(function () {
    props.updateNextViewRangeTime.mockReset();
    props.updateViewRangeTime.mockReset();
    wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TimelineViewingLayer2.default, props));
    instance = wrapper.instance();
  });

  it('renders without exploding', function () {
    expect(wrapper).toBeDefined();
    expect(wrapper.find('.TimelineViewingLayer').length).toBe(1);
  });

  it('sets _root to the root DOM node', function () {
    expect(instance._root).toBeDefined();
    expect(wrapper.find('.TimelineViewingLayer').getDOMNode()).toBe(instance._root);
  });

  describe('uses DraggableManager', function () {
    it('initializes the DraggableManager', function () {
      var dm = instance._draggerReframe;
      expect(dm).toBeDefined();
      expect(dm._onMouseMove).toBe(instance._handleReframeMouseMove);
      expect(dm._onMouseLeave).toBe(instance._handleReframeMouseLeave);
      expect(dm._onDragStart).toBe(instance._handleReframeDragUpdate);
      expect(dm._onDragMove).toBe(instance._handleReframeDragUpdate);
      expect(dm._onDragEnd).toBe(instance._handleReframeDragEnd);
    });

    it('provides the DraggableManager handlers as callbacks', function () {
      var _instance$_draggerRef = instance._draggerReframe,
          handleMouseDown = _instance$_draggerRef.handleMouseDown,
          handleMouseLeave = _instance$_draggerRef.handleMouseLeave,
          handleMouseMove = _instance$_draggerRef.handleMouseMove;

      var rootWrapper = wrapper.find('.TimelineViewingLayer');
      expect(rootWrapper.prop('onMouseDown')).toBe(handleMouseDown);
      expect(rootWrapper.prop('onMouseLeave')).toBe(handleMouseLeave);
      expect(rootWrapper.prop('onMouseMove')).toBe(handleMouseMove);
    });

    it('returns the dragging bounds from _getDraggingBounds()', function () {
      var left = 10;
      var width = 100;
      instance._root.getBoundingClientRect = function () {
        return { left: left, width: width };
      };
      expect(instance._getDraggingBounds()).toEqual({ width: width, clientXLeft: left });
    });

    it('updates viewRange.time.cursor via _draggerReframe._onMouseMove', function () {
      var value = 0.5;
      var cursor = mapFromSubRange(viewStart, viewEnd, value);
      instance._draggerReframe._onMouseMove({ value: value });
      expect(props.updateNextViewRangeTime.mock.calls).toEqual([[{ cursor: cursor }]]);
    });

    it('resets viewRange.time.cursor via _draggerReframe._onMouseLeave', function () {
      instance._draggerReframe._onMouseLeave();
      expect(props.updateNextViewRangeTime.mock.calls).toEqual([[{ cursor: undefined }]]);
    });

    it('handles drag start via _draggerReframe._onDragStart', function () {
      var value = 0.5;
      var shift = mapFromSubRange(viewStart, viewEnd, value);
      var update = { reframe: { shift: shift, anchor: shift } };
      instance._draggerReframe._onDragStart({ value: value });
      expect(props.updateNextViewRangeTime.mock.calls).toEqual([[update]]);
    });

    it('handles drag move via _draggerReframe._onDragMove', function () {
      var anchor = 0.25;
      var viewRangeTime = _extends({}, props.viewRangeTime, { reframe: { anchor: anchor, shift: Math.random() } });
      var value = 0.5;
      var shift = mapFromSubRange(viewStart, viewEnd, value);
      // make sure `anchor` is already present on the props
      wrapper.setProps({ viewRangeTime: viewRangeTime });
      expect(wrapper.prop('viewRangeTime').reframe.anchor).toBe(anchor);
      // the next update should integrate `value` and use the existing anchor
      instance._draggerReframe._onDragStart({ value: value });
      var update = { reframe: { anchor: anchor, shift: shift } };
      expect(props.updateNextViewRangeTime.mock.calls).toEqual([[update]]);
    });

    it('handles drag end via _draggerReframe._onDragEnd', function () {
      var manager = { resetBounds: jest.fn() };
      var value = 0.5;
      var shift = mapFromSubRange(viewStart, viewEnd, value);
      var anchor = 0.25;
      var viewRangeTime = _extends({}, props.viewRangeTime, { reframe: { anchor: anchor, shift: Math.random() } });
      wrapper.setProps({ viewRangeTime: viewRangeTime });
      instance._draggerReframe._onDragEnd({ manager: manager, value: value });
      expect(manager.resetBounds.mock.calls).toEqual([[]]);
      expect(props.updateViewRangeTime.mock.calls).toEqual([[anchor, shift, 'timeline-header']]);
    });
  });

  describe('render()', function () {
    it('renders nothing without a nextViewRangeTime', function () {
      expect(wrapper.find('div').length).toBe(1);
    });

    it('renders the cursor when it is the only non-current value set', function () {
      var cursor = viewStart + 0.5 * (viewEnd - viewStart);
      var baseViewRangeTime = _extends({}, props.viewRangeTime, { cursor: cursor });
      wrapper.setProps({ viewRangeTime: baseViewRangeTime });
      // cursor is rendered when solo
      expect(wrapper.find('.TimelineViewingLayer--cursorGuide').length).toBe(1);
      // cursor is skipped when shiftStart, shiftEnd, or reframe are present
      var viewRangeTime = _extends({}, baseViewRangeTime, { shiftStart: cursor });
      wrapper.setProps({ viewRangeTime: viewRangeTime });
      expect(wrapper.find('.TimelineViewingLayer--cursorGuide').length).toBe(0);
      viewRangeTime = _extends({}, baseViewRangeTime, { shiftEnd: cursor });
      wrapper.setProps({ viewRangeTime: viewRangeTime });
      expect(wrapper.find('.TimelineViewingLayer--cursorGuide').length).toBe(0);
      viewRangeTime = _extends({}, baseViewRangeTime, { reframe: { anchor: cursor, shift: cursor } });
      wrapper.setProps({ viewRangeTime: viewRangeTime });
      expect(wrapper.find('.TimelineViewingLayer--cursorGuide').length).toBe(0);
    });

    it('renders the reframe dragging', function () {
      var viewRangeTime = _extends({}, props.viewRangeTime, { reframe: { anchor: viewStart, shift: viewEnd } });
      wrapper.setProps({ viewRangeTime: viewRangeTime });
      expect(wrapper.find('.isDraggingRight.isReframeDrag').length).toBe(1);
    });

    it('renders the shiftStart dragging', function () {
      var viewRangeTime = _extends({}, props.viewRangeTime, { shiftStart: viewEnd });
      wrapper.setProps({ viewRangeTime: viewRangeTime });
      expect(wrapper.find('.isDraggingRight.isShiftDrag').length).toBe(1);
    });

    it('renders the shiftEnd dragging', function () {
      var viewRangeTime = _extends({}, props.viewRangeTime, { shiftEnd: viewStart });
      wrapper.setProps({ viewRangeTime: viewRangeTime });
      expect(wrapper.find('.isDraggingLeft.isShiftDrag').length).toBe(1);
    });
  });
});