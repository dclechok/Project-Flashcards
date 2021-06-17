

export function deleteCardPrompt(){
    return windows.confirm("Delete this card?  You will not be able to recover it.");
}

export function deleteDeckPrompt(){
    return windows.confirm("Delete this deck?  You will not be able to recover it.");
}