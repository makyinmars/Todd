import React from "react";
import { gql, useQuery } from "@apollo/client";
import Head from "next/head";
import Image from "next/image";

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
      <div className="flex flex-col sm:w-4/5 justify-center items-center mx-2 sm:mx-auto">
        {data &&
          data.votes.map((vote, index) => (
            <ul
              key={index}
              className="bg-slate-600 flex w-full my-2 justify-between items-center p-2 rounded border-4 border-double border-slate-500"
            >
              <li>
                <Image
                  src={vote.idea.imageUrl}
                  alt={vote.idea.title}
                  width={180}
                  height={150}
                  layout="fixed"
                />
              </li>
              <li className="font-bold text-lg text-center">
                {vote.idea.title}
              </li>
              <li className="font-bold text-lg">10%</li>
            </ul>
          ))}
      </div>
    </>
  );
};

export default Votes;
