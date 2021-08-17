import React from 'react';
import { ReactTitle } from 'react-meta-tags';
import Blankslate from '../components/common/blankslate';

const NewReleasesPage = () => {
  const pageTitle = <ReactTitle title="New Releases" />;

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

export default NewReleasesPage;
