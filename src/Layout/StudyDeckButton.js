import React from "react";
import { Link } from 'react-router-dom';

function StudyDeckButton() {
  return (
    <Link to="decks/:deckId/study">
      <button
        type="button"
        className="btn btn-primary"
        style={{ margin: "8px" }}
      >
        Study
      </button>
    </Link>
  );
}

export default StudyDeckButton;
