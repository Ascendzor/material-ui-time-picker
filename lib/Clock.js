'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('material-ui/styles');

var _colorManipulator = require('material-ui/styles/colorManipulator');

var _transitions = require('material-ui/styles/transitions');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = function styles(theme) {
  return {
    root: {
      width: 256,
      height: 256,
      fontFamily: theme.typography.fontFamily,
      cursor: 'default'
    },
    circle: {
      width: 256,
      height: 256,
      borderRadius: '50%',
      background: theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900],
      color: theme.palette.text.primary,
      position: 'relative'
    },
    number: {
      width: 32,
      height: 32,
      left: 'calc(50% - 16px)',
      top: 'calc(50% - 16px)',
      position: 'absolute',
      textAlign: 'center',
      lineHeight: '32px',
      cursor: 'pointer',
      fontSize: '14px',
      pointerEvents: 'none',
      userSelect: 'none',
      '&.selected': {
        color: (0, _colorManipulator.getContrastRatio)(theme.palette.primary.main, theme.palette.common.black) < 7 ? theme.palette.common.white : theme.palette.common.black
      },
      '&.disabled': {
        color: '#aaa'
      }
    },
    smallNumber: {
      fontSize: '12px',
      color: theme.palette.text.secondary
    },
    pointer: {
      width: 'calc(50% - 20px)',
      height: 2,
      backgroundColor: theme.palette.primary.main,
      position: 'absolute',
      left: '50%',
      top: 'calc(50% - 1px)',
      transformOrigin: 'left center',
      pointerEvents: 'none'
    },
    animatedPointer: {
      transition: 'all ' + _transitions.duration.short + 'ms ' + _transitions.easing.easeInOut
    },
    smallPointer: {
      width: 'calc(50% - 52px)'
    },
    innerDot: {
      backgroundColor: theme.palette.primary.main,
      position: 'absolute',
      top: -4 + 1,
      left: -4,
      width: 8,
      height: 8,
      borderRadius: '50%'
    },
    outerDot: {
      border: '16px solid ' + theme.palette.primary.main,
      borderWidth: 16,
      position: 'absolute',
      top: -16 + 1,
      right: -16,
      width: 0,
      height: 0,
      borderRadius: '50%',
      boxSizing: 'content-box'
    },
    outerDotOdd: {
      background: (0, _colorManipulator.getContrastRatio)(theme.palette.primary.main, theme.palette.common.black) < 7 ? theme.palette.common.white : theme.palette.common.black,
      width: 4,
      height: 4,
      borderWidth: 14
    }
  };
};

var size = 256;

var Clock = function (_React$PureComponent) {
  _inherits(Clock, _React$PureComponent);

  function Clock(props) {
    _classCallCheck(this, Clock);

    var _this = _possibleConstructorReturn(this, (Clock.__proto__ || Object.getPrototypeOf(Clock)).call(this, props));

    _this.disableAnimatedPointer = function () {
      return _this.setState({ touching: true });
    };

    _this.enableAnimatedPointer = function () {
      return _this.setState({ touching: false });
    };

    _this.handleTouchMove = function (e) {
      var rect = e.target.getBoundingClientRect();
      _this.movePointer(e.changedTouches[0].clientX - rect.left, e.changedTouches[0].clientY - rect.top);
    };

    _this.handleTouchEnd = function (e) {
      _this.handleTouchMove(e);
      _this.enableAnimatedPointer();
    };

    _this.handleMouseMove = function (e) {
      // MouseEvent.which is deprecated, but MouseEvent.buttons is not supported in Safari
      if (e.buttons === 1 || e.which === 1) {
        var rect = e.target.getBoundingClientRect();
        _this.movePointer(e.clientX - rect.left, e.clientY - rect.top);
      }
    };

    _this.handleClick = function (e) {
      var rect = e.target.getBoundingClientRect();
      _this.movePointer(e.clientX - rect.left, e.clientY - rect.top);
    };

    _this.state = { touching: false, angle: getPointerAngle(props.value, props.mode) };
    return _this;
  }

  _createClass(Clock, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var value = _ref.value,
          mode = _ref.mode;

      if (mode !== this.props.mode || value !== this.props.value) {
        this.setState({ angle: (0, _util.getShortestAngle)(this.state.angle, getPointerAngle(value, mode)) });
      }
    }
  }, {
    key: 'movePointer',
    value: function movePointer(x, y) {
      var _props = this.props,
          disabled = _props.disabled,
          mode = _props.mode,
          onChange = _props.onChange;

      var value = getPointerValue(x, y, mode);
      if (disabled ? !disabled.includes(value) : true && value !== value && onChange != null) {
        this.props.onChange(value);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames;

      var _props2 = this.props,
          classes = _props2.classes,
          mode = _props2.mode,
          value = _props2.value,
          disabled = _props2.disabled,
          other = _objectWithoutProperties(_props2, ['classes', 'mode', 'value', 'disabled']);

      var touching = this.state.touching;


      return _react2.default.createElement(
        'div',
        _extends({ className: classes.root }, other),
        _react2.default.createElement(
          'div',
          {
            className: classes.circle,
            onTouchMove: this.handleTouchMove,
            onMouseMove: this.handleMouseMove,
            onTouchStart: this.disableAnimatedPointer,
            onMouseDown: this.disableAnimatedPointer,
            onTouchEnd: this.handleTouchEnd,
            onMouseUp: this.enableAnimatedPointer,
            onClick: this.handleClick
          },
          _react2.default.createElement(
            'div',
            { className: (0, _classnames2.default)(classes.pointer, (_classNames = {}, _defineProperty(_classNames, classes.smallPointer, mode === '24h' && (value === 0 || value > 12)), _defineProperty(_classNames, classes.animatedPointer, !touching), _classNames)), style: {
                transform: 'rotate(' + this.state.angle + 'deg)'
              } },
            _react2.default.createElement('div', { className: classes.innerDot }),
            _react2.default.createElement('div', { className: (0, _classnames2.default)(classes.outerDot, _defineProperty({}, classes.outerDotOdd, mode === 'minutes' && value % 5 !== 0)) })
          ),
          mode === '12h' && getNumbers(12, { size: size }).map(function (digit, i) {
            return _react2.default.createElement(
              'span',
              {
                key: digit.display,
                className: (0, _classnames2.default)(classes.number, { selected: value === digit.display, disabled: disabled ? disabled.includes(digit.display) : false }),
                style: {
                  transform: 'translate(' + digit.translateX + 'px, ' + digit.translateY + 'px)'
                }
              },
              digit.display
            );
          }),
          mode === '24h' && getNumbers(12, { size: size }).map(function (digit, i) {
            return _react2.default.createElement(
              'span',
              {
                key: digit.display,
                className: (0, _classnames2.default)(classes.number, { selected: value === digit.display }),
                style: {
                  transform: 'translate(' + digit.translateX + 'px, ' + digit.translateY + 'px)'
                }
              },
              digit.display
            );
          }),
          mode === '24h' && getNumbers(12, { size: size - 64, start: 13 }).map(function (digit, i) {
            return _react2.default.createElement(
              'span',
              {
                key: digit.display,
                className: (0, _classnames2.default)(classes.number, classes.smallNumber, { selected: value === digit.display || digit.display === 24 && value === 0 }),
                style: {
                  transform: 'translate(' + digit.translateX + 'px, ' + digit.translateY + 'px)'
                }
              },
              digit.display === 24 ? '00' : digit.display
            );
          }),
          mode === 'minutes' && getNumbers(12, { size: size, start: 5, step: 5 }).map(function (digit, i) {
            return _react2.default.createElement(
              'span',
              {
                key: digit.display,
                className: (0, _classnames2.default)(classes.number, { selected: value === digit.display || digit.display === 60 && value === 0 }),
                style: {
                  transform: 'translate(' + digit.translateX + 'px, ' + digit.translateY + 'px)'
                }
              },
              digit.display === 60 ? '00' : digit.display
            );
          })
        )
      );
    }
  }]);

  return Clock;
}(_react2.default.PureComponent);

Clock.propTypes = {
  /** Sets the mode of this clock. It can either select hours (supports 12- and 24-hour-clock) or minutes. */
  mode: _propTypes2.default.oneOf(['12h', '24h', 'minutes']).isRequired,
  /** Callback that is called with the new hours/minutes (as a number) when the value is changed. */
  onChange: _propTypes2.default.func,
  /** The value of the clock. */
  value: _propTypes2.default.number.isRequired
};

exports.default = (0, _styles.withStyles)(styles)(Clock);


function getNumbers(count, _ref2) {
  var size = _ref2.size,
      _ref2$start = _ref2.start,
      start = _ref2$start === undefined ? 1 : _ref2$start,
      _ref2$step = _ref2.step,
      step = _ref2$step === undefined ? 1 : _ref2$step;

  return Array.apply(null, Array(count)).map(function (_, i) {
    return {
      display: i * step + start,
      translateX: (size / 2 - 20) * Math.cos(2 * Math.PI * (i - 2) / count),
      translateY: (size / 2 - 20) * Math.sin(2 * Math.PI * (i - 2) / count)
    };
  });
}

function getPointerAngle(value, mode) {
  switch (mode) {
    case '12h':
      return 360 / 12 * (value - 3);
    case '24h':
      return 360 / 12 * (value % 12 - 3);
    case 'minutes':
      return 360 / 60 * (value - 15);
  }
}

function getPointerValue(x, y, mode) {
  var angle = Math.atan2(size / 2 - x, size / 2 - y) / Math.PI * 180;
  if (angle < 0) {
    angle = 360 + angle;
  }

  switch (mode) {
    case '12h':
      {
        var value = 12 - Math.round(angle * 12 / 360);
        return value === 0 ? 12 : value;
      }
    case '24h':
      {
        var radius = Math.sqrt(Math.pow(size / 2 - x, 2) + Math.pow(size / 2 - y, 2));
        var _value = 12 - Math.round(angle * 12 / 360);
        if (_value === 0) {
          _value = 12;
        }
        if (radius < size / 2 - 32) {
          _value = _value === 12 ? 0 : _value + 12;
        }
        return _value;
      }
    case 'minutes':
      {
        var _value2 = Math.round(60 - 60 * angle / 360);
        return _value2 === 60 ? 0 : _value2;
      }
  }
}