import { useState } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import mockData from "../mock.json"

const TABS = {
  EPISODES: "EPISODES",
  LOCATIONS: "LOCATIONS"
}

const Home = () => {
  const [activeTab, setActiveTab] = useState(TABS.EPISODES)
  return <section>
    <Header title={"Rick and Morty"} />
    <Tabs 
        activeTab={activeTab}
        onClick={(value) => setActiveTab(value)}
        options={[
        {
          title: "Episodios",
          value: TABS.EPISODES
        },
          {
          title: "Localizaciones",
          value: TABS.LOCATIONS
        },
    ]}/>
    {activeTab === TABS.EPISODES ? <Episodes /> : <>Locations</>}
  </section>;
}

const Tabs = ({ options, activeTab, onClick }) => {
  return (
    <div className="flex items-center justify-center bg-purple-400 pt-2">
        {options?.map(opt => (
          <button
            key={opt?.value}
            onClick={() => onClick(opt?.value)}
            className={`
              ${activeTab === opt?.value && "border-b-4 border-red-500"}
              px-4 py-1 w-full`}
          >
            {opt?.title}
          </button>
        ))}
    </div>
  )
}

const Episodes = () => {
  return <section>
    {mockData?.data?.episodes?.results?.map(ep => {
      return (
      <div className="px-2 bg-amber-300 py-1 mb-1" key={ep?.id}>
        <Link to={`episode/${ep?.id}`}>
            <p className="text-[10px] font-semibold text-gray-600">{ep?.episode}</p>
            <h4 className="text-xl">{ep?.name}</h4>
            <p className="text-gray-600 text-[14px]">{ep?.air_date}</p>
        </Link>
      </div>
      )
    })}
  </section>;
}

const Header = ({ title, backTo }) => {
  return (
    <header className="flex items-center gap-2 bg-red-500 w-full p-4">
      {backTo && <Link to={`/${backTo}`}>🔙</Link>}
      <h1 className="">{title}</h1>
    </header>
  )
}

const Episode = () => {
  const { id } = useParams();

  return (
    <Header 
      title={mockData?.data?.episodes?.results?.find(ep => ep?.id === id)?.name} 
      backTo={"/"}
      />
  )
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/episode/:id" element={<Episode />} />
    </Routes>
  );
}

export default App