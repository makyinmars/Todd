import React from "react";
import { gql } from "@apollo/client";

import { client } from "../lib/apollo";
import ClientOnly from "../components/clientOnly";
import Votes from "../components/votes";

const ResultsPage = () => {
  return (
    <>
      <ClientOnly>
        <Votes />
      </ClientOnly>
    </>
  );
};

export default ResultsPage;

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query Votes {
        votes {
          ideaId
        }
      }
    `,
  });

  return {
    props: {
      votes: data.votes,
    },
  };
}
