import React, { useEffect, useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { listDecks, deleteCard } from "../utils/api/index";
import CreateDeckButton from "./CreateDeckButton";
import DeckList from "./DeckList";
import ViewDeck from "./ViewDeck";
import StudyDeck from './StudyDeck';
import { deleteCardPrompt } from './deleteButton';
import { Route, Switch } from "react-router-dom";

function Layout() {
  const [deckList, setDeckList] = useState([]);
  const [delCard, setDelCard] = useState('');

  const controller = new AbortController();

  useEffect(() => { //creates a list of all decks, and stores it in state variable 'deckList'
    async function deleteTheCard(){
      try{
          const response = await deleteCard(delCard, controller.signal);
          setDeckList(response);
        }catch(err){
          console.log("Deleting the card aborted", err);
        }
      }
      deleteTheCard();
      return () => controller.abort();
    }, [delCard]);


  useEffect(() => { //creates a list of all decks, and stores it in state variable 'deckList'
    async function loadList(){
      try{
          const response = await listDecks(controller.signal);
          setDeckList(response);
        }catch(err){
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
            <p>Create Deck</p>
          </Route>
          <Route exact path="/decks/:deckId">
            <ViewDeck setDelCard={setDelCard} />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <StudyDeck />
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
