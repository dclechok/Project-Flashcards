import React, { useEffect, useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { listDecks, deleteCard, deleteDeck } from "../utils/api/index";
import CreateDeckButton from "./CreateDeckButton";
import DeckList from "./DeckList";
import ViewDeck from "./ViewDeck";
import StudyDeck from "./StudyDeck";
import CreateDeck from "./CreateDeck";
import EditCard from "./EditCard";
import EditDeck from "./EditDeck";

import { Route, Switch } from "react-router-dom";

function Layout() {
  const [deckList, setDeckList] = useState([]);
  const controller = new AbortController();

  function deleteCardPrompt() {
    return window.confirm(
      "Delete this card?  You will not be able to recover it."
    );
  }

  function deleteDeckPrompt() {
    return window.confirm(
      "Delete this deck?  You will not be able to recover it."
    );
  }

  useEffect(() => {
    //creates a list of all decks, and stores it in state variable 'deckList'
    async function loadList() {
      try {
        const response = await listDecks(controller.signal);
        setDeckList(response);
      } catch (err) {
        console.log("Loading deck list aborted", err);
      }
    }
    loadList();
    return () => controller.abort();
  }, []);

  return (
    <React.Fragment>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <CreateDeckButton />
            {/* create a new deck button*/}
            <DeckList deckList={deckList} />
            {/* This renders our list of existing decks on the home page*/}
          </Route>
          <Route exact path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <ViewDeck />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <StudyDeck />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default Layout;
