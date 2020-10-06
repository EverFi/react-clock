import React from 'react';
import PropTypes from 'prop-types';
import mergeClassNames from 'merge-class-names';

import Hand from './Hand';
import Mark from './Mark';

import {
  getHours,
  getMinutes,
  getSeconds,
} from './shared/dates';

import {
  isHandLength,
  isOppositeHandLength,
  isHandWidth,
  isMarkLength,
  isMarkWidth,
} from './shared/propTypes';

export default function Clock({
  className,
  displayNumbersOutside,
  hourHandLength,
  hourHandOppositeLength,
  hourHandWidth,
  hourMarksLength,
  hourMarksWidth,
  minuteHandLength,
  minuteHandOppositeLength,
  minuteHandWidth,
  minuteMarksLength,
  minuteMarksWidth,
  numberSelect,
  renderHourMarks,
  renderMinuteHand,
  renderMinuteMarks,
  renderNumbers,
  renderSecondHand,
  secondHandLength,
  secondHandOppositeLength,
  secondHandWidth,
  size,
  value,
}) {
  function hourMarkClickFn(event) {
    if (numberSelect) {
      numberSelect(event.target.textContent);
    }
  }

  function renderMinuteMarksFn() {
    if (!renderMinuteMarks) {
      return null;
    }

    const minuteMarks = [];
    for (let i = 1; i <= 60; i += 1) {
      const isHourMark = renderHourMarks && !(i % 5);

      if (!isHourMark) {
        minuteMarks.push(
          <Mark
            key={`minute_${i}`}
            angle={i * 6}
            length={minuteMarksLength}
            name="minute"
            width={minuteMarksWidth}
          />,
        );
      }
    }
    return minuteMarks;
  }

  function renderHourMarksFn() {
    if (!renderHourMarks) {
      return null;
    }

    const hourMarks = [];
    for (let i = 1; i <= 12; i += 1) {
      let number;
      if (renderNumbers === 'minutes') {
        number = i * 5;
        number = number === 60 ? '00' : number;
      } else if (renderNumbers) {
        number = i;
      }
      hourMarks.push(
        <Mark
          key={`hour_${i}`}
          angle={i * 30}
          displayOutside={displayNumbersOutside}
          length={hourMarksLength}
          name="hour"
          number={number}
          onClick={hourMarkClickFn}
          width={hourMarksWidth}
        />,
      );
    }
    return hourMarks;
  }

  function renderFace() {
    return (
      <div className="react-clock__face">
        {renderMinuteMarksFn()}
        {renderHourMarksFn()}
      </div>
    );
  }

  function renderHourHandFn() {
    const angle = value ? (
      (getHours(value) * 30)
      + (getMinutes(value) / 2)
      + (getSeconds(value) / 600)
    ) : 0;

    return (
      <Hand
        angle={angle}
        length={hourHandLength}
        name="hour"
        oppositeLength={hourHandOppositeLength}
        width={hourHandWidth}
      />
    );
  }

  function renderMinuteHandFn() {
    if (!renderMinuteHand) {
      return null;
    }

    const angle = value ? (
      (getHours(value) * 360)
      + (getMinutes(value) * 6)
      + (getSeconds(value) / 10)
    ) : 0;

    return (
      <Hand
        angle={angle}
        length={minuteHandLength}
        name="minute"
        oppositeLength={minuteHandOppositeLength}
        width={minuteHandWidth}
      />
    );
  }

  function renderSecondHandFn() {
    if (!renderSecondHand) {
      return null;
    }

    const angle = value ? (
      (getMinutes(value) * 360)
      + (getSeconds(value) * 6)
    ) : 0;

    return (
      <Hand
        angle={angle}
        length={secondHandLength}
        name="second"
        oppositeLength={secondHandOppositeLength}
        width={secondHandWidth}
      />
    );
  }

  return (
    <time
      className={mergeClassNames('react-clock', className)}
      dateTime={value instanceof Date ? value.toISOString() : value}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      {renderFace()}
      {renderHourHandFn()}
      {renderMinuteHandFn()}
      {renderSecondHandFn()}
    </time>
  );
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
  size: 150,
};

Clock.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  displayNumbersOutside: PropTypes.bool,
  hourHandLength: isHandLength,
  hourHandOppositeLength: isOppositeHandLength,
  hourHandWidth: isHandWidth,
  hourMarksLength: isMarkLength,
  hourMarksWidth: isMarkWidth,
  minuteHandLength: isHandLength,
  minuteHandOppositeLength: isOppositeHandLength,
  minuteHandWidth: isHandWidth,
  minuteMarksLength: isMarkLength,
  minuteMarksWidth: isMarkWidth,
  numberSelect: PropTypes.func,
  renderHourMarks: PropTypes.bool,
  renderMinuteHand: PropTypes.bool,
  renderMinuteMarks: PropTypes.bool,
  renderNumbers: PropTypes.bool,
  renderSecondHand: PropTypes.bool,
  secondHandLength: isHandLength,
  secondHandOppositeLength: isOppositeHandLength,
  secondHandWidth: isHandWidth,
  size: PropTypes.number,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
};
