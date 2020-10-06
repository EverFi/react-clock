"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Clock;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _mergeClassNames = _interopRequireDefault(require("merge-class-names"));

var _Hand = _interopRequireDefault(require("./Hand"));

var _Mark = _interopRequireDefault(require("./Mark"));

var _dates = require("./shared/dates");

var _propTypes2 = require("./shared/propTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function Clock(_ref) {
  var className = _ref.className,
      displayNumbersOutside = _ref.displayNumbersOutside,
      hourHandLength = _ref.hourHandLength,
      hourHandOppositeLength = _ref.hourHandOppositeLength,
      hourHandWidth = _ref.hourHandWidth,
      hourMarksLength = _ref.hourMarksLength,
      hourMarksWidth = _ref.hourMarksWidth,
      minuteHandLength = _ref.minuteHandLength,
      minuteHandOppositeLength = _ref.minuteHandOppositeLength,
      minuteHandWidth = _ref.minuteHandWidth,
      minuteMarksLength = _ref.minuteMarksLength,
      minuteMarksWidth = _ref.minuteMarksWidth,
      numberSelect = _ref.numberSelect,
      renderHourMarks = _ref.renderHourMarks,
      renderMinuteHand = _ref.renderMinuteHand,
      renderMinuteMarks = _ref.renderMinuteMarks,
      renderNumbers = _ref.renderNumbers,
      renderSecondHand = _ref.renderSecondHand,
      secondHandLength = _ref.secondHandLength,
      secondHandOppositeLength = _ref.secondHandOppositeLength,
      secondHandWidth = _ref.secondHandWidth,
      size = _ref.size,
      value = _ref.value;

  function hourMarkClickFn(event) {
    if (numberSelect) {
      numberSelect(event.target.textContent);
    }
  }

  function renderMinuteMarksFn() {
    if (!renderMinuteMarks) {
      return null;
    }

    var minuteMarks = [];

    for (var i = 1; i <= 60; i += 1) {
      var isHourMark = renderHourMarks && !(i % 5);

      if (!isHourMark) {
        minuteMarks.push(_react["default"].createElement(_Mark["default"], {
          key: "minute_".concat(i),
          angle: i * 6,
          length: minuteMarksLength,
          name: "minute",
          width: minuteMarksWidth
        }));
      }
    }

    return minuteMarks;
  }

  function renderHourMarksFn() {
    if (!renderHourMarks) {
      return null;
    }

    var hourMarks = [];

    for (var i = 1; i <= 12; i += 1) {
      var number = void 0;

      if (renderNumbers === 'minutes') {
        number = i * 5;
        number = number === 60 ? '00' : number;
      } else if (renderNumbers) {
        number = i;
      }

      hourMarks.push(_react["default"].createElement(_Mark["default"], {
        key: "hour_".concat(i),
        angle: i * 30,
        displayOutside: displayNumbersOutside,
        length: hourMarksLength,
        name: "hour",
        number: number,
        onClick: hourMarkClickFn,
        width: hourMarksWidth
      }));
    }

    return hourMarks;
  }

  function renderFace() {
    return _react["default"].createElement("div", {
      className: "react-clock__face"
    }, renderMinuteMarksFn(), renderHourMarksFn());
  }

  function renderHourHandFn() {
    var angle = value ? (0, _dates.getHours)(value) * 30 + (0, _dates.getMinutes)(value) / 2 + (0, _dates.getSeconds)(value) / 600 : 0;
    return _react["default"].createElement(_Hand["default"], {
      angle: angle,
      length: hourHandLength,
      name: "hour",
      oppositeLength: hourHandOppositeLength,
      width: hourHandWidth
    });
  }

  function renderMinuteHandFn() {
    if (!renderMinuteHand) {
      return null;
    }

    var angle = value ? (0, _dates.getHours)(value) * 360 + (0, _dates.getMinutes)(value) * 6 + (0, _dates.getSeconds)(value) / 10 : 0;
    return _react["default"].createElement(_Hand["default"], {
      angle: angle,
      length: minuteHandLength,
      name: "minute",
      oppositeLength: minuteHandOppositeLength,
      width: minuteHandWidth
    });
  }

  function renderSecondHandFn() {
    if (!renderSecondHand) {
      return null;
    }

    var angle = value ? (0, _dates.getMinutes)(value) * 360 + (0, _dates.getSeconds)(value) * 6 : 0;
    return _react["default"].createElement(_Hand["default"], {
      angle: angle,
      length: secondHandLength,
      name: "second",
      oppositeLength: secondHandOppositeLength,
      width: secondHandWidth
    });
  }

  return _react["default"].createElement("time", {
    className: (0, _mergeClassNames["default"])('react-clock', className),
    dateTime: value instanceof Date ? value.toISOString() : value,
    style: {
      width: "".concat(size, "px"),
      height: "".concat(size, "px")
    }
  }, renderFace(), renderHourHandFn(), renderMinuteHandFn(), renderSecondHandFn());
}

Clock.defaultProps = {
  hourHandLength: 50,
  hourHandWidth: 4,
  hourMarksLength: 10,
  hourMarksWidth: 3,
  minuteHandLength: 70,
  minuteHandWidth: 2,
  minuteMarksLength: 6,
  minuteMarksWidth: 1,
  renderHourMarks: true,
  renderMinuteHand: true,
  renderMinuteMarks: true,
  renderSecondHand: true,
  secondHandLength: 90,
  secondHandWidth: 1,
  size: 150
};
Clock.propTypes = {
  className: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].arrayOf(_propTypes["default"].string)]),
  displayNumbersOutside: _propTypes["default"].bool,
  hourHandLength: _propTypes2.isHandLength,
  hourHandOppositeLength: _propTypes2.isOppositeHandLength,
  hourHandWidth: _propTypes2.isHandWidth,
  hourMarksLength: _propTypes2.isMarkLength,
  hourMarksWidth: _propTypes2.isMarkWidth,
  minuteHandLength: _propTypes2.isHandLength,
  minuteHandOppositeLength: _propTypes2.isOppositeHandLength,
  minuteHandWidth: _propTypes2.isHandWidth,
  minuteMarksLength: _propTypes2.isMarkLength,
  minuteMarksWidth: _propTypes2.isMarkWidth,
  numberSelect: _propTypes["default"].func,
  renderHourMarks: _propTypes["default"].bool,
  renderMinuteHand: _propTypes["default"].bool,
  renderMinuteMarks: _propTypes["default"].bool,
  renderNumbers: _propTypes["default"].bool,
  renderSecondHand: _propTypes["default"].bool,
  secondHandLength: _propTypes2.isHandLength,
  secondHandOppositeLength: _propTypes2.isOppositeHandLength,
  secondHandWidth: _propTypes2.isHandWidth,
  size: _propTypes["default"].number,
  value: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].instanceOf(Date)])
};