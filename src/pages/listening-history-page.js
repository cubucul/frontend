import React from 'react';
import { useSelector } from 'react-redux';
import { ReactTitle } from 'react-meta-tags';
import { historySelector } from '../selectors/history';
import Subhead from '../components/ui/subhead';
import Heading from '../components/ui/heading';
import Blankslate from '../components/common/blankslate';
import { EpisodeList, EpisodeListItem } from '../components/episodes/episode-list';
import EpisodeCard from '../components/episodes/episode-card';

const ListeningHistoryPage = () => {
  const history = useSelector(historySelector);

  const pageTitle = <ReactTitle title="Listening History" />;

  if (history.length === 0) {
    return (
      <>
        {pageTitle}
        <Blankslate
          title="Once upon a time..."
          text="All your played episodes will appear here."
        />
      </>
    );
  }

  return (
    <section>
      {pageTitle}
      <Subhead>
        <Heading size="h4">Listening History</Heading>
      </Subhead>
      <EpisodeList>
        {
          history.map((episode) => {
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

export default ListeningHistoryPage;
