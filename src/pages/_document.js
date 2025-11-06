import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Character Encoding */}
        <meta charSet="UTF-8" />
        
        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        
        {/* Primary Meta Tags */}
        <meta name="title" content="Influitive Zone - Leading Digital Marketing Agency & IT Solutions" />
        <meta name="description" content="Influitive Zone is a leading digital marketing agency specializing in SEO, social media marketing, web development, mobile app development, and comprehensive online solutions. We help businesses achieve growth, connect with audiences globally, and elevate their digital presence with world-class services." />
        <meta name="keywords" content="digital marketing, branding, digital engagement, social media marketing, content marketing, brand strategy, online marketing, digital agency, marketing solutions, brand development" />
        <meta name="author" content="InfluitiveZone" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="theme-color" content="#3a6391" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://influitivezone.com/" />
        
        {/* Favicon and Icons */}
        <link rel="icon" type="image/png" href="/assets/imgs/logo/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/imgs/logo/favicon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/imgs/logo/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/imgs/logo/favicon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://influitivezone.com/" />
        <meta property="og:title" content="Influitive Zone - Leading Digital Marketing Agency & IT Solutions" />
        <meta property="og:description" content="Influitive Zone is a leading digital marketing agency specializing in SEO, social media marketing, web development, mobile app development, and comprehensive online solutions. We help businesses achieve growth, connect with audiences globally, and elevate their digital presence with world-class services." />
        <meta property="og:image" content="https://influitivezone.com/assets/imgs/logo/site-logo-white-2.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="InfluitiveZone - Digital Marketing & Branding Solutions" />
        <meta property="og:site_name" content="InfluitiveZone" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://influitivezone.com/" />
        <meta name="twitter:title" content="Influitive Zone - Leading Digital Marketing Agency & IT Solutions" />
        <meta name="twitter:description" content="Influitive Zone is a leading digital marketing agency specializing in SEO, social media marketing, web development, mobile app development, and comprehensive online solutions. We help businesses achieve growth and connect with audiences globally." />
        <meta name="twitter:image" content="https://influitivezone.com/assets/imgs/logo/site-logo-white-2.png" />
        <meta name="twitter:image:alt" content="InfluitiveZone - Digital Marketing & Branding Solutions" />
        <meta name="twitter:creator" content="@influitivezone" />
        <meta name="twitter:site" content="@influitivezone" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="format-detection" content="telephone=yes" />
        
        {/* Structured Data (JSON-LD) for Better Search Results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Influitive Zone",
              "alternateName": "InfluitiveZone",
              "url": "https://influitivezone.com",
              "logo": "https://influitivezone.com/assets/imgs/logo/site-logo-white-2.png",
              "description": "Leading digital marketing agency specializing in SEO, social media marketing, web development, mobile app development, and comprehensive online solutions.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-856-252-0922",
                "contactType": "Customer Service",
                "email": "info@influitivezone.com",
                "availableLanguage": "English"
              },
              "sameAs": [
                "https://www.linkedin.com/company/influitive-zone"
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "100"
              },
              "areaServed": "Worldwide",
              "knowsAbout": [
                "Digital Marketing",
                "SEO",
                "Social Media Marketing",
                "Web Development",
                "Mobile App Development",
                "Branding",
                "Digital Strategy"
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Influitive Zone",
              "url": "https://influitivezone.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://influitivezone.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "serviceType": "Digital Marketing Agency",
              "provider": {
                "@type": "Organization",
                "name": "Influitive Zone"
              },
              "areaServed": "Worldwide",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Digital Marketing Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Web Development",
                      "description": "We craft high-performing websites using modern technologies like React, Next.js, and Node.js."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Mobile App Development",
                      "description": "Native and cross-platform mobile app development for iOS and Android."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Digital Marketing",
                      "description": "Comprehensive digital marketing services including SEO, social media marketing, PPC advertising, and content marketing."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Branding & Design",
                      "description": "Complete branding solutions including logo design, brand identity, and visual design services."
                    }
                  }
                ]
              }
            })
          }}
        />
        
        {/* Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
