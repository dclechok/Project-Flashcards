import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";

function AddCard() {
  const { deckId } = useParams();
  const newCardTemplate = {
    deckId: deckId,
    front: '',
    back: ''
    }
  const [deck, setDeck] = useState({});
  const abortController = new AbortController();
  const [newCard, setNewCard] = useState(newCardTemplate);
  
  async function readTheDeck() {
    try {
      const response = await readDeck(deckId, abortController.signal);
      setDeck(response);
    } catch (err) {
      console.log(err, 'Failure reading deck');
    }
  }

  useEffect(() => {
    readTheDeck();
  }, [deckId]);

  const handleFormChange = (event) => {
    setNewCard({
        ...newCard,
      [event.target.id]: event.target.value,
    }); //create a controlled input
    console.log(newCard, 'form change');
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setNewCard({
        [event.target.id]: event.target.value,
        deckId: deckId,
    });
    //createCard
    await createCard(deckId, newCard, abortController.signal);
    setNewCard(newCardTemplate);
  };

  return (
    <React.Fragment>
      <h1>{deck.name}: Add Card</h1>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="front">Front</label>
        <br />
        <textarea
          id="front"
          style={{ width: "100%" }}
          placeholder="Front side of card"
          value={newCard.front}
          onChange={handleFormChange}
        />
        <br />
        <label htmlFor="back">Back</label>
        <br />
        <textarea
          id="back"
          style={{ width: "100%" }}
          placeholder="Back side of card"
          value={newCard.back}
          onChange={handleFormChange}
        />
        <br />
        <Link to={`/decks/${deckId}`} className="btn btn-secondary">
          Done
        </Link>
        <button className="btn btn-primary" type="submit">
          Save
        </button>
      </form>
    </React.Fragment>
  );
}

export default AddCard;
