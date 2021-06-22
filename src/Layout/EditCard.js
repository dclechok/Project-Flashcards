import React from "react";
import { Link, useHistory, useRouteMatch } from 'react-router-dom';

function EditCard() {

    const { path } = useRouteMatch();

    return (
    <React.Fragment>
      <p className="card" style={{ backgroundColor: "lightgray" }}>
        <span>
          <Link to="/">Home</Link> /
          <Link > Blah</Link> /
          <Link > Edit Card</Link>
        </span>
      </p>
    </React.Fragment>
  );
}

export default EditCard;
