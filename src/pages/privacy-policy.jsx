import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import RootLayout from '@/components/common/layout/RootLayout';

export default function PrivacyPolicy() {

  return (
    <>
      <Head>
        <title>Privacy Policy - Influitive Zone</title>
        <meta name="description" content="Privacy Policy for Influitive Zone - Learn how we collect, use, and protect your personal information." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <RootLayout defaultMode="dark">
        <div className="privacy-policy-page">
        {/* Header */}
        <header className="privacy-header">
          <div className="container">
            <div className="privacy-header-content">
              <h1>Privacy Policy</h1>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="privacy-content">
          <div className="container">
            <div className="privacy-wrapper">
              {/* Introduction */}
              <div className="privacy-intro">
                <p>
                  Influitive Zone is a digital marketing and technology company (&quot;Influitive Zone&quot;). 
                  Influitive Zone is a company with its registered office in the United States.
                </p>
                <p>
                  Influitive Zone is committed to ensuring that all personal data we hold is processed in 
                  accordance with data protection law and that good data protection practice is embedded in 
                  the culture of our staff and organisation.
                </p>
                <p>
                  Influitive Zone processes the personal data of individuals visiting our website and other 
                  web pages we operate on social media.
                </p>
                <p>
                  This notice sets out how we process data and the rights data subjects have in respect of 
                  their personal data.
                </p>
              </div>

              {/* Contact Details */}
              <h2>#Contact details</h2>
              <p>
                We have appointed a Data Protection Manager who may be contacted by you in relation to 
                queries regarding your personal data:
              </p>
              <p className="contact-details">
                a: Influitive Zone, United States e: info@influitivezone.com
              </p>

              {/* Section 1 */}
              <h3>#1. What personal data we collect and why</h3>
              <p>
                If you provide us with your name and other details through our contact pages, we will use 
                them to respond to your request for information. We will store them for a period one year 
                in case you contact us again, after which time we will securely delete your data from our 
                systems.
              </p>
              <p>
                We will also collect information through our analytics Cookies but this is not personal data 
                as it cannot be used to identify you. For more information see our Cookie Notice.
              </p>

              {/* Section 2 */}
              <h3>#2. Who has access to your data</h3>
              <p>
                Your information may be shared within Influitive Zone as appropriate to the services which 
                you have enquired about.
              </p>
              <p>
                Influitive Zone also shares your data with third parties who provide services to us such as 
                IT service providers. Where we use such providers, we have appropriate contractual arrangements 
                in place to ensure the security and confidentiality of your data.
              </p>
              <p>
                Influitive Zone may also share your data with third parties in the context of a sale of some 
                or all of its business. In those circumstances the data will be subject to confidentiality 
                arrangements.
              </p>

              {/* Section 3 */}
              <h3>#3. How Influitive Zone protects your data</h3>
              <p>
                Influitive Zone implements appropriate security measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction. We follow industry best 
                practices and maintain strict security protocols to safeguard your data.
              </p>
              <p>
                We use secure servers, encryption technologies, and access controls to ensure that your 
                personal data is protected at all times.
              </p>

              {/* Section 4 */}
              <h3>#4. Your rights</h3>
              <p>
                As a data subject, you have a number of rights. These include the right to:
              </p>
              <ul>
                <li>access and obtain a copy of your data on request</li>
                <li>require Influitive Zone to change incorrect or incomplete data</li>
                <li>require Influitive Zone to delete or stop processing your data, in certain circumstances</li>
                <li>object to the processing of your data where Influitive Zone is relying on its legitimate interests as the legal ground for processing; and</li>
                <li>the right to object to your data being used to send marketing information to you.</li>
              </ul>
              <p>
                If you have any concerns about how your personal data is being processed and would like to 
                exercise any of these rights, get in touch using the contact details above. If you believe 
                that Influitive Zone has not complied with your data protection rights, you can complain to 
                the relevant data protection authority in your jurisdiction.
              </p>
            </div>
          </div>
        </main>

        {/* Footer CTA */}
        <section className="privacy-cta">
          <div className="container">
            <div className="cta-content">
              <h3>Questions About Our Privacy Policy?</h3>
              <p>We&apos;re here to help clarify any concerns you may have.</p>
              <Link href="/contact" className="btn btn-primary">
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        </div>
      </RootLayout>

      <style jsx>{`
        .privacy-policy-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #000B25 0%, #1a2a4a 50%, #2d3f5c 100%);
          color: white;
          cursor: default !important;
          padding-top: 120px;
        }

        /* Hide footer on privacy policy page */
        :global(#smooth-content > footer),
        :global(.footer__area),
        :global(.footer__area-3) {
          display: none !important;
        }

        .privacy-policy-page * {
          cursor: default !important;
        }

        .privacy-policy-page a {
          cursor: pointer !important;
        }

        .privacy-policy-page button {
          cursor: pointer !important;
        }

        .privacy-header {
          background: rgba(0, 0, 0, 0.3);
          padding: 60px 0;
          text-align: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .privacy-header-content h1 {
          font-size: 48px;
          font-weight: 600;
          margin: 0;
          color: white;
        }

        .privacy-content {
          padding: 80px 0;
        }

        .privacy-wrapper {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .privacy-intro {
          margin-bottom: 40px;
        }

        .privacy-intro p {
          font-size: 16px;
          line-height: 1.8;
          margin-bottom: 15px;
          color: #e0e0e0;
        }

        .privacy-wrapper h2 {
          font-size: 28px;
          font-weight: 600;
          margin: 50px 0 20px 0;
          color: #89C3E5;
          line-height: 1.4;
        }

        .privacy-wrapper h3 {
          font-size: 24px;
          font-weight: 600;
          margin: 40px 0 20px 0;
          color: #89C3E5;
          line-height: 1.4;
        }

        .privacy-wrapper p {
          font-size: 16px;
          line-height: 1.8;
          margin-bottom: 15px;
          color: #e0e0e0;
        }

        .privacy-wrapper ul {
          margin: 15px 0 15px 20px;
          padding-left: 0;
        }

        .privacy-wrapper li {
          font-size: 16px;
          line-height: 1.8;
          margin-bottom: 10px;
          color: #e0e0e0;
          list-style-type: disc;
        }

        .contact-details {
          margin: 15px 0 30px 0;
          font-size: 16px;
          color: #e0e0e0;
        }

        .privacy-cta {
          background: rgba(0, 0, 0, 0.4);
          padding: 60px 0;
          text-align: center;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .cta-content h3 {
          font-size: 32px;
          font-weight: 600;
          margin-bottom: 15px;
          color: white;
        }

        .cta-content p {
          font-size: 18px;
          margin-bottom: 30px;
          color: #e0e0e0;
        }

        .btn {
          display: inline-block;
          background: linear-gradient(45deg, #335B97, #142640);
          color: white;
          padding: 16px 32px;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          font-size: 16px;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          border: 2px solid transparent;
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(51, 91, 151, 0.4);
        }

        @media (max-width: 768px) {
          .privacy-header-content h1 {
            font-size: 36px;
          }
          
          .privacy-wrapper h2 {
            font-size: 24px;
          }

          .privacy-wrapper h3 {
            font-size: 20px;
          }

          .privacy-wrapper {
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
}
