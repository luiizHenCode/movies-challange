import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/all";
import "../styles/movie-details.scss";

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
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
}

interface Props {
  movieId: string;
  close: () => void;
}

export function MovieDetails({ movieId, close }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    api.get<Movie[]>(`/movies?imdbID=${movieId}`).then((response) => {
      setMovie(response.data[0]);
    });
  }, [movieId]);

  return (
    <div className={"drawer-wrapper"}>
      <div className="overlay" onClick={close} />
      <div className={"drawer"}>
        <button onClick={close} className="close-drawer">
          <FaTimes size={20} />
        </button>

        {movie !== null ? (
          <div className={"content"}>
            <img src={movie.Poster} />
            <h2>{movie.Title}</h2>

            <div className={"ratings"}>
              {movie.Ratings.map((rating) => (
                <div key={rating.Source}>
                  <span>{rating.Value}</span>
                  <small>{rating.Source}</small>
                </div>
              ))}
            </div>

            <div className="sinopse">
              <h4>Plot</h4>
              <p>{movie.Plot}</p>
            </div>

            <div className={"details"}>
              <div>
                <strong>Runtime:</strong>
                <span>{movie.Runtime}</span>
              </div>
              <div>
                <strong>Genre:</strong>
                <span>{movie.Genre}</span>
              </div>
              <div>
                <strong>Director:</strong>
                <span>{movie.Director}</span>
              </div>
              <div>
                <strong>Writer:</strong>
                <span>{movie.Writer}</span>
              </div>
              <div>
                <strong>Actors:</strong>
                <span>{movie.Actors}</span>
              </div>
            </div>
          </div>
        ) : (
          <span>Loading...</span>
        )}
      </div>
    </div>
  );
}
