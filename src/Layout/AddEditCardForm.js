import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { updateCard, createCard } from "../utils/api";

function AddEditCardForm({ cardId = null }) {
  const { deckId } = useParams();
  const newCardTemplate = {
    deckId: deckId,
    front: "",
    back: "",
    id: 0,
  };

  const abortController = new AbortController();
  const [newCard, setNewCard] = useState(newCardTemplate);

  const handleFormChange = (event) => {
    setNewCard({
      ...newCard,
      [event.target.id]: event.target.value,
    }); //create a controlled input
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault(); //prevent page from reloading after form submission
    if (cardId) {
      //if we sent in cardId to update
      const card = {
          ...newCard,
        [event.target.id]: event.target.value,
        deckId: deckId,
        id: cardId,
      };
      setNewCard(card); //build the card we're updating
      //keep the same id as card we're editing
      try {
        console.log(cardId, card.id);
        await updateCard(card, abortController.signal); //update care
      } catch (err) {
        console.log(err, "Error updating card");
      }
    } else {
      //if we're not updating then create a brand new card
      setNewCard({
        [event.target.id]: event.target.value,
        deckId: deckId,
      });
      try {
        await createCard(deckId, newCard, abortController.signal);
      } catch (err) {
        console.log(err, "Error creating card");
      }
    }
    // setNewCard(newCardTemplate);
  };

  return (
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
  );
}

export default AddEditCardForm;
