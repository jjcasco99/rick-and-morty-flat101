import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { EpisodeContext } from "../context/EpisodeContext";
import { Header } from "../components/Header";
import { Carrousel } from "../components/Carrousel";
import { DetailForm } from "../sections/DetailForm";
import { Loading } from "../components/Loading";

export const Detail = () => {
  const { id } = useParams();
  const { getEpisodes, episodes, readyEpisodes } = useContext(EpisodeContext)
  const { name, characters, air_date: date, episode } = episodes?.[0] || {}

  useEffect(() => {
    getEpisodes({
      variables: {
        episode: id,
        withCharacters: true
      }
    })
  }, [id])

  return (
    <div className="w-full max-w-4xl mx-auto min-h-screen">
      {readyEpisodes ?
        <>
          <Header
            title={name}
            backTo={"/"}
          />
          <section className="px-4 md:px-6 pt-4 pb-8 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
            <div>
              <p className="text-xs font-semibold text-teal-400 uppercase">{episode}</p>
              <h2 className="text-xl font-bold text-white mt-0.5 mb-1">{name}</h2>
              <p className="text-zinc-400 text-sm mb-5">{date}</p>
              <p className="text-xs font-semibold text-zinc-500 uppercase mb-2">Personajes</p>
              <div className="-mx-4 lg:mx-0">
                <Carrousel options={characters} />
              </div>
            </div>
            <div className="mt-6 lg:mt-0">
              <DetailForm />
            </div>
          </section>
        </>
        : <Loading />}
    </div>
  )
}