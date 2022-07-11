import { useEffect } from "react";
import Image from "next/image";

import { trpc } from "@/utils/trpc";

const Home = () => {
  const utils = trpc.useContext();

  const ideas = trpc.useQuery(["idea.getIdeas"]);

  const { data, isSuccess, isLoading } = ideas;

  useEffect(() => {
    utils.refetchQueries(["idea.getIdeas"]);
  }, [utils]);

  return (
    <div className="my-2">
      <h1 className="my-2 text-xl font-bold text-center text-slate-300">
        Todd Chavez{"`"}s Crazy Ideas
      </h1>

      {/* Create a rounded loader using tailwindcss */}
      {isLoading && (
        <div className="flex items-center justify-center my-4">
          <div className="w-20 h-20 border-t-4 border-b-4 rounded-full border-slate-300 animate-spin"></div>
        </div>
      )}

      {isSuccess && (
        <div className="grid grid-cols-1 gap-4 mx-4 md:grid-cols-2 lg:grid-cols-3">
          {data.map((idea, i) => (
            <div key={i} className="max-w-sm p-2 mx-auto rounded bg-slate-300">
              <Image
                src={idea.imageUrl}
                alt={idea.title}
                width={400}
                height={300}
                className="rounded"
              />
              <h2 className="text-lg font-bold text-center">{idea.title}</h2>
              <p className="text-center">{idea.content}</p>
              <div className="flex justify-center mt-2">
                <button className="w-32 p-2 rounded bg-slate-800 text-slate-300">
                  Vote
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
