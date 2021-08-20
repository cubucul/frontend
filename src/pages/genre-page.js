import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ReactTitle } from 'react-meta-tags';
import { getGenrePageData } from '../actions/genre-page';
import { getGenreTitle } from '../utils/genres';
import * as selectors from '../selectors/genre-page';
import Subhead from '../components/ui/subhead';
import Heading from '../components/ui/heading';
import Loader from '../components/ui/loader';
import Blankslate from '../components/common/blankslate';
import PodcastsGrid from '../components/common/podcasts-grid';

const GenrePage = () => {
  const dispatch = useDispatch();
  const { genreId } = useParams();
  const loading = useSelector(selectors.genreLoadingSelector);
  const error = useSelector(selectors.genreErrorSelector);
  const podcasts = useSelector(selectors.genrePodcastsSelector);
  const genre = useSelector(selectors.genreGenreIdSelector);

  const genreTitle = getGenreTitle(genreId);
  const pageTitle = <ReactTitle title={`Top Podcasts in ${genreTitle}`} />;

  useEffect(() => {
    if (
      (podcasts.length === 0 && !genre) ||
      (podcasts.length !== 0 && genre && genreId !== genre)
    ) {
      dispatch(getGenrePageData(genreId, 100));
    }
  }, [dispatch, podcasts.length, genreId, genre]);

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
