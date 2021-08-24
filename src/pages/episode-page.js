import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ReactTitle } from 'react-meta-tags';
import { getEpisodePageData } from '../actions/episode-page';
import * as selectors from '../selectors/episode-page';
import Loader from '../components/ui/loader';
import Blankslate from '../components/common/blankslate';
import EpisodeHead from '../components/episodes/episode-head';
import EpisodeNotes from '../components/episodes/episode-notes';

const EpisodePage = () => {
  const { podcastId, episodeId } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectors.episodeIsLoadingSelector);
  const error = useSelector(selectors.episodeErrorSelector);
  const podcast = useSelector(selectors.episodeDataSelector);
  const { title: podcastTitle, coverUrl600, author, episodes } = podcast;
  const episode = episodes[0];
  const { id, title, published, description, url, duration } = episode;

  useEffect(() => {
    if (podcastId && episodeId && episodeId !== id) {
      dispatch(getEpisodePageData(podcastId, episodeId));
    }
  }, [dispatch, podcastId, episodeId, id]);

  if (error) {
    return (
      <>
        <ReactTitle title="Error!" />
        <Blankslate
          title="Oops... something went wrong"
          text="There was a problem loading the podcasts."
        />
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <ReactTitle title="Loading..." />
        <Loader />
      </>
    );
  }

  return (
    <article>
      <ReactTitle title={title} />
      <EpisodeHead
        podcastId={podcastId}
        episodeId={episodeId}
        episodeTitle={title}
        podcastTitle={podcastTitle}
        coverUrl600={coverUrl600}
        published={published}
        duration={duration}
        url={url}
        author={author}
      />
      <section>
        <h2 className="visually-hidden">Description</h2>
        <EpisodeNotes description={description} />
      </section>
    </article>
  );
};

export default EpisodePage;
