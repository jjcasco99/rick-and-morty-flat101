import { gql } from "@apollo/client";

export const QUERY_LOCATIONS = gql`
query GetLocations($name: String, $page: Int) {
  locations(filter: { name: $name }, page: $page) {
    info {
      count
      pages
    }

    results {
      id
      name
      type
      dimension
    }
  }
}`