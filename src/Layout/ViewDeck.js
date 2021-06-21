import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import { deleteCardPrompt } from "./deleteButton";
import { deleteDeckPrompt } from "./deleteButton";

function ViewDeck() {
  const { deckId } = useParams();
  const abortController = new AbortController();
  const [deck, setDeck] = useState([]);

  async function readTheDeck() {
    try {
      const response = await readDeck(deckId, abortController.signal);
      setDeck(response);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    return () => abortController.abort();
  }

  useEffect(() => {
    readTheDeck();
  }, [deckId]);

  const deleteCardHandler = (cardId) => {
    if (deleteCardPrompt()) {
      console.log("hello test");
    }
  };

  const deleteDeckHandler = (deckId) => {
    if (deleteDeckPrompt()) {
      console.log(deckId);
    }
  };

  return (
    <React.Fragment>
      <h3>{deck.name}</h3>
      <p>{deck.description}</p>
      <Link to={`/decks/${deck.id}/edit`}>
        <button type="button" className="btn btn-secondary">
          Edit
        </button>
      </Link>
      <Link to={`/decks/${deckId}/study`}>
        <button type="button" className="btn btn-primary">
          Study
        </button>
      </Link>
      <button type="button" className="btn btn-primary">
        + Add Cards
      </button>
      <button
        type="button"
        className="btn btn-danger"
        onClick={deleteDeckHandler}
      >
        Delete
      </button>
      <h4>Cards</h4>
      {deck.cards &&
        deck.cards.map((card, key) => {
          return (
            <div className="card" id={key} style={{ margin: "0 10% 20px 10%" }}>
              <p>{card.front}</p>
              <p>{card.back}</p>
              <Link to={`/decks/${deck.id}/cards/${card.id}/edit`}>
                <button type="button" className="btn btn-secondary">
                  Edit
                </button>
              </Link>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => deleteCardHandler(card.id)}
              >
                Delete
              </button>
            </div>
          );
        })}
      ;
    </React.Fragment>
  );
}

export default ViewDeck;
