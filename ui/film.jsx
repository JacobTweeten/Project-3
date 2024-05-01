import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

function FilmView() {
  const [film, setFilm] = useState(null);

  useEffect(() => {
    const path = window.location.pathname;
    const id = path.split("/")[2];

    fetch(`/api/v1/film/${id}`)
      .then((response) => response.json())
      .then((data) => setFilm(data))
      .catch((error) => console.error("Error fetching film data:", error));
  }, []);

  const handleDelete = () => {
    const path = window.location.pathname;
    const id = path.split("/")[2];

    fetch(`/api/v1/film/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          window.location.href = "/";
        } else {
          console.error("Error deleting film:", data.reason);
        }
      })
      .catch((error) => console.error("Error deleting film:", error));
  };

  if (!film) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{film.title}</h1>
      <p>{film.description}</p>
      <p>ID: {film.id}</p>
      <button onClick={handleDelete}>Delete</button>
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
