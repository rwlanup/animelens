import { gql } from '@apollo/client';

export const GET_ANIME_DETAIL = gql`
  query getAnimeDetail($id: Int) {
    Media(id: $id) {
      id
      title {
        userPreferred
      }
      format
      status
      description(asHtml: true)
      seasonYear
      duration
      bannerImage
      coverImage {
        extraLarge
      }
      genres
      synonyms
      averageScore
      relations {
        nodes {
          id
          title {
            userPreferred
          }
          type
          format
          coverImage {
            large
          }
          averageScore
          seasonYear
        }
      }
    }
  }
`;
