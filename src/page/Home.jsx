import { useContext, useEffect, useState } from "react";
import { Tabs } from "../components/Tabs";
import { Header } from "../components/Header";
import { TABS } from "../constants"
import { EpisodeContext } from "../context/EpisodeContext";
import { Episodes } from "../sections/Episodes";
import { Locations } from "../sections/Locations";

export const Home = () => {
  const [activeTab, setActiveTab] = useState(TABS.EPISODES)
  const { onSearch, onPaginate } = useContext(EpisodeContext)

  useEffect(() => {
    onSearch("")
  }, [])

  return (
    <section className="w-full max-w-4xl mx-auto min-h-screen">
      <Header title={"Rick and Morty"} onSearch={onSearch} />
      <Tabs
        activeTab={activeTab}
        onClick={(value) => {
          setActiveTab(value)
          onSearch("")
          onPaginate(1)
        }}
        options={[
          {
            title: "Episodios",
            value: TABS.EPISODES
          },
          {
            title: "Localizaciones",
            value: TABS.LOCATIONS
          },
        ]} />
      {activeTab === TABS.EPISODES ? <Episodes /> : <Locations />}
    </section>
  )
}