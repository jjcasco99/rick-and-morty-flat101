import { useContext, useEffect } from "react"
import { EpisodeContext } from "../context/EpisodeContext"
import { Container } from "../components/Container"
import { Pagination } from "../components/Pagination"
import { Loading } from "../components/Loading"

export const Locations = () => {
    const { onPaginate, page, getLocations, search, locations, totalLocationsPages, readyLocations } = useContext(EpisodeContext)

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
            {readyLocations ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 px-4">
                {locations?.map(loc => (
                  <Container
                    key={loc?.id}
                    id={loc?.id}
                    name={loc?.name}
                    dimension={loc?.dimension}
                    type={loc?.type}
                  />
                ))}
              </div>
            ) : (
                <Loading />
            )}
            <Pagination totalPages={totalLocationsPages} onPaginate={onPaginate} page={page} />
        </section>
    )
}