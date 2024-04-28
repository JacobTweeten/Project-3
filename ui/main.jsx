import React from "react";
import { createRoot } from "react-dom/client";

async function main() {
  const rootElt = document.getElementById("app");
  const root = createRoot(rootElt);
  root.render(<h1>Hello From React Woohoo woohoohoo hoo hoo!</h1>);
}

window.onload = main;
