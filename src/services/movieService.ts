import axios from 'axios';
import { type Movie } from '../types/movie';

interface AxiosMoviesResponse {
  results: Movie[];
}
const myKey = import.meta.env.VITE_TMDB_KEY;

export default async function fetchMovies(
  query: string
): Promise<AxiosMoviesResponse> {
  const response = await axios.get<AxiosMoviesResponse>(
    `https://api.themoviedb.org/3/search/movie`,
    {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${myKey}`,
      },
      params: {
        query,
      },
    }
  );
  return response.data;
}
