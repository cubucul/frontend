import React from 'react';
import { ReactTitle } from 'react-meta-tags';
import Blankslate from '../components/common/blankslate';

const StarredPage = () => {
  const pageTitle = <ReactTitle title="Starred" />;

  return (
    <>
      {pageTitle}
      <Blankslate
        title="No starred episodes available"
        text="It's time to find some new favorites."
      />
    </>
  );
};

export default StarredPage;
