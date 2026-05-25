import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { EpisodeContext } from "../context/EpisodeContext";
import { Header } from "../components/Header";
import { Carrousel } from "../components/Carrousel";
import { DetailForm } from "../sections/DetailForm";

export const Detail = () => {
  const { id } = useParams(); 
  const { getEpisodes, episodes, onSearch } = useContext(EpisodeContext)
  const { name, characters, air_date: date , episode } = episodes?.[0] || {}

  useEffect(() => {
    getEpisodes({
      variables: {
        episode: id,
        withCharacters: true
      }
    })
  }, [id])

  return (
    <div className="max-w-md mx-auto min-h-screen">
      <Header
        title={name}
        backTo={"/"}
      />
      <section className="px-4 pt-4 pb-8">
        <p className="text-xs font-semibold text-teal-400 uppercase">{episode}</p>
        <h2 className="text-xl font-bold text-white mt-0.5 mb-1">{name}</h2>
        <p className="text-zinc-400 text-sm mb-5">{date}</p>
        <p className="text-xs font-semibold text-zinc-500 uppercase mb-2">Personajes</p>
        <div className="-mx-4">
          <Carrousel options={characters} />
        </div>
        <div className="mt-6">
          <DetailForm />
        </div>
      </section>
    </div>
  )
}