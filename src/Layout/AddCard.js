import React, { useState, useEffect } from "react";
import { useParams, useRouteMatch, Link } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";
import AddEditCardForm from "./AddEditCardForm";

function AddCard() {
  const { path } = useRouteMatch();
  const { deckId } = useParams();
  const newCardTemplate = {
    deckId: deckId,
    front: "",
    back: "",
  };
  const [deck, setDeck] = useState({});
  const abortController = new AbortController();
  // const [newCard, setNewCard] = useState(newCardTemplate);

  async function readTheDeck() {
    try {
      const response = await readDeck(deckId, abortController.signal);
      setDeck(response);
    } catch (err) {
      console.log(err, "Failure reading deck");
    }
  }

  useEffect(() => {
    readTheDeck();
  }, [deckId]);

  // const handleFormChange = (event) => {
  //   setNewCard({
  //     ...newCard,
  //     [event.target.id]: event.target.value,
  //   }); //create a controlled input
  // };

  // const onSubmitHandler = async (event) => {
  //   event.preventDefault();
  //   setNewCard({
  //     [event.target.id]: event.target.value,
  //     deckId: deckId,
  //   });
  //   //createCard
  //   await createCard(deckId, newCard, abortController.signal);
  //   setNewCard(newCardTemplate);
  // };

  return (
    <React.Fragment>
      <p className="card" style={{ backgroundColor: "lightgray" }}>
        <span>
          <Link to="/">Home</Link> /
          <Link to={`/decks/${deck.id}`}> {deck.name}</Link> /{" "}
          <Link to={path}> Add Card</Link>
        </span>
      </p>
      <h1>{deck.name}</h1>
      <AddEditCardForm />
    </React.Fragment>
  );
}

export default AddCard;
