import React from 'react';
import { useSelector } from 'react-redux';
import { selectActiveEpisodes } from '../selectors/history';
import { ReactTitle } from 'react-meta-tags';
import Subhead from '../components/ui/subhead';
import Heading from '../components/ui/heading';
import { EpisodeList, EpisodeListItem } from '../components/episodes/episode-list';
import Blankslate from '../components/common/blankslate';
import EpisodeCard from '../components/episodes/episode-card';

const InProgressPage = () => {
  const episodes = useSelector(selectActiveEpisodes);
  console.log(episodes);

  const pageTitle = <ReactTitle title="In Progress" />;

  if (episodes.length === 0) {
    return (
      <>
        {pageTitle}
        <Blankslate
          title="All caught up!"
          text="It's time to subscribe to some more podcasts."
        />
      </>
    );
  }

  return (
    <section>
      {pageTitle}
      <Subhead>
        <Heading size="h4">In Progress</Heading>
      </Subhead>
      <EpisodeList>
        {
          episodes.map((episode) => {
            return (
              <EpisodeListItem key={episode.episodeId}>
                <EpisodeCard
                  episodeData={{
                    ...episode
                  }}
                />
              </EpisodeListItem>
            );
          })
        }
      </EpisodeList>
    </section>
  );
};

export default InProgressPage;
