import { createContext, useState } from "react";
import mockData from "../../mock.json"
import mockEpisode from "../../mockEpisode.json"

export const EpisodeContext = createContext();

export const EpisodeProvider = ({ children }) => {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <EpisodeContext.Provider
      value={{
        mockData,
        mockEpisode
      }}
    >
      {children}
    </EpisodeContext.Provider>
  );
}