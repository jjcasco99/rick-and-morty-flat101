import { createContext, useEffect, useState } from "react";
import { useEpisodes } from "../hooks/useEpisodes";
import { useLocations } from "../hooks/useLocations";

export const EpisodeContext = createContext({
  episodes: [],
  locations: [],
  getEpisodes: () => {},
  getLocations: () => {},
  search: "",
  onSearch: () => {},
  ready: "",
  totalEpisodePages: "",
  totalLocationsPages: "",
  page: "",
  onPaginate: () => {}
});

export const EpisodeProvider = ({ children }) => {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const { getEpisodes, episodes, ready, totalEpisodePages } = useEpisodes()
  const { getLocations, locations, totalLocationsPages } = useLocations()

  return (
    <EpisodeContext.Provider
      value={{
        episodes,
        locations,
        getEpisodes,
        getLocations,
        search,
        onSearch: (value) => { 
          setSearch(value); 
          setPage(1); 
        },
        ready,
        totalEpisodePages,
        totalLocationsPages,
        page,
        onPaginate: (value) => {
          setPage(value)
        }
      }}
    >
      {children}
    </EpisodeContext.Provider>
  );
}