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
  readyEpisodes: "",
  readyLocations: "",
  totalEpisodePages: "",
  totalLocationsPages: "",
  page: "",
  onPaginate: () => {}
});

export const EpisodeProvider = ({ children }) => {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const { getEpisodes, episodes, readyEpisodes, totalEpisodePages } = useEpisodes()
  const { getLocations, locations, readyLocations, totalLocationsPages } = useLocations()

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
        readyEpisodes,
        readyLocations,
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