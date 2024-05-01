/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const Button = ({
  title,
  className = '',
  style = {},
  // ...rest
  onClickHandler = () => {},
}) => (
  <div>
    <button
      type="button"
      className={cx(
        'bg-white py-2 px-5 rounded-full mt-4 outline hover:shadow-0_3px_10px_rgb-0-0-0-0-2 hover:bg-indigo-500 hover:text-white transition-all',
        className,
      )}
      style={{ ...style }}
      // {...rest}
      onClick={onClickHandler}
    >
      {title}
    </button>
  </div>
);

Button.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClickHandler: PropTypes.func.isRequired,
  style: PropTypes.object,
};

Button.defaultProps = {
  className: '',
  style: {},
};

export default Button;
