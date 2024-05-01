import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

function FilmView() {
  const [film, setFilm] = useState(null);

  useEffect(() => {
    const path = window.location.pathname;
    const id = path.split("/")[2];

    fetch(`/api/v1/films/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => setFilm(data));
  }, []);

  return (
    <div>
      <h1>{film.title}</h1>
      <p>{film.description}</p>
      <p>ID :{film.id}</p>
      <a href="/">Back to List View</a>
    </div>
  );
}

async function main() {
  const rootElt = document.getElementById("app");
  const root = createRoot(rootElt);
  root.render(<FilmView />);
}

window.onload = main;
