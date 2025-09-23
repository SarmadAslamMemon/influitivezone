import Head from "next/head";
import RootLayout from "@/components/common/layout/RootLayout";
import PortfolioDetailsGraphic from "@/components/portfolio/PortfolioDetailsGraphic";

const PortfolioDetailsGraphicDark = () => {
  return (
    <>
      <Head>
        <title>Graphic Design Portfolio - Influitive Zone</title>
        <meta name="description" content="Explore our graphic design portfolio showcasing creative visual identities, brand solutions, and stunning design work." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <RootLayout defaultMode="dark">
          <PortfolioDetailsGraphic />
        </RootLayout>
      </main>
    </>
  );
};

export default PortfolioDetailsGraphicDark;