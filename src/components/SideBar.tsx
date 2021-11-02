import { useEffect, useState } from "react";

import "../styles/sidebar.scss";

import { api } from "../services/api";
import { Button } from "./Button";

interface Genre {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

interface Props {
  onGenreSelect: (genreId: number) => void;
  genreSelected: number;
}

export function SideBar({ onGenreSelect, genreSelected }: Props) {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    api.get<Genre[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>
      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => onGenreSelect(genre.id)}
            selected={genreSelected === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
