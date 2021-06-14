import React from "react";
import { Route, Link } from "react-router-dom";

function CreateDeck() { //our create deck button component
  return (
    <Link to="/decks/new">
      <button type="button" className="btn btn-secondary">
        <span>+</span> Create Deck
      </button>
    </Link>
  );
}

export default CreateDeck;
