import React from 'react';
import { ReactTitle } from 'react-meta-tags';
import Blankslate from '../components/common/blankslate';

const NotFoundPage = () => {
  const pageTitle = <ReactTitle title="Page Not Found" />;

  return (
    <>
      {pageTitle}
      <Blankslate
        title="Whoops! 404 Page Not Found"
        text="There was a problem loading the podcasts."
      />
    </>
  );
};

export default NotFoundPage;
