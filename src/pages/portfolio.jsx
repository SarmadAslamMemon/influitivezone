import Head from "next/head";
import RootLayout from "@/components/common/layout/RootLayout";
import PortfolioDetails from "@/components/portfolio/PortfolioDetails";
import DigitalAgencyCTA from "@/components/cta/DigitalAgencyCTA";

const PortfolioDark = () => {
  return (
    <>
      <Head>
        <title>Portfolio</title>
        <meta name="description" content="Portfolio Dark Description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <RootLayout defaultMode="dark">
          <PortfolioDetails />
          <DigitalAgencyCTA />
        </RootLayout>
      </main>
    </>
  );
};

export default PortfolioDark;
