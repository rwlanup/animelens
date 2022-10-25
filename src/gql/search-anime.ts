import { gql } from '@apollo/client';

export const ALLOWED_SORT = ['TRENDING', 'SCORE_DESC', 'POPULARITY'];

export const SEARCH_ANIME = gql`
  query SearchAnime($search: String, $page: Int, $perPage: Int, $sort: [MediaSort], $year: Int) {
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
