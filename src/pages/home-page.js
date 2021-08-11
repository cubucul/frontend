import React from 'react';
import { useSelector } from 'react-redux';
import { ReactTitle } from 'react-meta-tags';
import { subscriptionsSelector } from '../selectors/subscriptions';
import Blankslate from '../components/common/blankslate';
import PodcastsGrid from '../components/common/podcasts-grid';

const HomePage = () => {
  const subscriptions = useSelector(subscriptionsSelector);

  const pageTitle = <ReactTitle title="My Podcasts" />;

  if (subscriptions.length === 0) {
    return (
      <>
        {pageTitle}
        <Blankslate
          title="You don't have any podcasts!"
          text="Your collection of podcasts appears here, but it appears you don't have any yet! Head over to Discover and add some."
        />
      </>
    );
  }

  return (
    <>
      {pageTitle}
      <PodcastsGrid podcasts={subscriptions} />
    </>
  );
};

export default HomePage;
