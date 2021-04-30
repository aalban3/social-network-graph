import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const TweetForm = () => {
  const [user, setUser] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault()
    console.log("handing submit");
    setUser("")
    setText("")
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <big>User</big>
        <input type="text" name="user" value={user} onChange={(evt) => setUser(evt.target.value)}/>
        <big>Text</big>
        <textarea name="text" value={text} onChange={(evt) => setText(evt.target.value)}/>
        <Button type="submit" className='form-button'>Tweet it!</Button>
      </form>
    </div>
  );
};

export default TweetForm;
