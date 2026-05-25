import { useLazyQuery } from "@apollo/client/react"
import { QUERY_EPISODES } from "../queries/episodes"


export const useEpisodes = () => {
    const [getEpisodes, { data, loading, called }] = useLazyQuery(QUERY_EPISODES)

    return {
        getEpisodes,
        episodes: data?.episodes?.results,
        totalEpisodePages: data?.episodes?.info?.pages,
        ready: !loading && called
    }
}