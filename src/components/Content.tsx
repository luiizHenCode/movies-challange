import { useEffect, useState } from "react";

import "../styles/content.scss";

import { MovieCard } from "./MovieCard";
import { api } from "../services/api";

interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface Genre {
  id: number;
  title: string;
}

interface Props {
  genre: Genre;
  handleOpenMovieDrawer: (movieId: string) => void;
}

export function Content({ genre, handleOpenMovieDrawer }: Props) {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    api.get<Movie[]>(`movies/?Genre_id=${genre.id}`).then((response) => {
      setMovies(response.data);
    });
  }, [genre.id]);

  return (
    <div className="container">
      <header>
        <span className="category">
          Categoria:<span> {genre.title}</span>
        </span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              handleOpenDrawer={handleOpenMovieDrawer}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
