import React from "react";
import { gql } from "@apollo/client";
import { GetServerSideProps } from "next";

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await client.query({
    query: gql`
      query Votes {
        votes {
          ideaId
          idea {
            id
            title
            content
            imageUrl
          }
        }
      }
    `,
  });

  return {
    props: {
      votes: data.votes,
    },
  };
};
