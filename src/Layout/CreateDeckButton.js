import React from "react";
import { Link } from "react-router-dom";

function CreateDeckButton() { //our create deck button component
  return (
    <Link to="/decks/new">
      <button type="button" className="btn btn-secondary" style={{marginBottom: '2%', marginLeft: '20%'}}>
        <span>+</span> Create Deck
      </button>
    </Link>
  );
}

export default CreateDeckButton;
