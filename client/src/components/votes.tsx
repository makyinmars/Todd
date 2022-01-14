import React from "react";
import { gql, useQuery } from "@apollo/client";

import Spinner from "../components/spinner";
import { Idea } from "./idea";

interface Vote {
  ideaId: string;
  idea: Idea[];
}

interface Votes {
  votes: Vote[];
}

const VOTES = gql`
  query Votes {
    votes {
      ideaId
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
      <h1 className="text-center font-bold text-2xl">Results</h1>
      <div className="flex flex-col md:w-4/5">
        {data &&
          data.votes.map((vote, index) => (
            <ul key={index}>
              <li>{vote.ideaId}</li>
            </ul>
          ))}
      </div>
    </>
  );
};

export default Votes;
