import React, { useState } from "react";
import Navbar from "./components/Navbar";
import TweetForm from "./components/TweetForm";
import TweetGraph from "./components/TweetGraph";
export default function app() {
  return (
    <div>
      <Navbar />
      <div className="main">
        <TweetForm />
        <TweetGraph />
      </div>
    </div>
  );
}
