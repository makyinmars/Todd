import React from "react";
import { gql, useQuery } from "@apollo/client";
import Head from "next/head";

import Spinner from "../components/spinner";
import { Idea } from "./idea";

interface Vote {
  ideaId: string;
  idea: Idea;
}

interface Votes {
  votes: Vote[];
}

const VOTES = gql`
  query Votes {
    votes {
      ideaId
      idea {
        title
        imageUrl
        content
        id
      }
    }
  }
`;

const Votes = () => {
  const { data, loading, error } = useQuery<Votes>(VOTES);

  if (loading) return <Spinner />;
  if (error)
    return (
      <p className="text-red-500 text-lg font-bold text-center">
        Server unavailable, sorry
      </p>
    );

  return (
    <>
      <Head>
        <title>Results</title>
      </Head>
      <h1 className="text-center font-bold text-2xl">Results</h1>
      <div className="flex flex-col sm:w-4/5 bg-slate-600 justify-center items-center mx-auto">
        {data &&
          data.votes.map((vote, index) => (
            <ul key={index}>
              <li>{vote.ideaId}</li>
              <li>{vote.idea.title}</li>
            </ul>
          ))}
      </div>
    </>
  );
};

export default Votes;
