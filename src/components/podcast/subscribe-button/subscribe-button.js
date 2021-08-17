import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../../ui/button';
import styles from './subscribe-button.module.css';

const SubscribeButton = ({ subscribed, onSubscribe, className }) => {
  const buttonText = subscribed ? 'Unsubscribe' : 'Subscribe';
  const buttonClass = classNames(styles.button, {
    [styles.subscribed]: subscribed
  }, className);

  return (
    <Button
      className={buttonClass}
      onClick={onSubscribe}
    >{buttonText}</Button>
  );
};

SubscribeButton.propTypes = {
  subscribed: PropTypes.bool.isRequired,
  className: PropTypes.string,
  onSubscribe: PropTypes.func.isRequired
};

export default SubscribeButton;
