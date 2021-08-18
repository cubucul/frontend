import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import { fetchPodcastPageData} from '../../../services/rss';
import { getPodcastByGenre } from '../../../services/topPodcasts';
import { subscriptionsChange } from '../../../actions/subscriptions';
import { podcastPageSuccess } from '../../../actions/podcast-page';
import { hasInSubscriptionsSelector } from '../../../selectors/subscriptions';
import PodcastHead from '../../../components/podcast/podcast-head';
import { EpisodeList, EpisodeListItem } from '../../../components/episodes/episode-list';
import EpisodeCard from '../../../components/episodes/episode-card';

const PodcastPage = ({ podcastData }) => {
  const { id, coverUrl600, title, author, summary, episodes, link } = podcastData;
  const dispatch = useDispatch();
  const subscribed = useSelector(hasInSubscriptionsSelector);

  const onSubscribe = () => {
    dispatch(subscriptionsChange(id, subscribed));
  };

  useEffect(() => {
    dispatch(podcastPageSuccess(podcastData));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <PodcastHead
        coverUrl600={coverUrl600}
        title={title}
        summary={summary}
        link={link}
        author={author}
        subscribed={subscribed}
        onSubscribe={onSubscribe}
      />
      <EpisodeList>
        {
          episodes.map((episode) => {
            return (
              <EpisodeListItem key={episode.id}>
                <EpisodeCard
                  noImage
                  noPodcastLink
                  episodeData={{
                    episodeId: episode.id,
                    podcastId: id,
                    coverUrl600,
                    podcastTitle: title,
                    ...episode
                  }}
                />
              </EpisodeListItem>
            );
          })
        }
      </EpisodeList>
    </>
  );
};

export async function getStaticPaths() {
  const top100Podcasts = await getPodcastByGenre('all', 100);

  const paths = top100Podcasts.map((podcast) => ({
    params: { podcastId: podcast.id }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}

export async function getStaticProps({ params }) {
  const podcastData = await fetchPodcastPageData(params.podcastId);

  return {
    props: {
      podcastData
    },
    revalidate: 60
  };
}

export default PodcastPage;
