import React from "react";
import Button from "./Button.js";
import Row from "./Row.js";

function Header(props) {
  const userStats =
    props.gamesPlayed > 0 ? (
      <Row>
        <ul className="list-reset mt-4 leading-normal">
          <li>Total score: {props.cachedPoints}</li>
          <li>GamesPlayed: {props.gamesPlayed}</li>
          <li>Avarage points: {props.avaragePoints}</li>
        </ul>  
      </Row>
    ) : (
      <Row>
        <h4 className="text-grey-darker m-2">You have no saved statics</h4>
      </Row>
    );

  return (
    <header className="flex flex-wrap">
      <Row>
        <h1 className="text-center font-black">Memory Game</h1>
      </Row>
      {userStats}
      {props.gamesPlayed > 0 && (
        <Row>
          <Button
            onClick={props.onClick}
            className="bg-transparent hover:bg-red-light text-red-light font-semibold hover:text-white py-2 px-4 border border-red hover:border-transparent rounded"
            title="CLEAR STATS"
          />
        </Row>
      )}
    </header>
  );
}

export default Header;
