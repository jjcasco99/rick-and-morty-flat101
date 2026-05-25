import { useContext, useEffect } from "react"
import { EpisodeContext } from "../context/EpisodeContext"
import { Container } from "../components/Container"
import { Pagination } from "../components/Pagination"

export const Locations = () => {
    const { onPaginate, page, getLocations, search, locations, totalLocationsPages } = useContext(EpisodeContext)

    useEffect(() => {
          getLocations({
              variables: {
                name: search,
                page
              }
            })
      }, [page, search])

    return (
        <section className="pt-4 pb-2">
            {locations?.map(loc => (
                <Container
                    key={loc?.id}
                    id={loc?.id}
                    name={loc?.name}
                    dimension={loc?.dimension}
                    type={loc?.type}
                />
            ))}
            <Pagination totalPages={totalLocationsPages} onPaginate={onPaginate} page={page}/>
        </section>
  )
}