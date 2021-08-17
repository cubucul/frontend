import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { getDiscoverPageData } from '../../../actions/discover-page';
import { getGenreTitle } from '../../../utils/genres';
import * as selectors from '../../../selectors/discover-page';
import Subhead from '../../../components/ui/subhead';
import Heading from '../../../components/ui/heading';
import Loader from '../../../components/ui/loader';
import Blankslate from '../../../components/common/blankslate';
import PodcastsGrid from '../../../components/common/podcasts-grid';

const GenrePage = () => {
  const dispatch = useDispatch();
  const { query: { genreId } } = useRouter();
  const loading = useSelector(selectors.discoverLoadingSelector);
  const error = useSelector(selectors.discoverErrorSelector);
  const podcasts = useSelector(selectors.discoverPodcastsSelector);

  const genreTitle = getGenreTitle(genreId);
  const pageTitle = <Head><title>Top Podcasts in {genreTitle}</title></Head>;

  useEffect(() => {
    dispatch(getDiscoverPageData(genreId, 100));
  }, [dispatch, genreId]);

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
          Top Podcasts in {genreTitle}
        </Heading>
      </Subhead>
      <PodcastsGrid podcasts={podcasts} showCounter />
    </section>
  );
};

export default GenrePage;
