import React from "react";
import Head from "next/head";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useForm, SubmitHandler } from "react-hook-form";

import Spinner from "./spinner";
import VoteIdeaForm from "./voteIdeaForm.tsx";

interface Idea {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
}

interface Ideas {
  ideas: Idea[];
}

interface VoteIdeaInputs {
  id: string;
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

const VOTE_IDEA = gql`
  mutation VoteIdea($ideaId: String!) {
    voteIdea(ideaId: $ideaId) {
      ideaId
      id
    }
  }
`;

const Idea = () => {
  const { loading, error, data } = useQuery<Ideas>(IDEAS);

  const [
    voteIdea,
    { data: dataMutation, loading: loadingMutation, error: errorMutation },
  ] = useMutation(VOTE_IDEA);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VoteIdeaInputs>();

  const onSubmit: SubmitHandler<VoteIdeaInputs> = (data) => {
    console.log(data);
  };

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
      </Head>

      {data && (
        <div className="m-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {data.ideas.map((idea, index) => (
            <ul
              key={index}
              className="grid grid-columns-1 rounded bg-slate-700 h-full"
            >
              <li className="pt-2 text-xl font-bold text-center">
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
              <VoteIdeaForm id={idea.id} />
            </ul>
          ))}
        </div>
      )}
    </div>
  );
};

export default Idea;
