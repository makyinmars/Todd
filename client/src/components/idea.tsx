import React from "react";
import { gql, useQuery } from "@apollo/client";

interface Idea {
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
      title
      content
      imageUrl
    }
  }
`;

const Idea = () => {
  const { loading, error, data } = useQuery<Ideas>(IDEAS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {data && (
        <div className="m-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {data.ideas.map((idea, index) => (
            <ul
              key={index}
              className="grid grid-columns-1 rounded bg-neutral-300 h-full"
            >
              <li className="pt-2 text-lg font-bold text-center">
                {idea.title}
              </li>
              <li className="p-2">{idea.content}</li>
              <li className="flex justify-center">
                <img
                  className="h-48 py-2 w-80"
                  src={idea.imageUrl}
                  alt={idea.title}
                />
              </li>
              <div className="flex flex-col items-center justify-center py-2">
                <button className="w-40 bg-red-100 border font-bold text-lg">
                  Vote
                </button>
              </div>
            </ul>
          ))}
        </div>
      )}
    </div>
  );
};

export default Idea;
