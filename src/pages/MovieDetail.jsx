import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getMovie, IMG } from '../api'

export default function MovieDetail() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    setMovie(null)
    setError('')
    getMovie(id)
      .then(setMovie)
      .catch(() => setError('Could not load this movie.'))
  }, [id])

  if (error) return <p className="error">{error}</p>
  if (!movie) return <p className="empty">Loading...</p>

  const hours = Math.floor(movie.runtime / 60)
  const minutes = movie.runtime % 60

  return (
    <article className="detail">
      <Link to="/" className="back">
        Back to movies
      </Link>
      <div className="detail-body">
        {movie.poster_path && <img src={IMG + movie.poster_path} alt={`${movie.title} poster`} />}
        <div>
          <h1>{movie.title}</h1>
          {movie.tagline && <p className="tagline">{movie.tagline}</p>}
          <p className="meta">
            {movie.release_date?.slice(0, 4)} &middot; {hours}h {minutes}m &middot; {movie.vote_average.toFixed(1)} / 10
          </p>
          <div className="tags">
            {movie.genres.map((g) => (
              <span key={g.id}>{g.name}</span>
            ))}
          </div>
          <p>{movie.overview || 'No overview available.'}</p>
        </div>
      </div>
    </article>
  )
}
