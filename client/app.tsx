import React, { useState } from "react";
import Navbar from "./components/Navbar";
import TweetForm from "./components/TweetForm";
import TweetGraph from "./components/TweetGraph";

const TweetContext = React.createContext([1, 2, 3]);
export default function app() {
  const tweets = [1, 2, 3, 4];
  return (
    <div>
      <Navbar />
      <div className="main">
        <TweetContext.Provider value={tweets}>
          <TweetForm />
          <TweetGraph />
        </TweetContext.Provider>
      </div>
    </div>
  );
}
