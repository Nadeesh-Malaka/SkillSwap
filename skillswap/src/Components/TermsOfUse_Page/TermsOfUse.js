import React from "react";
import "./style.css";
import Nav from "../NavFooter/nav";
import Footer from "../NavFooter/footer";

function TermsOfUse() {
  return (
    <div>
      <Nav />

      <main className="terms-main">
        <div className="terms-header">
          <h1>Terms of Use</h1>
          <p className="tagline">Last Updated: January 13, 2025</p>
        </div>

        <section className="terms-content">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the SkillSwap platform, you agree to comply with and be bound by these Terms of Use. If you do not agree with any part of these terms, you must not use our services.
          </p>

          <h2>2. Eligibility</h2>
          <p>
            To use our platform, you must be at least 18 years old or have the consent of a legal guardian. You are solely responsible for the accuracy of the information you provide during registration.
          </p>

          <h2>3. User Responsibilities</h2>
          <p>
            You agree to use the platform for lawful purposes only. Prohibited activities include, but are not limited to:
          </p>
          <ul>
            <li>Harassing, abusing, or harming others.</li>
            <li>Posting or sharing inappropriate or illegal content.</li>
            <li>Engaging in fraudulent activities.</li>
          </ul>

          <h2>4. Intellectual Property</h2>
          <p>
            All content on SkillSwap, including but not limited to text, graphics, logos, and software, is the property of SkillSwap or its licensors. Unauthorized use of this content is prohibited.
          </p>

          <h2>5. Disclaimer of Warranties</h2>
          <p>
            The platform is provided "as is" without any warranties, express or implied. We do not guarantee that the platform will be error-free, secure, or continuously available.
          </p>

          <h2>6. Limitation of Liability</h2>
          <p>
            SkillSwap shall not be held liable for any indirect, incidental, or consequential damages arising from your use of the platform.
          </p>

          <h2>7. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your access to the platform at our sole discretion, without prior notice, for any violation of these terms.
          </p>

          <h2>8. Changes to Terms</h2>
          <p>
            We may update these terms at any time. Continued use of the platform after updates constitutes acceptance of the new terms.
          </p>

          <h2>9. Contact Us</h2>
          <p>
            If you have any questions or concerns about these Terms of Use, please contact us at{" "}
            <a href="mailto:support@skillswap.com">support@skillswap.com</a>.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default TermsOfUse;
