import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: { api_key: import.meta.env.VITE_TMDB_KEY },
})

export const IMG = 'https://image.tmdb.org/t/p/w500'

export async function getGenres() {
  const { data } = await api.get('/genre/movie/list')
  return data.genres
}

export async function getMovies({ query, genre, page }) {
  if (query) {
    const { data } = await api.get('/search/movie', { params: { query, page } })
    return data
  }
  const { data } = await api.get('/discover/movie', {
    params: { with_genres: genre || undefined, page, sort_by: 'popularity.desc' },
  })
  return data
}

export async function getMovie(id) {
  const { data } = await api.get(`/movie/${id}`)
  return data
}
