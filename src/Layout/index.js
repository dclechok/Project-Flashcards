import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import CreateDeckButton from "./CreateDeckButton";
import DeckList from './DeckList';
import { Route, Switch } from "react-router-dom";

function Layout() {
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <CreateDeckButton />{/* create a new deck button*/}
            <DeckList /> {/* This renders our list of existing decks on the home page*/}
          </Route>
          <Route path="/decks/new">
            <p>Breadcrumbs</p>
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
