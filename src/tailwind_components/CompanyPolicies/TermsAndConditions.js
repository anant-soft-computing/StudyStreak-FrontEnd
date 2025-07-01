import React from "react";
import { Gavel } from "lucide-react";

const Section = ({ title, id, children, isLast = false }) => (
  <section
    id={id}
    className={!isLast ? "pb-8 mb-8 border-b border-neutral-200" : ""}
  >
    <h2 className="text-2xl font-bold text-neutral-800 mb-4">{title}</h2>
    <div className="space-y-4 text-neutral-600 leading-relaxed">{children}</div>
  </section>
);

const SubSectionTitle = ({ children }) => (
  <h3 className="text-lg font-semibold text-neutral-700 mt-4 mb-2">
    {children}
  </h3>
);

const InfoBox = ({ children }) => (
  <div className="mt-4 bg-neutral-50 p-4 rounded-lg border border-neutral-200 text-sm">
    {children}
  </div>
);

const StyledList = ({ items }) => (
  <ul className="list-disc list-inside space-y-2 mt-2 pl-4 text-neutral-600 marker:text-primary-600">
    {items.map((item, index) => (
      <li
        key={index}
        dangerouslySetInnerHTML={{ __html: item }}
        style={{ display: "block" }}
      ></li>
    ))}
  </ul>
);

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-neutral-50 font-sans">
      <header className="bg-gradient-to-r from-primary-600 to-primary-700 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-white/10 p-4 rounded-xl mb-4">
            <Gavel className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Terms and Conditions
          </h1>
        </div>
      </header>

      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-card p-8 md:p-12  mx-auto">
            <Section id="introduction" title="1. Introduction and Acceptance">
              <p>
                Welcome to StudyStreak.in, operated by ESPI Consultants. These
                Terms and Conditions ("Terms") govern your use of our website,
                Learning Management System (LMS), and related services. By
                accessing or using our platform, you agree to be bound by these
                Terms.
              </p>
              <InfoBox>
                <p className="text-neutral-600">
                  <strong>Company:</strong> ESPI Consultants
                </p>
                <p className="text-neutral-600">
                  <strong>Address:</strong> Sayajigunj, Vadodara, Gujarat, India
                </p>
                <p className="text-neutral-600">
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:info@studystreak.in"
                    className="text-primary-600 hover:underline"
                  >
                    info@studystreak.in
                  </a>
                </p>
                <p className="text-neutral-600">
                  <strong>Website:</strong>{" "}
                  <a
                    href="https://studystreak.in"
                    className="text-primary-600 hover:underline"
                  >
                    studystreak.in
                  </a>
                </p>
              </InfoBox>
            </Section>

            <Section id="definitions" title="2. Definitions">
              <StyledList
                items={[
                  '<strong>"Platform"</strong> refers to the StudyStreak.in website and LMS',
                  '<strong>"Services"</strong> include test preparation courses for IELTS, GRE, GMAT, TOEFL, and related educational services',
                  '<strong>"User," "you," or "your"</strong> refers to any person accessing or using our Platform',
                  '<strong>"Content"</strong> includes all materials, courses, videos, texts, assessments, and other educational resources',
                  '<strong>"Account"</strong> refers to your registered user profile on our Platform',
                ]}
              />
            </Section>

            <Section
              id="eligibility"
              title="3. Eligibility and Account Registration"
            >
              <SubSectionTitle>3.1 Eligibility Requirements</SubSectionTitle>
              <StyledList
                items={[
                  "Be at least 16 years of age",
                  "Have the legal capacity to enter into binding agreements",
                  "Provide accurate and complete registration information",
                  "Comply with all applicable laws and regulations",
                ]}
              />
              <SubSectionTitle>3.2 Account Creation</SubSectionTitle>
              <StyledList
                items={[
                  "Provide truthful, accurate, and complete information",
                  "Maintain the security of your login credentials",
                  "Notify us immediately of any unauthorized account access",
                  "Accept responsibility for all activities under your account",
                ]}
              />
              <SubSectionTitle>3.3 Account Verification</SubSectionTitle>
              <p className="text-neutral-600">
                We may require identity verification for certain services.
                Failure to provide requested verification may result in account
                suspension or termination.
              </p>
            </Section>

            <Section id="services" title="4. Services and Course Access">
              <SubSectionTitle>4.1 Educational Services</SubSectionTitle>
              <StyledList
                items={[
                  "<i>IELTS</i> (International English Language Testing System)",
                  "<i>GRE</i> (Graduate Record Examinations)",
                  "<i>GMAT</i> (Graduate Management Admission Test)",
                  "<i>TOEFL</i> (Test of English as a Foreign Language)",
                ]}
              />
              <SubSectionTitle>4.2 Course Features</SubSectionTitle>
              <StyledList
                items={[
                  "Video lectures and interactive content",
                  "Practice tests and mock examinations",
                  "Personalized study plans and progress tracking",
                  "Live classes and doubt-clearing sessions",
                  "Study materials and downloadable resources",
                  "Performance analytics and detailed feedback",
                ]}
              />
              <SubSectionTitle>4.3 Access Limitations</SubSectionTitle>
              <StyledList
                items={[
                  "Course access is granted upon successful payment and enrollment",
                  "Access duration is specified for each course package",
                  "Simultaneous logins from multiple devices may be restricted",
                  "We reserve the right to limit access to prevent abuse",
                ]}
              />
            </Section>

            <Section id="conduct" title="5. User Responsibilities and Conduct">
              <SubSectionTitle>5.1 Acceptable Use</SubSectionTitle>
              <StyledList
                items={[
                  "Use the Platform only for lawful educational purposes",
                  "Respect intellectual property rights of all content",
                  "Maintain confidentiality of your account credentials",
                  "Provide honest feedback and ratings for courses",
                ]}
              />
              <SubSectionTitle>5.2 Prohibited Activities</SubSectionTitle>
              <StyledList
                items={[
                  "Share account credentials with others",
                  "Download, copy, or distribute copyrighted content without permission",
                  "Attempt to hack, disrupt, or gain unauthorized access to our systems",
                  "Post inappropriate, offensive, or harmful content",
                  "Use automated tools to access or scrape our Platform",
                  "Engage in any activity that violates applicable laws",
                ]}
              />
              <SubSectionTitle>5.3 Academic Integrity</SubSectionTitle>
              <StyledList
                items={[
                  "You must complete assessments independently unless group work is specified",
                  "Plagiarism or cheating in any form is strictly prohibited",
                  "We reserve the right to invalidate scores or achievements obtained through dishonest means",
                ]}
              />
            </Section>

            <Section id="payments" title="6. Payment Terms and Pricing">
              <SubSectionTitle>6.1 Course Fees</SubSectionTitle>
              <StyledList
                items={[
                  "All course fees are clearly displayed during the enrollment process.",
                  "Prices are subject to change with reasonable notice.",
                  "Additional taxes may apply as per Indian tax laws.",
                  "Payment must be completed before course access is granted.",
                ]}
              />
              <SubSectionTitle>6.2 Payment Methods</SubSectionTitle>
              <p className="text-neutral-600">
                We accept Credit/Debit cards, Net banking, Digital wallets (UPI,
                Paytm, etc.), and other payment methods as available on our
                Platform.
              </p>
              <SubSectionTitle>6.3 Payment Processing</SubSectionTitle>
              <StyledList
                items={[
                  "All payments are processed securely through third-party payment gateways",
                  "You authorize us to charge your chosen payment method for enrolled courses",
                  "Failed payments may result in course access suspension",
                ]}
              />
              <SubSectionTitle>6.4 Currency and Taxes</SubSectionTitle>
              <StyledList
                items={[
                  "All prices are displayed in Indian Rupees (INR) unless otherwise specified",
                  "Applicable taxes (GST) will be added to the course fee",
                  "International students may be subject to additional charges",
                ]}
              />
            </Section>

            <Section id="ip" title="7. Intellectual Property Rights">
              <SubSectionTitle>7.1 Our Content</SubSectionTitle>
              <p className="text-neutral-600">
                All content on the Platform, including course materials, videos,
                assessments, text, graphics, logos, software, and trademarks is
                owned by ESPI Consultants or our licensors and is protected by
                intellectual property laws.
              </p>
              <SubSectionTitle>7.2 Limited License</SubSectionTitle>
              <StyledList
                items={[
                  "Access and use our educational content for personal learning purposes",
                  "Download specified materials for offline study (where permitted)",
                  "Print materials for personal educational use",
                ]}
              />
              <SubSectionTitle>7.3 Restrictions</SubSectionTitle>
              <StyledList
                items={[
                  "Modify, adapt, or create derivative works from our content",
                  "Distribute, sell, or commercially exploit our materials",
                  "Remove copyright notices or proprietary markings",
                  "Reverse engineer our software or systems",
                ]}
              />
              <SubSectionTitle>7.4 User-Generated Content</SubSectionTitle>
              <p className="text-neutral-600">
                By submitting content to our Platform (reviews, comments,
                assignments), you grant us a non-exclusive, royalty-free license
                to use, modify, and display such content for educational and
                promotional purposes.
              </p>
            </Section>

            <Section id="privacy" title="8. Privacy and Data Protection">
              <p className="text-neutral-600">
                Your privacy is important to us. Our collection, use, and
                protection of your personal information is governed by our
                Privacy Policy, which is incorporated into these Terms by
                reference.
              </p>
            </Section>

            <Section
              id="completion"
              title="9. Course Completion and Certificates"
            >
              <SubSectionTitle>9.1 Completion Requirements</SubSectionTitle>
              <StyledList
                items={[
                  "Course completion criteria are specified for each program",
                  "You must meet minimum attendance and assessment requirements",
                  "Certificates are issued only upon successful completion of all requirements",
                ]}
              />
              <SubSectionTitle>9.2 Certificate Validity</SubSectionTitle>
              <StyledList
                items={[
                  "Certificates reflect your performance on our Platform",
                  "We do not guarantee acceptance by external institutions or organizations",
                  "Certificate authenticity can be verified through our verification system",
                ]}
              />
            </Section>

            <Section
              id="availability"
              title="10. Platform Availability and Technical Support"
            >
              <SubSectionTitle>10.1 Service Availability</SubSectionTitle>
              <StyledList
                items={[
                  "We strive to maintain 99% uptime but do not guarantee uninterrupted service",
                  "Scheduled maintenance will be communicated in advance when possible",
                  "We are not liable for service interruptions due to factors beyond our control",
                ]}
              />
              <SubSectionTitle>10.2 Technical Requirements</SubSectionTitle>
              <StyledList
                items={[
                  "Maintaining compatible devices and software",
                  "Ensuring stable internet connectivity",
                  "Meeting minimum system requirements for optimal platform performance",
                ]}
              />
              <SubSectionTitle>10.3 Customer Support</SubSectionTitle>
              <StyledList
                items={[
                  "Support is available through email, chat, and phone during business hours",
                  "We aim to respond to support requests within 24-48 hours",
                  "Technical issues will be addressed based on severity and available resources",
                ]}
              />
            </Section>

            <Section id="liability" title="11. Limitation of Liability">
              <SubSectionTitle>11.1 Educational Outcomes</SubSectionTitle>
              <StyledList
                items={[
                  "We provide educational resources but do not guarantee specific test scores or results",
                  "Individual performance depends on various factors beyond our control",
                  "Our courses supplement but do not replace personal study and preparation",
                ]}
              />
              <SubSectionTitle>11.2 Liability Limitations</SubSectionTitle>
              <StyledList
                items={[
                  "Our total liability is limited to the amount you paid for the specific course",
                  "We are not liable for indirect, incidental, or consequential damages",
                  "We do not warrant that our services will meet all your requirements or expectations",
                ]}
              />
              <SubSectionTitle>11.3 Force Majeure</SubSectionTitle>
              <p className="text-neutral-600">
                We are not liable for delays or failures due to circumstances
                beyond our reasonable control, including natural disasters,
                government actions, or technical failures.
              </p>
            </Section>

            <Section id="indemnification" title="12. Indemnification">
              <p className="text-neutral-600">
                You agree to indemnify and hold harmless ESPI Consultants, its
                employees, and affiliates from any claims, damages, or expenses
                arising from:
              </p>
              <StyledList
                items={[
                  "Your violation of these Terms",
                  "Your misuse of the Platform or services",
                  "Your violation of any third-party rights",
                  "Any false or misleading information you provide",
                ]}
              />
            </Section>

            <Section id="termination" title="13. Termination">
              <SubSectionTitle>13.1 Termination by You</SubSectionTitle>
              <StyledList
                items={[
                  "You may terminate your account at any time by contacting customer support",
                  "Termination does not automatically entitle you to refunds",
                  "You remain responsible for any outstanding payments",
                ]}
              />
              <SubSectionTitle>13.2 Termination by Us</SubSectionTitle>
              <StyledList
                items={[
                  "Violate these Terms or our policies",
                  "Engage in fraudulent or abusive behavior",
                  "Fail to make required payments",
                  "Use the Platform in ways that harm our business or other users",
                ]}
              />
              <SubSectionTitle>13.3 Effect of Termination</SubSectionTitle>
              <StyledList
                items={[
                  "Your access to paid courses will be revoked",
                  "We may retain your data as required by law or our data retention policies",
                  "Outstanding payment obligations survive termination",
                ]}
              />
            </Section>

            <Section
              id="disputes"
              title="14. Dispute Resolution and Governing Law"
            >
              <SubSectionTitle>14.1 Governing Law</SubSectionTitle>
              <p className="text-neutral-600">
                These Terms are governed by the laws of India, specifically the
                laws applicable in the State of Gujarat.
              </p>
              <SubSectionTitle>14.2 Jurisdiction</SubSectionTitle>
              <p className="text-neutral-600">
                Any disputes arising from these Terms or your use of our
                services shall be subject to the exclusive jurisdiction of the
                courts in Vadodara, Gujarat, India.
              </p>
              <SubSectionTitle>14.3 Dispute Resolution Process</SubSectionTitle>
              <p className="text-neutral-600">
                Before initiating legal proceedings, we encourage you to contact
                our customer support team to resolve the issue, participate in
                good faith discussions, and consider alternative dispute
                resolution methods such as mediation.
              </p>
            </Section>

            <Section id="modifications" title="15. Modifications to Terms">
              <SubSectionTitle>15.1 Right to Modify</SubSectionTitle>
              <p className="text-neutral-600">
                We reserve the right to modify these Terms at any time. Changes
                will be effective immediately upon posting to our website.
              </p>
              <SubSectionTitle>15.2 Notification of Changes</SubSectionTitle>
              <StyledList
                items={[
                  "Material changes will be communicated via email or platform notifications",
                  "Continued use of our services after changes constitutes acceptance of new Terms",
                  "If you disagree with changes, you may terminate your account",
                ]}
              />
            </Section>

            <Section id="miscellaneous" title="16. Miscellaneous Provisions">
              <p className="text-neutral-600">
                <SubSectionTitle>16.1 Severability:</SubSectionTitle> If any
                provision of these Terms is found to be unenforceable, the
                remaining provisions will continue in full force and effect.
              </p>
              <p className="text-neutral-600">
                <SubSectionTitle>16.2 Entire Agreement:</SubSectionTitle> These
                Terms, together with our Privacy Policy and Refund Policy,
                constitute the entire agreement between you and ESPI
                Consultants.
              </p>
              <p className="text-neutral-600">
                <SubSectionTitle>16.3 No Waiver:</SubSectionTitle> Our failure
                to enforce any provision of these Terms does not constitute a
                waiver of that provision or any other provision.
              </p>
              <p className="text-neutral-600">
                <SubSectionTitle>16.4 Assignment:</SubSectionTitle> You may not
                assign your rights under these Terms without our written
                consent. We may assign our rights and obligations without
                restriction.
              </p>
            </Section>

            <Section id="contact" title="17. Contact Information" isLast={true}>
              <p>
                For questions about these Terms and Conditions, please contact
                us:
              </p>
              <InfoBox>
                <p className="text-neutral-600">
                  <strong>ESPI Consultants</strong>
                </p>
                <p className="text-neutral-600">
                  <strong>Address:</strong> Sayajigunj, Vadodara, Gujarat, India
                </p>
                <p className="text-neutral-600">
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:legal@studystreak.in"
                    className="text-primary-600 hover:underline"
                  >
                    legal@studystreak.in
                  </a>
                </p>
                <p className="text-neutral-600">
                  <strong>Phone:</strong> +91 98765 43210
                </p>
                <p className="text-neutral-600">
                  <strong>Business Hours:</strong> Monday - Saturday, 10:00 AM -
                  7:00 PM IST
                </p>
              </InfoBox>
            </Section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsAndConditions;
