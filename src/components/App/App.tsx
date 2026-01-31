import './App.module.css';
import fetchMovies from '../../services/movieService';
import SearchBar from '../SearchBar/SearchBar';
import { useEffect, useState } from 'react';
import type { Movie } from '../../types/movie';
import toast, { Toaster } from 'react-hot-toast';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isMovieModalOpen, setIsMovieModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsMovieModalOpen(true);
  };
  const closeModal = () => {
    setIsMovieModalOpen(false);
    setSelectedMovie(null);
  };
  useEffect(() => {
    if (!query) {
      return;
    }
    const getMovies = async () => {
      try {
        setIsError(false);
        setIsloading(true);
        const data = await fetchMovies(query);
        if (data.results.length === 0) {
          toast.error('No movies found for your request.');
          return;
        }
        setMovies(data.results);
      } catch (error) {
        setIsError(true);
        toast.error('Something went wrong. Please try again.');
        console.log(error);
      } finally {
        setIsloading(false);
      }
    };
    getMovies();
  }, [query]);
  const handleSearch = (query: string) => {
    setQuery(query);
    setMovies([]);
  };
  return (
    <>
      {<Toaster position="top-right" reverseOrder={false} />}
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && !isError && !isLoading && (
        <MovieGrid onSelect={openModal} movies={movies} />
      )}
      {isMovieModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </>
  );
}

export default App;
