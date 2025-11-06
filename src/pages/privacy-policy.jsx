import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import SiteLogo from '../../public/assets/imgs/logo/site-logo-white-2.png';
import LottieCursor from '../components/common/LottieCursor';
import CursorAnimation from '../components/common/CursorAnimation';

export default function PrivacyPolicy() {
  const cursor1Ref = useRef();
  const cursor2Ref = useRef();

  return (
    <>
      <Head>
        <title>Privacy Policy - Influitive Zone</title>
        <meta name="description" content="Privacy Policy for Influitive Zone - Learn how we collect, use, and protect your personal information." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

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
              <section className="privacy-section">
                <h2>1. Information We Collect</h2>
                <p>
                  We collect information you provide directly to us, such as when you create an account, 
                  make a purchase, contact us, or use our services. This may include:
                </p>
                <ul>
                  <li>Name and contact information (email address, phone number, mailing address)</li>
                  <li>Account credentials (username and password)</li>
                  <li>Payment information (credit card details, billing address)</li>
                  <li>Communication preferences</li>
                  <li>Any other information you choose to provide</li>
                </ul>
              </section>

              <section className="privacy-section">
                <h2>2. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul>
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send technical notices, updates, and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Communicate with you about products, services, and events</li>
                  <li>Monitor and analyze trends and usage</li>
                  <li>Personalize and improve your experience</li>
                </ul>
              </section>

              <section className="privacy-section">
                <h2>3. Information Sharing and Disclosure</h2>
                <p>
                  We do not sell, trade, or otherwise transfer your personal information to third parties 
                  without your consent, except in the following circumstances:
                </p>
                <ul>
                  <li>With service providers who assist us in operating our website and conducting our business</li>
                  <li>When required by law or to protect our rights</li>
                  <li>In connection with a merger, acquisition, or sale of assets</li>
                  <li>With your explicit consent</li>
                </ul>
              </section>

              <section className="privacy-section">
                <h2>4. Data Security</h2>
                <p>
                  We implement appropriate security measures to protect your personal information against 
                  unauthorized access, alteration, disclosure, or destruction. However, no method of 
                  transmission over the internet or electronic storage is 100% secure.
                </p>
              </section>

              <section className="privacy-section">
                <h2>5. Cookies and Tracking Technologies</h2>
                <p>
                  We use cookies and similar tracking technologies to collect and use personal information 
                  about you. You can control cookies through your browser settings, but disabling cookies 
                  may affect the functionality of our services.
                </p>
              </section>

              <section className="privacy-section">
                <h2>6. Your Rights and Choices</h2>
                <p>You have the right to:</p>
                <ul>
                  <li>Access and update your personal information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt-out of certain communications</li>
                  <li>Request a copy of your data</li>
                  <li>Withdraw consent where applicable</li>
                </ul>
              </section>

              <section className="privacy-section">
                <h2>7. Third-Party Links</h2>
                <p>
                  Our website may contain links to third-party websites. We are not responsible for the 
                  privacy practices or content of these external sites. We encourage you to review their 
                  privacy policies.
                </p>
              </section>

              <section className="privacy-section">
                <h2>8. Children&apos;s Privacy</h2>
                <p>
                  Our services are not intended for children under 13 years of age. We do not knowingly 
                  collect personal information from children under 13. If you are a parent or guardian 
                  and believe your child has provided us with personal information, please contact us.
                </p>
              </section>

              <section className="privacy-section">
                <h2>9. Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes 
                  by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
                </p>
              </section>

              <section className="privacy-section">
                <h2>10. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <div className="contact-info">
                  <p><strong>Email:</strong> info@influitivezone.com</p>
                  <p><strong>Phone:</strong> +1 856-252-0922</p>
                  <p><strong>Address:</strong> Influitive Zone, USA</p>
                </div>
              </section>
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

        {/* Custom Cursor with Circle and Robot */}
        <CursorAnimation cursor1={cursor1Ref} cursor2={cursor2Ref} />
      </div>

      <style jsx>{`
        .privacy-policy-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #000B25 0%, #1a2a4a 50%, #2d3f5c 100%);
          color: white;
          cursor: default !important;
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
          max-width: 800px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .privacy-section {
          margin-bottom: 50px;
          padding: 30px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .privacy-section h2 {
          font-size: 28px;
          font-weight: 600;
          margin-bottom: 20px;
          color: #89C3E5;
        }

        .privacy-section p {
          font-size: 16px;
          line-height: 1.7;
          margin-bottom: 15px;
          color: #e0e0e0;
        }

        .privacy-section ul {
          margin: 15px 0;
          padding-left: 25px;
        }

        .privacy-section li {
          font-size: 16px;
          line-height: 1.7;
          margin-bottom: 8px;
          color: #e0e0e0;
        }

        .contact-info {
          background: rgba(137, 195, 229, 0.1);
          padding: 20px;
          border-radius: 8px;
          margin-top: 20px;
        }

        .contact-info p {
          margin-bottom: 10px;
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

        .privacy-logo {
          cursor: pointer;
          display: inline-block;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(51, 91, 151, 0.4);
        }

        @media (max-width: 768px) {
          .privacy-header-content h1 {
            font-size: 36px;
          }
          
          .privacy-section {
            padding: 20px;
          }
          
          .privacy-section h2 {
            font-size: 24px;
          }
        }
      `}</style>
    </>
  );
}
