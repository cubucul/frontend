import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ReactTitle } from 'react-meta-tags';
import { getPodcastPageData } from '../actions/podcast-page';
import { subscriptionsChange } from '../actions/subscriptions';
import { hasPodcastInSubscriptions } from '../selectors/subscriptions';
import * as selectors from '../selectors/podcast-page';
import Loader from '../components/ui/loader';
import Blankslate from '../components/common/blankslate';
import PodcastHead from '../components/podcast/podcast-head';
import { EpisodeList, EpisodeListItem } from '../components/episodes/episode-list';
import EpisodeCard from '../components/episodes/episode-card';
import EpisodeCounter from '../components/episodes/episode-counter';

const PodcastPage = () => {
  const { podcastId } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectors.podcastIsLoadingSelector);
  const error = useSelector(selectors.podcastErrorSelector);
  const podcastData = useSelector(selectors.podcastDataSelector);
  const isSubscribed = useSelector((state) => hasPodcastInSubscriptions(state, podcastId));
  const { id, coverUrl600, title, author, summary, episodes, link } = podcastData;

  useEffect(() => {
    if (podcastId !== id) {
      dispatch(getPodcastPageData(podcastId));
    }
  }, [dispatch, podcastId, id]);

  const onSubscribe = () => {
    dispatch(subscriptionsChange(podcastId, isSubscribed));
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
      <PodcastHead
        coverUrl600={coverUrl600}
        title={title}
        summary={summary}
        link={link}
        author={author}
        subscribed={isSubscribed}
        onSubscribe={onSubscribe}
      />
      <section>
        <h2 className="visually-hidden">Episodes</h2>
        <EpisodeCounter count={episodes.length} />
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
      </section>
    </article>
  );
};

export default PodcastPage;
