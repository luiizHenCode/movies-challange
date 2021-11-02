import { useEffect, useState } from "react";

import { api } from "./services/api";

import "./styles/global.scss";

import { MovieDetails } from "./components/MovieDetails";
import { SideBar } from "./components/SideBar";
import { Content } from "./components/Content";

interface GenreResponseProps {
  id: number;
  title: string;
}

export function App() {
  const [movieId, setMovieId] = useState<string | null>(null);
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  function handleClickMovie(id: string) {
    setMovieId(id);
    document.querySelector("body")?.classList.add("scroll-lock");
  }

  function handleCloseMovieDrawer() {
    setMovieId(null);
    document.querySelector("body")?.classList.remove("scroll-lock");
  }

  useEffect(() => {
    api
      .get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data);
      });
  }, [selectedGenreId]);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar
        onGenreSelect={handleClickButton}
        genreSelected={selectedGenreId}
      />

      <Content genre={selectedGenre} handleOpenMovieDrawer={handleClickMovie} />

      {movieId !== null && (
        <MovieDetails movieId={movieId} close={handleCloseMovieDrawer} />
      )}
    </div>
  );
}
