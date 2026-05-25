import { useContext, useEffect } from "react"
import { EpisodeContext } from "../context/EpisodeContext"
import { Container } from "../components/Container"
import { Pagination } from "../components/Pagination"

export const Episodes = () => {
    const { onPaginate, page, search, getEpisodes, episodes, totalEpisodePages } = useContext(EpisodeContext)

    useEffect(() => {
        getEpisodes({
          variables: {
            name: search,
            page,
            withCharacters: false
          }
        })
    }, [search, page])

    return (
        <section className="pt-4 pb-2">
            {episodes?.map(ep => (
                <Container
                    key={ep?.id}
                    id={ep?.id}
                    name={ep?.name}
                    episode={ep?.episode}
                    date={ep?.air_date}
                    to={`episode/${ep?.episode?.toLocaleLowerCase()}`}
                />
            ))}
            <Pagination totalPages={totalEpisodePages} onPaginate={onPaginate} page={page}/>
        </section>
  )
}