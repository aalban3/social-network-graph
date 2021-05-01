import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { gql, useMutation } from "@apollo/client";

const ADD_TWEET = gql`
  mutation AddTweet($tweetId: ID!, $text: String!, $name: String!) {
    CreateTweet(tweetId: $tweetId, text: $text) {
      text
    }
    AddUserTweets(from: { name: $name }, to: { tweetId: $tweetId }) {
      from {
        name
      }
      to {
        tweetId
      }
    }
  }
`;

const TWEET_ID: any = Math.floor(Math.random() * 20000);

const TweetForm = () => {
  const [user, setUser] = useState("");
  const [text, setText] = useState("");

  const [addTweet] = useMutation(ADD_TWEET, {
    update(cache, { data: { addTweet } }) {
      cache.modify({
        fields: {
          tweets(tweets = []) {
            const newTweet = cache.writeFragment({
              data: addTweet,
              fragment: gql`
                fragment NewTweet on Tweet {
                  tweetId
                  text
                }
              `,
            });
            return [...tweets, newTweet];
          },
        },
      });
    },
  });
  const handleSubmit = (evt) => {
    //evt.preventDefault();
    addTweet({
      variables: {
        tweetId: TWEET_ID,
        text: text,
        name: user,
      },
    })
      .then((res) => {
        console.log("response --->", res);
      })
      .catch((err) => {
        console.log(" ERROR ADDING--->", err);
      });
    setUser("");
    setText("");
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <big>User</big>
        <input
          type="text"
          name="user"
          value={user}
          onChange={(evt) => setUser(evt.target.value)}
        />
        <big>Text</big>
        <textarea
          name="text"
          value={text}
          onChange={(evt) => setText(evt.target.value)}
        />
        <Button type="submit" className="form-button">
          Tweet it!
        </Button>
      </form>
    </div>
  );
};

export default TweetForm;
