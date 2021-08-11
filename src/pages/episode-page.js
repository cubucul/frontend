import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ReactTitle } from 'react-meta-tags';
import { getPodcastPageData } from '../actions/podcast-page';
import * as selectors from '../selectors/podcast-page';
import Loader from '../components/ui/loader';
import Blankslate from '../components/common/blankslate';
import EpisodeHead from '../components/episodes/episode-head';
import EpisodeNotes from '../components/episodes/episode-notes';

const EpisodePage = () => {
  const { podcastId, episodeId } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector(selectors.podcastLoadingSelector);
  const error = useSelector(selectors.podcastErrorSelector);
  const podcastData = useSelector(selectors.podcastDataSelector);
  const { id, title: podcastTitle, coverUrl600, author, episodes } = podcastData;
  const episode = episodes.find(i => i.id === episodeId) || episodes[0];
  const { title, published, description, url, duration } = episode;

  useEffect(() => {
    if (podcastId !== id) {
      dispatch(getPodcastPageData(podcastId));
    }
  }, [dispatch, podcastId, id]);

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

  if (loading) {
    return (
      <>
        <ReactTitle title="Loading..." />
        <Loader />
      </>
    );
  }

  return (
    <>
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
      <EpisodeNotes description={description} />
    </>
  );
};

export default EpisodePage;
