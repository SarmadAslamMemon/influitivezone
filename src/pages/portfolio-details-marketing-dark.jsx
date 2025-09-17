import Head from "next/head";
import RootLayout from "@/components/common/layout/RootLayout";
import PortfolioDetailsMarketing from "@/components/portfolio/PortfolioDetailsMarketing";

const PortfolioDetailsMarketingDark = () => {
  return (
    <>
      <Head>
        <title>Digital Marketing Portfolio - Influitive Zone</title>
        <meta name="description" content="View our digital marketing portfolio showcasing successful campaigns, SEO strategies, and data-driven marketing solutions." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <RootLayout defaultMode="dark">
          <PortfolioDetailsMarketing />
        </RootLayout>
      </main>
    </>
  );
};

export default PortfolioDetailsMarketingDark;