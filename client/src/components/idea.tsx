import React from "react";
import Head from "next/head";
import { gql, useQuery } from "@apollo/client";
import Image from "next/image";

import Spinner from "./spinner";
import VoteIdeaForm from "./voteIdeaForm";

export interface Idea {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
}

interface Ideas {
  ideas: Idea[];
}

const IDEAS = gql`
  query GetIdeas {
    ideas {
      id
      title
      content
      imageUrl
    }
  }
`;

const Idea = () => {
  const { loading, error, data } = useQuery<Ideas>(IDEAS);

  if (loading) return <Spinner />;

  if (error)
    return (
      <p className="text-center font-bold text-xl text-red-500">
        Server is currently unavailable :(
      </p>
    );

  return (
    <div>
      <Head>
        <title>Todd Chavez{`'`}s Crazy Ideas</title>

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="content"
          content="From Netflix BoJack Horseman He is known for his deep understanding of serious and 
          controversial subjects, but writers spend a considerable amount of their screen time on comedy. 
          Todd Chávez and his crazy ideas are one of the show’s greatest sources of comic relief. From 
          the ridiculous cube-shaped marbles to the hit Cabracadabra, Todd’s imagination knew no bounds."
        />
      </Head>
      {data && (
        <div className="m-2 grid grid-cols-1 gap-6 my-4 sm:w-2/3 md:w-2/3 sm:mx-auto">
          {data.ideas.map((idea, index) => (
            <ul
              key={index}
              className="grid grid-columns-1 lg:flex rounded border-4 border-slate-500 shadow-lg hover:shadow-slate-200 border-double bg-slate-700 h-full w-full"
            >
              <li className="flex justify-center m-2 h-auto">
                <Image
                  className="rounded"
                  src={idea.imageUrl}
                  alt={idea.title}
                  width={400}
                  height={350}
                />
              </li>

              <div className="flex flex-col justify-center items-center gap-3 m-2 w-full">
                <li className="pt-2 text-xl font-bold text-center self-center">
                  {idea.title}
                </li>
                <li className="w-4/5">{idea.content}</li>
                <VoteIdeaForm id={idea.id} />
              </div>
            </ul>
          ))}
        </div>
      )}
    </div>
  );
};

export default Idea;
