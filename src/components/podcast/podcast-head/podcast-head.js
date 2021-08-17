import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import classNames from 'classnames';
import Heading from '../../ui/heading';
import SubscribeButton from '../subscribe-button';
import styles from './podcast-head.module.css';

const PodcastHead = (props) => {
  const { coverUrl600, title, author, summary, link, subscribed, onSubscribe } = props;
  const descriptionClass = classNames(styles.description, {
    [styles.fullSpace]: !link
  });

  return (
    <div className={styles.head}>
      <div className={styles.cover}>
        <Image
          src={coverUrl600}
          width="210"
          height="210"
          alt={title}
        />
      </div>
      <SubscribeButton
        className={styles.button}
        subscribed={subscribed}
        onSubscribe={onSubscribe}
      />
      <div className={styles.title}>
        <Heading size="h4">{title}</Heading>
      </div>
      <p className={styles.author}>{author}</p>
      {
        link &&
          <a
            className={styles.link}
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
