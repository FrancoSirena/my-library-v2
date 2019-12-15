import React from "react";
import { Link } from "@reach/router";

function Navigation() {
  return (
    <nav className="navigation">
      <Link className="navigation-item" to="/">
        Bookshelf
      </Link>
      <Link className="navigation-item" to="/search">
        Add new Books
      </Link>
    </nav>
  );
}

export default Navigation;
