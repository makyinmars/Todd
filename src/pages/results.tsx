import { trpc } from "@/utils/trpc";

const Results = () => {
  const ideas = trpc.useQuery(["idea.getIdeasByVotes"]);
  const { data, isSuccess, isLoading } = ideas;
  console.log(data);
  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-slate-100">
        Results
      </h1>
    </div>
  );
};

export default Results;
