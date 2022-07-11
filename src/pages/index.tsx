import Image from "next/image";
import { useRouter } from "next/router";

import { trpc } from "@/utils/trpc";

const Home = () => {
  const router = useRouter();
  const ideas = trpc.useQuery(["idea.getIdeas"]);
  const ideasByVotes = trpc.useQuery(["idea.getIdeasByVotes"]);

  const increaseVote = trpc.useMutation(["idea.updateVote"], {
    onSuccess: () => {
      ideasByVotes.refetch();
    },
  });

  const { data, isSuccess, isLoading } = ideas;

  const onClick = async (id: string) => {
    try {
      const data = await increaseVote.mutateAsync({ id });
      if (data) {
        router.push("/results");
      }
    } catch {}
  };

  return (
    <div className="my-2">
      {isLoading && (
        <div className="flex items-center justify-center my-4">
          <div className="w-20 h-20 border-t-4 border-b-4 rounded-full border-slate-300 animate-spin"></div>
        </div>
      )}

      {isSuccess && data && (
        <div className="grid grid-cols-1 gap-4 mx-4 my-4">
          {data.map((idea, i) => (
            <div
              key={i}
              className="grid max-w-xl grid-cols-1 p-2 mx-auto rounded md:grid-cols-2 md:max-w-5xl bg-slate-300"
            >
              <Image
                src={idea.imageUrl}
                alt={idea.title}
                width={400}
                height={300}
                className="rounded"
              />
              <div className="place-self-center">
                <h2 className="text-lg font-bold text-center md:mb-4 md:text-2xl">
                  {idea.title}
                </h2>
                <p className="mx-4 text-center md:mb-4 md:text-lg">
                  {idea.content}
                </p>
                <div className="flex justify-center mt-2 md:mt-4 md:text-lg">
                  <button
                    className="w-32 p-2 rounded bg-slate-800 text-slate-300"
                    onClick={() => onClick(idea.id)}
                  >
                    Vote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
