import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import { getPodcastPageData } from '../../../actions/podcast-page';
import * as selectors from '../../../selectors/podcast-page';
import Loader from '../../../components/ui/loader';
import Blankslate from '../../../components/common/blankslate';
import EpisodeHead from '../../../components/episodes/episode-head';
import EpisodeNotes from '../../../components/episodes/episode-notes';

const EpisodePage = () => {
  const { query: { podcastId, episodeId } } = useRouter();
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
        <Head>
          <title>Error!</title>
        </Head>
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
        <Head>
          <title>Loading...</title>
        </Head>
        <Loader />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
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
