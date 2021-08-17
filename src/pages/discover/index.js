import React, { useEffect } from 'react';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import { getDiscoverPageData } from '../../actions/discover-page';
import * as selectors from '../../selectors/discover-page';
import Subhead from '../../components/ui/subhead';
import Heading from '../../components/ui/heading';
import Loader from '../../components/ui/loader';
import Blankslate from '../../components/common/blankslate';
import PodcastsGrid from '../../components/common/podcasts-grid';
import GenreGrid from '../../components/common/genre-grid';

const DiscoverPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectors.discoverLoadingSelector);
  const error = useSelector(selectors.discoverErrorSelector);
  const podcasts = useSelector(selectors.discoverPodcastsSelector);

  const pageTitle = <Head><title>Discover</title></Head>;

  useEffect(() => {
    dispatch(getDiscoverPageData('all', 36));
  }, [dispatch]);

  if (error) {
    return (
      <>
        {pageTitle}
        <Blankslate
          title="Oops... something went wrong"
          text="There was a problem loading the podcasts."
        />
      </>
    );
  }

  if (loading) {
    return (
      <>
        {pageTitle}
        <Loader />
      </>
    );
  }

  return (
    <section>
      {pageTitle}
      <Subhead>
        <Heading as="h2" size="h4">
          Top Podcasts in Russia
        </Heading>
      </Subhead>
      <PodcastsGrid podcasts={podcasts} showCounter />
      <Subhead topSpace>
        <Heading as="h2" size="h4">
          Browse By Category
        </Heading>
      </Subhead>
      <GenreGrid />
    </section>
  );
};

export default DiscoverPage;
