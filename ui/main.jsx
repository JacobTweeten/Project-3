import React from "react";
import { createRoot } from "react-dom/client";

async function main() {
  const rootElt = document.getElementById("app");
  const root = createRoot(rootElt);
  root.render(<h1>Hello From React woohoohoo !</h1>);
}

window.onload = main;
