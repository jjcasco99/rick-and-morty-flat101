import { useLazyQuery } from "@apollo/client/react"
import { QUERY_LOCATIONS } from "../queries/locations"


export const useLocations = () => {
    const [getLocations, { data, loading, called }] = useLazyQuery(QUERY_LOCATIONS)

    return {
        getLocations,
        locations: data?.locations?.results,
        totalLocationsPages: data?.locations?.info?.pages,
        readyLocations: !loading && called
    }
}