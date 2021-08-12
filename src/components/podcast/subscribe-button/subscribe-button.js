import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../../ui/button';
import './subscribe-button.css';

const SubscribeButton = ({ subscribed, onSubscribe, className }) => {
  const buttonText = subscribed ? 'Unsubscribe' : 'Subscribe';
  const buttonClass = classNames('subscribe-button', {
    'subscribe-button--subscribed': subscribed
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
