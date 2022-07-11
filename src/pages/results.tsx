import { trpc } from "@/utils/trpc";
import Image from "next/image";

const Results = () => {
  const ideas = trpc.useQuery(["idea.getIdeasByVotes"]);
  const { data, isSuccess, isLoading } = ideas;

  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-slate-100">
        Results
      </h1>

      {isLoading && (
        <div className="flex items-center justify-center my-4">
          <div className="w-20 h-20 border-t-4 border-b-4 rounded-full border-slate-300 animate-spin"></div>
        </div>
      )}

      {isSuccess && data && (
        <div className="grid max-w-md grid-cols-1 gap-4 mx-4 my-4 sm:mx-auto md:max-w-5xl">
          {data.map((idea, i) => (
            <div
              key={i}
              className="grid items-center grid-cols-3 rounded justify-items-center bg-slate-300"
            >
              <div className="flex items-center bg-slate-800">
                <div className="mx-1 text-lg font-bold text-slate-300 md:text-xl">
                  {i + 1}.
                </div>
                <Image
                  src={idea.imageUrl}
                  alt={idea.title}
                  width={400}
                  height={300}
                  className="rounded"
                />
              </div>
              <div className="text-lg font-bold md:text-xl">{idea.title}</div>
              <div className="flex flex-col items-center justify-center">
                <div className="text-lg font-bold md:text-xl">Votes</div>
                <div className="text-lg font-bold md:text-xl">{idea.votes}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Results;
