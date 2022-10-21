import { gql } from '@apollo/client';

export const SEARCH_ANIME = gql`
  query AnimeList($search: String, $page: Int, $perPage: Int, $sort: [MediaSort], $year: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        currentPage
        hasNextPage
      }
      media(type: ANIME, sort: $sort, search: $search, seasonYear: $year) {
        id
        title {
          userPreferred
        }
        coverImage {
          large
        }
        format
        seasonYear
        averageScore
      }
    }
  }
`;
