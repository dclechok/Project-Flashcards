import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { deleteDeck, readDeck, deleteCard } from "../utils/api/index";

function ViewDeck() {
  const { deckId } = useParams();
  const history = useHistory();
  const abortController = new AbortController();
  const [deck, setDeck] = useState([]);

  async function readTheDeck() {
    try {
      const response = await readDeck(deckId, abortController.signal);
      setDeck(response);
    } catch (err) {
      console.log(err);
    }
    return () => abortController.abort();
  }

  useEffect(() => {
    readTheDeck();
  }, [deckId]);

  const deleteDeckHandler = async () => {
    if(window.confirm("Delete the deck?")){
      //delete deck here
      await deleteDeck(deckId, abortController.signal);
      history.push('/');
    }
  };

  const deleteCardHandler = async (cardId) => {
    if(window.confirm("Delete the card?")){
      //delete card here
      await deleteCard(cardId, abortController.signal);
      await readTheDeck();
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
      <Link to={`/decks/${deckId}/study`} className="btn btn-primary" >
          Study
      </Link>
      <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
        + Add Cards
      </Link>
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
            <div className="card" id={key} style={{ margin: "0 20% 20px 20%" }}>
              <p>{card.front}</p>
              <p>{card.back}</p>
              <Link to={`/decks/${deck.id}/cards/${card.id}/edit`} style={{width: "14%"}} className="btn btn-secondary">
                  Edit
              </Link>
              <button
                type="button"
                className="btn btn-danger"
                style={{width: "14%"}}
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
