import { SetStateAction, useState } from "react";

export default function Player({
  initialName,
  symbol,
  isActive,
}: {
  initialName: string;
  symbol: string;
  isActive: boolean;
}) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false); // initialize not editing player

  function handleEditClick() {
    // function that will be triggered by user click
    // invoking function will cause React to reset the state, too
    //    {/* use playerName variable here */}
    setIsEditing((editing) => !editing); // will set the status to whatever is opposite of initial state BEFORE user click
  }

  function handleChange(event: { target: { value: SetStateAction<string> } }) {
    // will pass in event object
    // event object automatically created with user key stroke and get value of player's name
    console.log(`event`, event);
    console.log(`event target`, event.target);
    console.log(`event target value`, event.target.value);
    setPlayerName(event.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;
  //   let btnCaption = "edit"
  if (isEditing) {
    editablePlayerName = (
      <input type="type" required value={playerName} onChange={handleChange} />
    );
    // onChange will change with every key stroke
    // btnCaption="save"
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editablePlayerName}

        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
