import React from 'react';
import Head from 'next/head';
import { getPodcastByGenre } from '../../services/topPodcasts';
import Subhead from '../../components/ui/subhead';
import Heading from '../../components/ui/heading';
import PodcastsGrid from '../../components/common/podcasts-grid';
import GenreGrid from '../../components/common/genre-grid';

const DiscoverPage = ({ podcasts }) => {
  return (
    <section>
      <Head>
        <title>Discover</title>
      </Head>
      <Subhead>
        <Heading as="h2" size="h4">
          Top Podcasts in Russia
        </Heading>
      </Subhead>
      <PodcastsGrid podcasts={podcasts} showCounter />
      <Subhead topSpace>
        <Heading as="h2" size="h4">
          Browse By Category
        </Heading>
      </Subhead>
      <GenreGrid />
    </section>
  );
};

export async function getStaticProps() {
  const podcasts = await getPodcastByGenre('all', 36);

  return {
    props: {
      podcasts
    },
    revalidate: 60
  };
}

export default DiscoverPage;
