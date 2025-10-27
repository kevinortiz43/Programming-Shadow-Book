import React from "react";
import { createRoot } from "react-dom/client";
import Board from "./Board.tsx";

const colorHeader = <h2 id="colorHeader">Color Changer!</h2>;

const header = document.getElementById("header");
header ? createRoot(header).render(colorHeader) : console.log("can't find header element");

const root = document.getElementById("content");
root ? createRoot(root).render(<Board />) : console.log("can't find root element");