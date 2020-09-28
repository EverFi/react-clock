import React from 'react';
import PropTypes from 'prop-types';

import { isMarkLength, isMarkWidth } from './shared/propTypes';

export default function Mark({
  angle,
  displayOutside,
  length,
  name,
  onClick,
  width,
  number,
}) {
  const numberPosition = displayOutside ? '-25px' : `${length / 2}%`;
  return (
    <div
      className={`react-clock__mark react-clock__${name}-mark`}
      style={{
        transform: `rotate(${angle}deg)`,
      }}
    >
      <div
        className={`react-clock__mark__body react-clock__${name}-mark__body`}
        style={{
          width: `${width}px`,
          top: 0,
          bottom: `${100 - (length / 2)}%`,
        }}
      />
      {number && (
        /* eslint-disable jsx-a11y/click-events-have-key-events */
        /* eslint-disable jsx-a11y/no-static-element-interactions */
        /* the clock is specifically for sighted/mouse users to interact with */
        <div
          className="react-clock__mark__number"
          onClick={onClick}
          style={{
            cursor: 'pointer',
            transform: `rotate(-${angle}deg)`,
            top: numberPosition,
          }}
          tabIndex="-1"
        >
          {number}
        </div>
      )}
    </div>
  );
}

Mark.defaultProps = {
  angle: 0,
  length: 10,
  width: 1,
};

Mark.propTypes = {
  angle: PropTypes.number,
  displayOutside: PropTypes.bool,
  length: isMarkLength,
  name: PropTypes.string.isRequired,
  number: PropTypes.number,
  onClick: PropTypes.func,
  width: isMarkWidth,
};
