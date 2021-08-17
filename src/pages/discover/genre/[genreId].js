import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { getPodcastByGenre } from '../../../services/topPodcasts';
import { getGenreTitle } from '../../../utils/genres';
import Subhead from '../../../components/ui/subhead';
import Heading from '../../../components/ui/heading';
import PodcastsGrid from '../../../components/common/podcasts-grid';
import { genres } from '../../../utils/genres';

const GenrePage = ({ podcasts }) => {
  const { query: { genreId } } = useRouter();
  const genreTitle = getGenreTitle(genreId);

  return (
    <section>
      <Head>
        <title>Top Podcasts in {genreTitle}</title>
      </Head>
      <Subhead>
        <Heading as="h2" size="h4">
          Top Podcasts in {genreTitle}
        </Heading>
      </Subhead>
      <PodcastsGrid podcasts={podcasts} showCounter />
    </section>
  );
};

export async function getStaticPaths() {
  const paths = genres.map((genre) => ({
    params: { genreId: genre.id }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const podcasts = await getPodcastByGenre(params.genreId, 100);

  return {
    props: {
      podcasts
    },
    revalidate: 60
  };
}

export default GenrePage;
