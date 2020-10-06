"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Mark;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _propTypes2 = require("./shared/propTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function Mark(_ref) {
  var angle = _ref.angle,
      displayOutside = _ref.displayOutside,
      length = _ref.length,
      name = _ref.name,
      onClick = _ref.onClick,
      width = _ref.width,
      number = _ref.number;
  var numberPosition = displayOutside ? '-25px' : "".concat(length / 2, "%");
  return _react["default"].createElement("div", {
    className: "react-clock__mark react-clock__".concat(name, "-mark"),
    style: {
      transform: "rotate(".concat(angle, "deg)")
    }
  }, _react["default"].createElement("div", {
    className: "react-clock__mark__body react-clock__".concat(name, "-mark__body"),
    style: {
      width: "".concat(width, "px"),
      top: 0,
      bottom: "".concat(100 - length / 2, "%")
    }
  }), number &&
  /* eslint-disable jsx-a11y/click-events-have-key-events */

  /* eslint-disable jsx-a11y/no-static-element-interactions */

  /* the clock is specifically for sighted/mouse users to interact with */
  _react["default"].createElement("div", {
    className: "react-clock__mark__number",
    onClick: onClick,
    style: {
      cursor: 'pointer',
      transform: "rotate(-".concat(angle, "deg)"),
      top: numberPosition
    },
    tabIndex: "-1"
  }, number));
}

Mark.defaultProps = {
  angle: 0,
  length: 10,
  width: 1
};
Mark.propTypes = {
  angle: _propTypes["default"].number,
  displayOutside: _propTypes["default"].bool,
  length: _propTypes2.isMarkLength,
  name: _propTypes["default"].string.isRequired,
  number: _propTypes["default"].number,
  onClick: _propTypes["default"].func,
  width: _propTypes2.isMarkWidth
};