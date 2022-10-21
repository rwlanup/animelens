import { gql } from '@apollo/client';

export const SEARCH_ANIME = gql`
  query AnimeList($search: String, $page: Int, $perPage: Int, $sort: [MediaSort]) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        currentPage
        hasNextPage
      }
      media(type: ANIME, sort: $sort, search: $search) {
        id
        title {
          userPreferred
        }
        coverImage {
          medium
        }
        format
        seasonYear
        averageScore
      }
    }
  }
`;
