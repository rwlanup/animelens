import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import { getAnimeDetail } from '../../api/anime-detail';
import { getPopularTopAndTrendingAnimeOfYear } from '../../api/anime-list';
import { AnimeDetail } from '../../types/anime';
import { Box, Container } from '@mui/material';
import Image from 'next/image';
import { AnimeDetailHeader } from '../../pages-components/anime-detail/AnimeDetailHeader';
import { AnimeDetailDescription } from '../../pages-components/anime-detail/AnimeDetailDescription';
import { AnimeCardList } from '../../components/anime-card-list/AnimeCardList';
import Head from 'next/head';

const AnimeDetailPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ anime }) => {
  const documentTitle = `${anime.title.userPreferred} | Animelens`;
  return (
    <>
      <Head>
        <title>{documentTitle}</title>
        <meta
          name="description"
          content={`${anime.title.userPreferred} - Find all information about this anime and also get to know related anime series like ${anime.title.userPreferred}`}
        />
      </Head>
      <Box>
        <Box sx={{ width: 1, aspectRatio: '19/4', position: 'relative' }}>
          <Image
            priority
            layout="fill"
            src={anime.bannerImage}
            alt={`Banner image of ${anime.title.userPreferred}`}
          />
        </Box>
        <AnimeDetailHeader anime={anime} />
        <AnimeDetailDescription anime={anime} />
        <Container
          maxWidth="xl"
          sx={{ my: 5 }}
        >
          <AnimeCardList
            title="Related anime"
            animes={anime.relations.nodes}
          />
        </Container>
      </Box>
    </>
  );
};

export default AnimeDetailPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const { popularAnimes, topAnimes, trendingAnimes } = await getPopularTopAndTrendingAnimeOfYear();
  const paths: {
    params: ParsedUrlQuery;
  }[] = [];
  [...popularAnimes, ...topAnimes, ...trendingAnimes].forEach((anime) => {
    paths.push({ params: { id: anime.id.toString() } });
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<{ anime: AnimeDetail }> = async ({ params }) => {
  try {
    const id = (params as ParsedUrlQuery).id as string;
    const parsedId = parseInt(id);

    if (isNaN(parsedId)) {
      return {
        notFound: true,
      };
    } else {
      const anime = await getAnimeDetail(parsedId);
      return {
        props: {
          anime,
        },
      };
    }
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
