import React from 'react';
import Head from 'next/head';
import Blankslate from '../components/common/blankslate';

const StarredPage = () => {
  const pageTitle = <Head><title>Starred</title></Head>;

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
