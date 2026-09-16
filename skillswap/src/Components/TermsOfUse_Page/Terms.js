import React from "react";
import Nav from "../NavFooter/nav";
import Footer from "../NavFooter/footer";
import "./style.css";

function Terms() {
  return (
    <div>
      <Nav />
      <main className="terms-main">
        <div className="terms-header">
          <h1>Terms of Use</h1>
          <p className="tagline">Please read these terms carefully before using SkillSwap.</p>
        </div>

        <div className="terms-content">
          <h2>1. Introduction</h2>
          <p>
            Welcome to SkillSwap. By accessing or using our platform, you agree to
            be bound by these Terms of Use and our Privacy Policy. If you do not
            agree to these terms, please do not use our services.
          </p>

          <h2>2. User Accounts</h2>
          <p>When you create an account with us, you must provide accurate, complete, and current information at all times. Failure to do so constitutes a breach of the terms, which may result in immediate termination of your account.</p>
          <ul>
            <li>You are responsible for safeguarding your password.</li>
            <li>You agree not to disclose your password to any third party.</li>
            <li>You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</li>
          </ul>

          <h2>3. Intellectual Property</h2>
          <p>
            The platform and its original content, features, and functionality are
            and will remain the exclusive property of SkillSwap and its licensors.
            The platform is protected by copyright, trademark, and other laws of
            both the country and foreign countries.
          </p>

          <h2>4. User Conduct</h2>
          <p>By using the platform, you agree not to:</p>
          <ul>
            <li>Post or transmit any unlawful, threatening, libelous, defamatory, obscene, scandalous, inflammatory, pornographic, or profane material.</li>
            <li>Use the platform in any manner that could disable, overburden, damage, or impair the site or interfere with any other party's use of the platform.</li>
            <li>Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the platform, the server on which the platform is stored, or any server, computer, or database connected to the platform.</li>
          </ul>

          <h2>5. Termination</h2>
          <p>
            We may terminate or suspend access to our platform immediately, without
            prior notice or liability, for any reason whatsoever, including without
            limitation if you breach the Terms. All provisions of the Terms which
            by their nature should survive termination shall survive termination,
            including, without limitation, ownership provisions, warranty
            disclaimers, indemnity, and limitations of liability.
          </p>

          <h2>6. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these
            Terms at any time. By continuing to access or use our platform after
            those revisions become effective, you agree to be bound by the revised
            terms. If you do not agree to the new terms, please stop using the
            platform.
          </p>

          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at{" "}
            <a href="mailto:support@skillswap.com">support@skillswap.com</a>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Terms;
