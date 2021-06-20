import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createDeck } from "../utils/api/index";

function CreateDeck() {
  const newDeckTemplate = {
    //new deck template
    name: "",
    description: "",
  };

  const [newDeck, setNewDeck] = useState(newDeckTemplate); //default new deck state var

  const handleFormChange = (event) => {
    setNewDeck({
      ...newDeck,
      [event.target.id]: event.target.value,
    }); //create a controlled input
    console.log(newDeck);
  };

  async function createTheDeck() { //create deck with call to api with createDeck function
    const abortController = new AbortController();
    try {
      const response = await createDeck(newDeck, abortController.signal); //is response necessary?
    } catch (err) {
    }
    return () => abortController.abort;
  }

  return (
    <React.Fragment>
      <h1>Create Deck</h1>
      <form>
        <label for="name">Name</label>
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
        <label for="description">Description</label>
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
        <button
          type="submit"
          className="btn btn-primary"
          onClick={createTheDeck}
        >
          Submit
        </button>
      </form>
    </React.Fragment>
  );
}

export default CreateDeck;
