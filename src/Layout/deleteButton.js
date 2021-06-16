import React, { useEffect } from "react";
import { deleteCard, deleteDeck } from "../utils/api/index";

//handle the card and deck delete buttons
export function DeleteCardHandler() {
    const abortController = new AbortController();

  if(window.confirm("Delete this card?  You will not be able to recover it.")){
    useEffect(() => {
        try{
            deleteCard( deckId,abortController.signal); 
        }catch(err){
            console.log('Error deleting card.', err);
        }
    });
  }

  return null;
}

export function deleteDeckHandler() {
  window.confirm("Delete this deck?  You will not be able to recover it.");
  return null;
}
