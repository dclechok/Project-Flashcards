import React from 'react';
{/* creates the delete button and functionality on deck listings*/}
function DeleteDeckButton(){
    return (
        <button type="button" className="btn btn-danger" style={{float: 'right', marginRight: '8%'}}>Delete</button>
    );
}

export default DeleteDeckButton;