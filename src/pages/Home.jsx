import { useEffect, useState } from 'react'
import { getGenres, getMovies } from '../api'
import useDebounce from '../hooks/useDebounce'
import MovieCard from '../components/MovieCard'
import SkeletonGrid from '../components/SkeletonGrid'
import Pagination from '../components/Pagination'

export default function Home() {
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('')
  const [page, setPage] = useState(1)
  const [genres, setGenres] = useState([])
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const query = useDebounce(search.trim())

  useEffect(() => {
    getGenres()
      .then(setGenres)
      .catch(() => {})
  }, [])

  useEffect(() => {
    setPage(1)
  }, [query, genre])

  useEffect(() => {
    let ignore = false
    setLoading(true)
    setError('')

    getMovies({ query, genre, page })
      .then((res) => {
        if (!ignore) setData(res)
      })
      .catch(() => {
        if (!ignore) setError('Could not load movies. Check your API key and connection.')
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [query, genre, page])

  return (
    <>
      <div className="filters">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a movie"
          aria-label="Search movies"
        />
        <select value={genre} onChange={(e) => setGenre(e.target.value)} disabled={!!query}>
          <option value="">All genres</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="error">{error}</p>}
      {loading && <SkeletonGrid />}

      {!loading && !error && data && (
        <>
          {data.results.length === 0 ? (
            <p className="empty">No movies match "{query}". Try another title.</p>
          ) : (
            <div className="grid">
              {data.results.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
          <Pagination page={page} totalPages={data.total_pages} onChange={setPage} />
        </>
      )}
    </>
  )
}
