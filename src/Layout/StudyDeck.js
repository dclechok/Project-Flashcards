import React, { useState, useEffect } from "react";
import { readDeck } from "../utils/api/index";
import { useParams, useHistory } from "react-router-dom";

function StudyDeck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ cards: [] });
  const [cardCounter, setCardCounter] = useState(1);
  const [frontSide, setFrontSide] = useState(true); //starting cards on the front side of the card
  const abortController = new AbortController();
  const history = useHistory();
  const [restart, setRestart] = useState(false); //restart the deck of cards

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
  }, []);

  useEffect(() => {
    function restartDeck() {
      if (cardCounter === deck.cards.length) {
        window.confirm("Would you like to restart deck?")
          ? console.log("restart deck")
          : history.push("/");
      }
    }
    restartDeck();
  }, [restart]);

  const onClickFlipHandler = () => {
    setFrontSide(!frontSide); //toggle front to back, or back to front
    if (cardCounter === deck.cards.length) setRestart(!restart);
  };

  const onClickNextCardHandler = () => {
    setFrontSide(true); //starting on front side of next card
    if (cardCounter < deck.cards.length) setCardCounter(cardCounter + 1); //if we're on the backside, we move on to next card so increase card counter
    console.log(cardCounter);
  };

  return (
    <React.Fragment>
      <h1>Study: {deck.name}</h1>
      {deck && deck.cards.length < 2 ? (
        <h5>Not enough cards.</h5>
      ) : (
        <div className="card" style={{ width: "80%" }}>
          <h3>
            Card {cardCounter} of {deck.cards.length}
          </h3>
          <p>
            {deck.cards && frontSide
              ? deck.cards[cardCounter - 1].front
              : deck.cards[cardCounter - 1].back}
          </p>
          <button
            className="btn btn-secondary"
            type="button"
            style={{ width: "12%" }}
            onClick={onClickFlipHandler}
          >
            Flip
          </button>
          {!frontSide && (
            <button
              className="btn btn-primary"
              type="button"
              style={{ width: "12%" }}
              onClick={onClickNextCardHandler}
            >
              Next
            </button>
          )}
        </div>
      )}
    </React.Fragment>
  );
}

export default StudyDeck;
