import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Heading from '../../ui/heading';
import SubscribeButton from '../subscribe-button';
import './podcast-head.css';

const PodcastHead = (props) => {
  const { coverUrl600, title, author, summary, link, subscribed, onSubscribe } = props;
  const descriptionClass = classNames('podcast-head__description', {
    'podcast-head__description--full-space': !link
  });

  return (
    <div className="podcast-head">
      <img
        className="podcast-head__image"
        src={coverUrl600}
        width="210"
        height="210"
        alt={title}
      />
      <SubscribeButton
        className="podcast-head__subscribe-button"
        subscribed={subscribed}
        onSubscribe={onSubscribe}
      />
      <div className="podcast-head__title">
        <Heading size="h4">{title}</Heading>
      </div>
      <p className="podcast-head__author">{author}</p>
      {
        link &&
          <a
            className="podcast-head__link"
            href={link}
            target="_blank"
            rel="noreferrer"
          >{link}</a>
      }
      <p className={descriptionClass}>{summary}</p>
    </div>
  );
};

PodcastHead.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  link: PropTypes.string,
  coverUrl600: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  subscribed: PropTypes.bool.isRequired,
  onSubscribe: PropTypes.func.isRequired
};

export default PodcastHead;
