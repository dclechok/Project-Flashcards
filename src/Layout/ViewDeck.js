import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { deleteCard, readDeck } from "../utils/api/index";
import { deleteCardPrompt } from './deleteButton';


function ViewDeck( { setDelCard }) {
  const { deckId } = useParams();
  const abortController = new AbortController();
  const [deck, setDeck] = useState([]);

  useEffect(() => {
    async function readTheDeck() {
      try {
        const response = await readDeck(deckId, abortController.signal);
        setDeck(response);
      } catch (err) {
        console.log(err);
      }
    }
    readTheDeck();
    return () => abortController.abort();
  }, []);

  const deleteCardHandler = (deckId) => {
      if (deleteCardPrompt()) setDelCard(deckId);
  }

  return (
    <React.Fragment>
      <h3>{deck.name}</h3>
      <p>{deck.description}</p>
      <button type="button" className="btn btn-secondary">
        Edit
      </button>
      <Link to={`/decks/${deckId}/study`}>
        <button type="button" className="btn btn-primary">
          Study
        </button>
      </Link>
      <button type="button" className="btn btn-primary">
        + Add Cards
      </button>
      <button type="button" className="btn btn-danger">
        Delete
      </button>
      <h4>Cards</h4>
        {deck.cards?.map((card, key) => {
          return (
            <div className="card" id={key} style={{margin: '0 10% 20px 10%'}}>
              <p>{card.front}</p>
              <p>{card.back}</p>
              <button type="button" className="btn btn-secondary">Edit</button>
              <button type="button" className="btn btn-danger" onClick={() => deleteCardHandler(deck.id)}>Delete</button>
            </div>
          );
        })};
    </React.Fragment>
  );
}

export default ViewDeck;
