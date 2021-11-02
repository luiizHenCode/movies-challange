import { Star, Clock } from "react-feather";

import "../styles/movie-card.scss";

interface MovieCardProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Runtime: string;
}

interface Props {
  movie: MovieCardProps;
  handleOpenDrawer: (movieId: string) => void;
}

export function MovieCard({ movie, handleOpenDrawer }: Props) {
  return (
    <div className="movie-card" onClick={() => handleOpenDrawer(movie.imdbID)}>
      <img src={movie.Poster} alt={movie.Title} />

      <div>
        <div className="movie-info">
          <span>{movie.Title}</span>
          <div className="meta">
            <div>
              <Star /> {movie.Ratings[0].Value}
            </div>

            <div>
              <Clock /> {movie.Runtime}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
