import React from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { subscriptionsSelector } from '../selectors/subscriptions';
import Blankslate from '../components/common/blankslate';
import PodcastsGrid from '../components/common/podcasts-grid';

const HomePage = () => {
  const subscriptions = useSelector(subscriptionsSelector);

  const pageTitle = <Head><title>My Podcasts</title></Head>;

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
      <PodcastsGrid
        podcasts={subscriptions}
        withoutInfo
      />
    </>
  );
};

export default HomePage;
