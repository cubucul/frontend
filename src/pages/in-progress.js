import React from 'react';
import Head from 'next/head';
import Blankslate from '../components/common/blankslate';

const InProgressPage = () => {
  const pageTitle = <Head><title>In Progress</title></Head>;

  return (
    <>
      {pageTitle}
      <Blankslate
        title="All caught up!"
        text="It's time to subscribe to some more podcasts."
      />
    </>
  );
};

export default InProgressPage;
