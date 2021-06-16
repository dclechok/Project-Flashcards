import React from "react";
import { Link } from "react-router-dom";

function DeckList({ deckList }) {
  //each decklist we need: deck name, length, description
  return deckList.map((deck, unusedKey) => {
    return (
      <div className="card" style={{marginLeft: '20%', marginRight: '20%', marginBottom: '2%'}}>
        <h4>
          {deck.name}
          <span style={{float: 'right', fontSize: '14px', marginTop: '2%'}}>{`${deck.cards.length} cards`}</span>
        </h4>
        <p>{deck.description}</p>
        <Link to={`/decks/${deck.id}`}> {/* Link to the basic deck display page */}
          <button type="button" className="btn btn-secondary">
            View
          </button>
        </Link>
        <Link to={`/decks/${deck.id}/study`}>  {/* Link to the study page */}
          <button
            type="button"
            className="btn btn-primary"
          >
            Study
          </button>
        </Link>
        <button
          type="button"
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>
    );
  });
}

export default DeckList;
