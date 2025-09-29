import Head from "next/head";
import RootLayout from "@/components/common/layout/RootLayout";
import PortfolioDetailsGraphic from "@/components/portfolio/PortfolioDetailsGraphic";

const PortfolioDetailsDark = () => {
  return (
    <>
      <Head>
        <title>Portfolio Details - Influitive Zone</title>
        <meta name="description" content="Explore our comprehensive portfolio showcasing our expertise in graphic design, web development, and digital marketing." />
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

export default PortfolioDetailsDark;
