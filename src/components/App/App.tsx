import css from './App.module.css';
import fetchMovies from '../../services/movieService';
import SearchBar from '../SearchBar/SearchBar';
import { useEffect, useState } from 'react';
import type { Movie } from '../../types/movie';
import toast, { Toaster } from 'react-hot-toast';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';

function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
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
  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['movie', query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query.trim() !== '',
    placeholderData: keepPreviousData,
  });
  useEffect(() => {
    if (isError) {
      toast.error('Something went wrong. Please try again.');
    
    }
  }, [isError, error]);
  useEffect(() => {
    if (data && data.results.length === 0) {
      toast.error('No movies found for your request.');
    }
  }, [data]);
  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };
  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;
  return (
    <>
      {<Toaster position="top-right" reverseOrder={false} />}
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isSuccess && totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
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
