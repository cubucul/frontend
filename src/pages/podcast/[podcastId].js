import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { ReactTitle } from 'react-meta-tags';
import { getPodcastPageData } from '../../actions/podcast-page';
import { subscriptionsChange } from '../../actions/subscriptions';
import { hasInSubscriptionsSelector } from '../../selectors/subscriptions';
import * as selectors from '../../selectors/podcast-page';
import Loader from '../../components/ui/loader';
import Blankslate from '../../components/common/blankslate';
import PodcastHead from '../../components/podcast/podcast-head';
import { EpisodeList, EpisodeListItem } from '../../components/episodes/episode-list';
import EpisodeCard from '../../components/episodes/episode-card';

const PodcastPage = () => {
  const { query: { podcastId } } = useRouter();
  const dispatch = useDispatch();
  const loading = useSelector(selectors.podcastLoadingSelector);
  const error = useSelector(selectors.podcastErrorSelector);
  const podcastData = useSelector(selectors.podcastDataSelector);
  const subscribed = useSelector(hasInSubscriptionsSelector);
  const { id, coverUrl600, title, author, summary, episodes, link } = podcastData;

  useEffect(() => {
    if (podcastId !== id) {
      dispatch(getPodcastPageData(podcastId));
    }
  }, [dispatch, podcastId, id]);

  const onSubscribe = () => {
    dispatch(subscriptionsChange(podcastId, subscribed));
  };

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
                    podcastId,
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

export default PodcastPage;
