import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";

function CreateDeck() {

  const newDeckTemplate = {
    //new deck template
    name: "",
    description: "",
  };

  const [newDeck, setNewDeck] = useState(newDeckTemplate); //default new deck state var
  const [newDeckId, setNewDeckId] = useState(0);
  const history = useHistory();

  const handleFormChange = (event) => {
    setNewDeck({
      ...newDeck,
      [event.target.id]: event.target.value,
    }); //create a controlled input
  };

  function onSubmitHandler(event) {
    event.preventDefault();
    const abortController = new AbortController();
    async function createTheDeck() {
      
      //create deck with call to api with createDeck function
      try {
        const newDeckInfo = await createDeck(newDeck, abortController.signal); // data from the new deck we create
        setNewDeckId(newDeckInfo.id);
        history.push(`/decks/${newDeckInfo.id}`);
      } catch (err) {
        console.log(err, "Creating a new deck failed");
      }
    }
    createTheDeck();
    return () => abortController.abort();
  }

  return (
    <React.Fragment>
      <h1>Create Deck</h1>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="name">Name</label>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          style={{ width: "100%" }}
          placeholder="Deck Name"
          value={newDeck.name}
          onChange={handleFormChange} //create controlled input
        ></input>
        <br />
        <label htmlFor="description">Description</label>
        <br />
        <textarea
          type="textarea"
          id="description"
          name="description"
          style={{ width: "100%" }}
          placeholder="Brief description of the deck"
          value={newDeck.description}
          onChange={handleFormChange} //create controlled input
        ></textarea>
        <br />
        <br />
        <Link to="/">
          <button type="submit" className="btn btn-secondary">
            Cancel
          </button>
        </Link>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </React.Fragment>
  );
}

export default CreateDeck;