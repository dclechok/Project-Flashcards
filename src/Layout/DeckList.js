import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listDecks, deleteDeck } from '../utils/api/index';

function DeckList() {
  //each decklist we need: deck name, length, description
  const [deckList, setDeckList] = useState([]);
  const abortController = new AbortController();

  async function loadList() {
    try {
      const response = await listDecks(abortController.signal);
      setDeckList(response);
    } catch (err) {
      console.log("Loading deck list aborted", err);
    }
  }

  useEffect(() => {
    //creates a list of all decks, and stores it in state variable 'deckList'
    loadList();
    return () => abortController.abort();
  }, []);

  const onClickHandler = async (deckId) => {
    if(window.confirm("Delete the deck?")){
      //delete deck here
      await deleteDeck(deckId, abortController.signal);
      loadList();
    }
  };

  return deckList.map((deck, unusedKey) => {
    console.log(deck);
    return (
      <div className="card" style={{marginLeft: '20%', marginRight: '20%', marginBottom: '2%'}}>
        <h4>
          {deck.name}
          <span style={{float: 'right', fontSize: '14px', marginTop: '2%'}}>{`${deck.cards.length} cards`}</span>
        </h4>
        <p>{deck.description}</p>
        <Link to={`/decks/${deck.id}`} className="btn btn-secondary" style={{width: "12%"}}> {/* Link to the basic deck display page */}
            View
        </Link>
        <Link to={`/decks/${deck.id}/study`} className="btn btn-primary" style={{width: "12%"}}>  {/* Link to the study page */}
            Study
        </Link>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onClickHandler(deck.id)}
          style={{width: "12%"}}
        >
          Delete
        </button>
      </div>
    );
  });
}

export default DeckList;
