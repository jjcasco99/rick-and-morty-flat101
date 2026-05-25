import { gql } from "@apollo/client";

export const QUERY_EPISODES = gql`
query GetEpisodes($name: String, $episode: String, $page: Int, $withCharacters: Boolean!) {
  episodes(filter: { name: $name, episode: $episode }, page: $page) {
    info {
      count
      pages
    }

    results {
      id
      name
      air_date
      episode
      characters @include(if: $withCharacters) {
        id
        name
        status
        type
        image
      }
    }
  }
}`