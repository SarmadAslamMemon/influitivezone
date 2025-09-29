import Head from "next/head";
import RootLayout from "@/components/common/layout/RootLayout";
import PortfolioDetailsWebsite from "@/components/portfolio/PortfolioDetailsWebsite";
import DigitalAgencyCTA from "@/components/cta/DigitalAgencyCTA";

const PortfolioDetailsWebsiteDark = () => {
  return (
    <>
      <Head>
        <title>Website Development Portfolio - Influitive Zone</title>
        <meta name="description" content="Discover our website development portfolio featuring custom web solutions, e-commerce platforms, and modern responsive websites." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <RootLayout defaultMode="dark">
          <PortfolioDetailsWebsite />
          <DigitalAgencyCTA />
        </RootLayout>
      </main>
    </>
  );
};

export default PortfolioDetailsWebsiteDark;