import { Link } from 'react-router-dom'
import { IMG } from '../api'

export default function MovieCard({ movie }) {
  const year = movie.release_date ? movie.release_date.slice(0, 4) : 'TBA'

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      {movie.poster_path ? (
        <img src={IMG + movie.poster_path} alt={`${movie.title} poster`} loading="lazy" />
      ) : (
        <div className="no-poster">No poster</div>
      )}
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>
          {year} &middot; {movie.vote_average.toFixed(1)}
        </p>
      </div>
    </Link>
  )
}
