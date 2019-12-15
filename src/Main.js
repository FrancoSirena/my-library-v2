import React from "react";
import { Router } from "@reach/router";
import Bookshelf from "./Bookshelf";
import BookSearch from "./BookSearch";

function Main() {
  return (
    <main className="main">
      <Router>
        <Bookshelf path="/" />
        <BookSearch path="/search" />
      </Router>
    </main>
  );
}

export default Main;
