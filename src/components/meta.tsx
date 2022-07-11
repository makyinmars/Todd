import Head from "next/head";

interface MetaProps {
  title: string;
  description: string;
}
const Meta = ({ title, description }: MetaProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Head>
  );
};

export default Meta;
