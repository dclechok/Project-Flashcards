import './DeckList.css';
import React, { useEffect, useState } from "react";
import { listDecks } from "../utils/api/index";
import ViewDeckButton from './ViewDeckButton';
import StudyDeckButton from './StudyDeckButton';
import DeleteDeckButton from './DeleteDeckButton';

function DeckList() {
    //each decklist we need: deck name, length, description
    const [deckList, setDeckList] = useState([]);
    
    useEffect(() => {
    const controller = new AbortController();

    async function loadList() {
      try {
        const response = await listDecks(controller.signal);
        const newDeckList = response.map(deck => {
            return(
                <div className="deckListing">
                    <h4>{deck.name}<span className="floatRight">{`${deck.cards.length} cards`}</span></h4>
                    <p>{deck.description}</p>
                    <ViewDeckButton />
                    <StudyDeckButton />
                    <DeleteDeckButton />
                </div>
            );
        });
        setDeckList(newDeckList);
      } catch (err) {
        console.log("Aborted", err);
      }
    }
    loadList();
    return () => controller.abort();
  }, []); //render once

  return <React.Fragment>{deckList}</React.Fragment>;
}

export default DeckList;
