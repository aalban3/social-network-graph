import React, { useEffect, useState, useRef, useContext } from "react";
import Neovis from "neovis.js/dist/neovis.js";
import { printIntrospectionSchema } from "graphql";
const { REACT_APP_USER, REACT_APP_PW, REACT_APP_NEO_URI } = process.env;
export default function TweetGraph() {
  const neo4jUri: any = REACT_APP_NEO_URI;
  const neo4jUser: any = REACT_APP_USER;
  const neo4jPassword: any = REACT_APP_PW;
  const visRef: any = useRef(null);

  useEffect(() => {
    const config = {
      container_id: visRef.current.id,
      server_url: neo4jUri,
      server_user: neo4jUser,
      server_password: neo4jPassword,
      labels: {
        User: {
          caption: "name",
          size: "pagerank",
          community: "community",
        },
      },
      relationships: {
        POSTS: {
          caption: true,
          thickness: "count",
        },
      },
      initial_cypher:
        "MATCH (u:User)-[rel:POSTS]->(tw:Tweet) RETURN u, rel, tw ",
    };
    const viz = new Neovis(config);
    viz.render();
  });

  return (
    <div className="graph-container">
      <big>Your Network</big>
      <div className="graph-area">
        <div id="viz" ref={visRef} />
      </div>
    </div>
  );
}
