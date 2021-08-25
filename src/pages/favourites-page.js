import React from 'react';
import { ReactTitle } from 'react-meta-tags';
import { useSelector } from 'react-redux';
import { favouritesSelector } from '../selectors/favourites';
import Subhead from '../components/ui/subhead';
import Heading from '../components/ui/heading';
import Blankslate from '../components/common/blankslate';
import { EpisodeList, EpisodeListItem } from '../components/episodes/episode-list';
import EpisodeCard from '../components/episodes/episode-card';

const FavouritesPage = () => {
  const favourites = useSelector(favouritesSelector);

  const pageTitle = <ReactTitle title="Favourites" />;

  if (favourites.length === 0) {
    return (
      <>
        {pageTitle}
        <Blankslate
          title="No favourites episodes available"
          text="It's time to find some new favorites."
        />
      </>
    );
  }

  return (
    <section>
      {pageTitle}
      <Subhead>
        <Heading size="h4">Favourites</Heading>
      </Subhead>
      <EpisodeList>
        {
          favourites.map((episode) => {
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

export default FavouritesPage;
