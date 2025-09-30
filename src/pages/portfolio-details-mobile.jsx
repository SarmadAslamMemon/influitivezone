import Head from "next/head";
import RootLayout from "@/components/common/layout/RootLayout";
import PortfolioDetailsWebMobile from "@/components/portfolio/PortfolioDetailsWebMobile";
import DigitalAgencyCTA from "@/components/cta/DigitalAgencyCTA";

const PortfolioDetailsMobileDark = () => {
  return (
    <>
      <Head>
        <title>Mobile Development Portfolio - Influitive Zone</title>
        <meta name="description" content="Discover our web and mobile development portfolio featuring modern applications, responsive websites, and cutting-edge solutions." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <RootLayout defaultMode="dark">
          <PortfolioDetailsWebMobile />
          <DigitalAgencyCTA />
        </RootLayout>
      </main>
    </>
  );
};

export default PortfolioDetailsMobileDark;
