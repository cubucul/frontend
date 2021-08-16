import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ReactTitle } from 'react-meta-tags';
import { getDiscoverPageData } from '../actions/discover-page';
import { getGenreTitle } from '../utils/genres';
import * as selectors from '../selectors/discover-page';
import Subhead from '../components/ui/subhead';
import Heading from '../components/ui/heading';
import Loader from '../components/ui/loader';
import Blankslate from '../components/common/blankslate';
import PodcastsGrid from '../components/common/podcasts-grid';

const GenrePage = () => {
  const dispatch = useDispatch();
  const { genreId } = useParams();
  const loading = useSelector(selectors.discoverLoadingSelector);
  const error = useSelector(selectors.discoverErrorSelector);
  const podcasts = useSelector(selectors.discoverPodcastsSelector);

  const genreTitle = getGenreTitle(genreId);
  const pageTitle = <ReactTitle title={`Top Podcasts in ${genreTitle}`} />;

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
