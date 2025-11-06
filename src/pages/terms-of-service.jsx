import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import SiteLogo from '../../public/assets/imgs/logo/site-logo-white-2.png';
import LottieCursor from '../components/common/LottieCursor';
import CursorAnimation from '../components/common/CursorAnimation';

export default function TermsOfService() {
  const cursor1Ref = useRef();
  const cursor2Ref = useRef();

  return (
    <>
      <Head>
        <title>Terms of Service - Influitive Zone</title>
        <meta name="description" content="Terms of Service for Influitive Zone - Read our terms and conditions for using our services." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="terms-page">
        {/* Header */}
        <header className="terms-header">
          <div className="container">
            <div className="terms-header-content">
              <h1>Terms of Service</h1>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="terms-content">
          <div className="container">
            <div className="terms-wrapper">
              <section className="terms-section">
                <h2>1. Acceptance of Terms</h2>
                <p>
                  By accessing and using the Influitive Zone website and services, you accept and agree 
                  to be bound by the terms and provision of this agreement. If you do not agree to abide 
                  by the above, please do not use this service.
                </p>
              </section>

              <section className="terms-section">
                <h2>2. Description of Service</h2>
                <p>
                  Influitive Zone provides digital marketing, web development, and business consulting 
                  services. We offer various packages and services designed to help businesses grow and 
                  succeed in the digital landscape.
                </p>
                <p>Our services include but are not limited to:</p>
                <ul>
                  <li>Digital marketing strategy and implementation</li>
                  <li>Website design and development</li>
                  <li>Search engine optimization (SEO)</li>
                  <li>Social media management</li>
                  <li>Content creation and marketing</li>
                  <li>Business consulting and strategy</li>
                </ul>
              </section>

              <section className="terms-section">
                <h2>3. User Accounts</h2>
                <p>
                  When you create an account with us, you must provide information that is accurate, 
                  complete, and current at all times. You are responsible for safeguarding the password 
                  and for all activities that occur under your account.
                </p>
                <p>
                  You agree not to disclose your password to any third party. You must notify us 
                  immediately upon becoming aware of any breach of security or unauthorized use of 
                  your account.
                </p>
              </section>

              <section className="terms-section">
                <h2>4. Payment Terms</h2>
                <p>
                  Payment for services is due as specified in your service agreement. We accept various 
                  payment methods including credit cards, bank transfers, and other approved methods.
                </p>
                <ul>
                  <li>All prices are in USD unless otherwise specified</li>
                  <li>Payment is due before service delivery unless otherwise agreed</li>
                  <li>Refunds are subject to our refund policy</li>
                  <li>Late payments may result in service suspension</li>
                </ul>
              </section>

              <section className="terms-section">
                <h2>5. Intellectual Property Rights</h2>
                <p>
                  The service and its original content, features, and functionality are and will remain 
                  the exclusive property of Influitive Zone and its licensors. The service is protected 
                  by copyright, trademark, and other laws.
                </p>
                <p>
                  You may not reproduce, distribute, modify, create derivative works of, publicly display, 
                  publicly perform, republish, download, store, or transmit any of our material without 
                  our prior written consent.
                </p>
              </section>

              <section className="terms-section">
                <h2>6. Prohibited Uses</h2>
                <p>You may not use our service:</p>
                <ul>
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                  <li>To upload or transmit viruses or any other type of malicious code</li>
                </ul>
              </section>

              <section className="terms-section">
                <h2>7. Service Availability</h2>
                <p>
                  We strive to provide continuous service availability, but we do not guarantee that our 
                  service will be available at all times. We may experience hardware, software, or other 
                  problems or need to perform maintenance related to our service.
                </p>
              </section>

              <section className="terms-section">
                <h2>8. Limitation of Liability</h2>
                <p>
                  In no event shall Influitive Zone, nor its directors, employees, partners, agents, 
                  suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, 
                  or punitive damages, including without limitation, loss of profits, data, use, goodwill, 
                  or other intangible losses, resulting from your use of the service.
                </p>
              </section>

              <section className="terms-section">
                <h2>9. Indemnification</h2>
                <p>
                  You agree to defend, indemnify, and hold harmless Influitive Zone and its licensee 
                  and licensors, and their employees, contractors, agents, officers and directors, from 
                  and against any and all claims, damages, obligations, losses, liabilities, costs or 
                  debt, and expenses (including attorney&apos;s fees).
                </p>
              </section>

              <section className="terms-section">
                <h2>10. Termination</h2>
                <p>
                  We may terminate or suspend your account and bar access to the service immediately, 
                  without prior notice or liability, under our sole discretion, for any reason whatsoever 
                  and without limitation, including but not limited to a breach of the Terms.
                </p>
              </section>

              <section className="terms-section">
                <h2>11. Governing Law</h2>
                <p>
                  These Terms shall be interpreted and governed by the laws of the United States, 
                  without regard to its conflict of law provisions. Our failure to enforce any right 
                  or provision of these Terms will not be considered a waiver of those rights.
                </p>
              </section>

              <section className="terms-section">
                <h2>12. Changes to Terms</h2>
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at 
                  any time. If a revision is material, we will provide at least 30 days notice prior 
                  to any new terms taking effect.
                </p>
              </section>

              <section className="terms-section">
                <h2>13. Contact Information</h2>
                <p>
                  If you have any questions about these Terms of Service, please contact us:
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
        <section className="terms-cta">
          <div className="container">
            <div className="cta-content">
              <h3>Questions About Our Terms?</h3>
              <p>We&apos;re here to help clarify any questions you may have.</p>
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
        .terms-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #000B25 0%, #1a2a4a 50%, #2d3f5c 100%);
          color: white;
          cursor: default !important;
        }

        .terms-page * {
          cursor: default !important;
        }

        .terms-page a {
          cursor: pointer !important;
        }

        .terms-page button {
          cursor: pointer !important;
        }

        .terms-header {
          background: rgba(0, 0, 0, 0.3);
          padding: 60px 0;
          text-align: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .terms-header-content h1 {
          font-size: 48px;
          font-weight: 600;
          margin: 0;
          color: white;
        }

        .terms-content {
          padding: 80px 0;
        }

        .terms-wrapper {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .terms-section {
          margin-bottom: 50px;
          padding: 30px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .terms-section h2 {
          font-size: 28px;
          font-weight: 600;
          margin-bottom: 20px;
          color: #89C3E5;
        }

        .terms-section p {
          font-size: 16px;
          line-height: 1.7;
          margin-bottom: 15px;
          color: #e0e0e0;
        }

        .terms-section ul {
          margin: 15px 0;
          padding-left: 25px;
        }

        .terms-section li {
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

        .terms-cta {
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

        .terms-logo {
          cursor: pointer;
          display: inline-block;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(51, 91, 151, 0.4);
        }

        @media (max-width: 768px) {
          .terms-header-content h1 {
            font-size: 36px;
          }
          
          .terms-section {
            padding: 20px;
          }
          
          .terms-section h2 {
            font-size: 24px;
          }
        }
      `}</style>
    </>
  );
}
