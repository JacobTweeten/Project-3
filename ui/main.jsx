import React from "react";
import { createRoot } from "react-dom/client";

// Define the FilmEntry component
function FilmEntry({ id, title, description }) {
  return (
    <p>
      <a href={`/film/${id}`}>{title}</a>: {description}
    </p>
  );
}

async function main() {
  try {
    // Fetch data from the correct API endpoint
    const filmsResponse = await fetch("http://0.0.0.0:8000/api/v1/films");
    const films = await filmsResponse.json();

    // Find the root element
    const rootElt = document.getElementById("app");
    const root = createRoot(rootElt);

    // Render the list of FilmEntry components
    root.render(
      <ul>
        {films.map((film) => (
          <li key={film.id}>
            <FilmEntry
              id={film.id}
              title={film.title}
              description={film.description}
            />
          </li>
        ))}
      </ul>,
    );
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

window.onload = main;
