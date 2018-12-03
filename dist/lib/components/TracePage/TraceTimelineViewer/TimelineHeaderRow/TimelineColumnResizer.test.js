'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _TimelineColumnResizer = require('./TimelineColumnResizer');

var _TimelineColumnResizer2 = _interopRequireDefault(_TimelineColumnResizer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<TimelineColumnResizer>', function () {
  var wrapper = void 0;
  var instance = void 0;

  var props = {
    min: 0.1,
    max: 0.9,
    onChange: jest.fn(),
    position: 0.5
  };

  beforeEach(function () {
    props.onChange.mockReset();
    wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TimelineColumnResizer2.default, props));
    instance = wrapper.instance();
  });

  it('renders without exploding', function () {
    expect(wrapper).toBeDefined();
    expect(wrapper.find('.TimelineColumnResizer').length).toBe(1);
    expect(wrapper.find('.TimelineColumnResizer--wrapper').length).toBe(1);
    expect(wrapper.find('.TimelineColumnResizer--gripIcon').length).toBe(1);
    expect(wrapper.find('.TimelineColumnResizer--dragger').length).toBe(1);
  });

  it('sets the root elm', function () {
    var rootWrapper = wrapper.find('.TimelineColumnResizer');
    expect(rootWrapper.getDOMNode()).toBe(instance._rootElm);
  });

  describe('uses DraggableManager', function () {
    it('handles mouse down on the dragger', function () {
      var dragger = wrapper.find({ onMouseDown: instance._dragManager.handleMouseDown });
      expect(dragger.length).toBe(1);
      expect(dragger.is('.TimelineColumnResizer--dragger')).toBe(true);
    });

    it('returns the draggable bounds via _getDraggingBounds()', function () {
      var left = 10;
      var width = 100;
      instance._rootElm.getBoundingClientRect = function () {
        return { left: left, width: width };
      };
      expect(instance._getDraggingBounds()).toEqual({
        width: width,
        clientXLeft: left,
        maxValue: props.max,
        minValue: props.min
      });
    });

    it('handles drag start', function () {
      var value = Math.random();
      expect(wrapper.state('dragPosition')).toBe(null);
      instance._handleDragUpdate({ value: value });
      expect(wrapper.state('dragPosition')).toBe(value);
    });

    it('handles drag end', function () {
      var manager = { resetBounds: jest.fn() };
      var value = Math.random();
      wrapper.setState({ dragPosition: 2 * value });
      instance._handleDragEnd({ manager: manager, value: value });
      expect(manager.resetBounds.mock.calls).toEqual([[]]);
      expect(wrapper.state('dragPosition')).toBe(null);
      expect(props.onChange.mock.calls).toEqual([[value]]);
    });
  });

  it('does not render a dragging indicator when not dragging', function () {
    expect(wrapper.find('.isDraggingLeft').length + wrapper.find('.isDraggingRight').length).toBe(0);
    expect(wrapper.find('.TimelineColumnResizer--dragger').prop('style').right).toBe(undefined);
  });

  it('renders a dragging indicator when dragging', function () {
    instance._dragManager.isDragging = function () {
      return true;
    };
    instance._handleDragUpdate({ value: props.min });
    instance.forceUpdate();
    wrapper.update();
    expect(wrapper.find('.isDraggingLeft').length + wrapper.find('.isDraggingRight').length).toBe(1);
    expect(wrapper.find('.TimelineColumnResizer--dragger').prop('style').right).toBeDefined();
  });
}); // Copyright (c) 2017 Uber Technologies, Inc.
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