import type { NextPage } from "next";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

  return (
    <div>
      <h1 className="text-center">Todd Chavez's Crazy Ideas!!</h1>
    </div>
  );
};

export default Home;
