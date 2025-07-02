import React from "react";
import { ShieldCheck } from "lucide-react";

const PrivacyPolicy = () => {
  const Section = ({ title, id, children, isLast = false }) => (
    <section
      id={id}
      className={!isLast ? "pb-8 mb-8 border-b border-neutral-200" : ""}
    >
      <h2 className="text-2xl font-bold text-neutral-800 mb-4">{title}</h2>
      <div className="space-y-4 text-neutral-600 leading-relaxed">
        {children}
      </div>
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

  return (
    <div className="min-h-screen bg-neutral-50 font-sans">
      <header className="bg-gradient-to-r from-primary-600 to-primary-700 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-white/10 p-4 rounded-xl mb-4">
            <ShieldCheck className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
        </div>
      </header>

      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-card p-8 md:p-12 mx-auto">
            <Section id="introduction" title="1. Introduction">
              <p>
                <strong>ESPI VISA CONSULTANTS PVT LTD</strong> ("we," "our," or
                "us") operates the StudyStreak.in website and Learning
                Management System (the "Platform"). This Privacy Policy explains
                how we collect, use, disclose, and safeguard your information
                when you visit our website or use our services.
              </p>
              <InfoBox>
                <p className="text-neutral-600">
                  <strong>Company:</strong>{" "}
                  <span className="text-primary-600">
                    ESPI VISA CONSULTANTS PVT LTD
                  </span>
                </p>
                <p className="text-neutral-600">
                  <strong>Address:</strong> Sayajigunj, Vadodara, Gujarat, India
                </p>
                <p className="text-neutral-600">
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:noreply@studystreak.in"
                    className="text-primary-600 hover:underline"
                  >
                    noreply@studystreak.in
                  </a>
                </p>
                <p className="text-neutral-600">
                  <strong>Phone:</strong> +91 98765 43210
                </p>
              </InfoBox>
            </Section>

            <Section
              id="information-collection"
              title="2. Information We Collect"
            >
              <SubSectionTitle>2.1 Personal Information</SubSectionTitle>
              <StyledList
                items={[
                  "<i>Registration Data:</i> Name, email address, phone number, date of birth, educational background",
                  "<i>Profile Information:</i> Academic history, test scores, career goals, preferred study destinations",
                  "<i>Payment Information:</i> Billing address, payment method details (processed securely through third-party providers)",
                  "<i>Communication Data:</i> Messages, feedback, support inquiries, and correspondence with our team",
                ]}
              />
              <SubSectionTitle>
                2.2 Automatically Collected Information
              </SubSectionTitle>
              <StyledList
                items={[
                  "<i>Device Information:</i> IP address, browser type, operating system, device identifiers",
                  "<i>Usage Data:</i> Pages visited, time spent on platform, click patterns, course progress, quiz scores",
                  "<i>Cookies and Tracking:</i> We use cookies and similar technologies to enhance user experience",
                ]}
              />
              <SubSectionTitle>2.3 Educational Data</SubSectionTitle>
              <StyledList
                items={[
                  "<i>Performance Metrics:</i> Test scores, practice results, progress tracking, learning analytics",
                  "<i>Study Materials:</i> Downloaded content, bookmarks, notes, and personalized study plans",
                ]}
              />
            </Section>

            <Section id="how-we-use" title="3. How We Use Your Information">
              <p className="text-neutral-600">
                We use your information for the following purposes:
              </p>
              <SubSectionTitle>3.1 Service Provision</SubSectionTitle>
              <StyledList
                items={[
                  "Providing access to IELTS, GRE, GMAT, and TOEFL preparation courses",
                  "Personalizing learning experiences and study recommendations",
                  "Tracking academic progress and generating performance reports",
                  "Facilitating communication between students and instructors",
                ]}
              />
              <SubSectionTitle>3.2 Administrative Purposes</SubSectionTitle>
              <StyledList
                items={[
                  "Processing registrations and managing user accounts",
                  "Processing payments and maintaining billing records",
                  "Sending important updates about courses, schedules, and platform changes",
                  "Providing customer support and technical assistance",
                ]}
              />
              <SubSectionTitle>3.3 Marketing and Communication</SubSectionTitle>
              <StyledList
                items={[
                  "Sending promotional materials about new courses and services (with consent)",
                  "Conducting surveys and collecting feedback to improve our services",
                  "Sharing success stories and testimonials (with explicit permission)",
                ]}
              />
              <SubSectionTitle>3.4 Legal and Compliance</SubSectionTitle>
              <StyledList
                items={[
                  "Complying with applicable laws and regulations",
                  "Protecting against fraud, abuse, and security threats",
                  "Enforcing our terms of service and other agreements",
                ]}
              />
            </Section>

            <Section
              id="information-sharing"
              title="4. Information Sharing and Disclosure"
            >
              <SubSectionTitle>
                4.1 Third-Party Service Providers
              </SubSectionTitle>
              <StyledList
                items={[
                  "Payment processing (payment gateways, billing services)",
                  "Cloud hosting and data storage",
                  "Email communication and marketing platforms",
                  "Analytics and performance monitoring tools",
                ]}
              />
              <SubSectionTitle>4.2 Educational Partners</SubSectionTitle>
              <p className="text-neutral-600">
                With your consent, we may share relevant information with:
              </p>
              <StyledList
                items={[
                  "Universities and educational institutions for application purposes",
                  "Test preparation organizations for official score reporting",
                  "Study abroad consultants and immigration advisors",
                ]}
              />
              <SubSectionTitle>4.3 Legal Requirements</SubSectionTitle>
              <p className="text-neutral-600">
                We may disclose your information when required by:
              </p>
              <StyledList
                items={[
                  "Court orders, legal processes, or government requests",
                  "Protection of our rights, property, or safety",
                  "Investigation of potential violations of our terms of service",
                  "Compliance with applicable Indian laws and regulations",
                ]}
              />
              <SubSectionTitle>4.4 Business Transfers</SubSectionTitle>
              <p className="text-neutral-600">
                In the event of a merger, acquisition, or sale of assets, your
                information may be transferred to the acquiring entity.
              </p>
            </Section>

            <Section id="data-security" title="5. Data Security">
              <p className="text-neutral-600">
                We implement appropriate technical and organizational security
                measures to protect your personal information:
              </p>
              <StyledList
                items={[
                  "<i>Encryption:</i> Data transmission is secured using SSL/TLS encryption",
                  "<i>Access Controls:</i> Limited access to personal data on a need-to-know basis",
                  "<i>Regular Security Audits:</i> Periodic assessments of our security practices",
                  "<i>Secure Storage:</i> Data is stored in secure, access-controlled environments",
                  "<i>Incident Response:</i> Procedures in place to respond to potential data breaches",
                ]}
              />
            </Section>

            <Section id="data-retention" title="6. Data Retention">
              <p className="text-neutral-600">
                We retain your personal information for as long as necessary to
                provide our services, comply with legal obligations, and resolve
                disputes.
              </p>
              <SubSectionTitle>Specific Retention Periods:</SubSectionTitle>
              <StyledList
                items={[
                  "Account information: Retained while account is active plus 3 years after closure",
                  "Payment records: 7 years as required by Indian tax laws",
                  "Educational progress data: 5 years for academic record purposes",
                  "Marketing communications: Until you unsubscribe or withdraw consent",
                ]}
              />
            </Section>

            <Section id="your-rights" title="7. Your Rights and Choices">
              <SubSectionTitle>7.1 Access and Correction</SubSectionTitle>
              <StyledList
                items={[
                  "Access and review your personal information",
                  "Request corrections to inaccurate or incomplete data",
                  "Download a copy of your data in a portable format",
                ]}
              />
              <SubSectionTitle>7.2 Deletion and Restriction</SubSectionTitle>
              <StyledList
                items={[
                  "Deletion of your personal information (subject to legal requirements)",
                  "Restriction of processing for specific purposes",
                  "Withdrawal of consent for marketing communications",
                ]}
              />
              <SubSectionTitle>7.3 Communication Preferences</SubSectionTitle>
              <StyledList
                items={[
                  "Opt-out of promotional emails by clicking unsubscribe links",
                  "Adjust notification settings in your account preferences",
                  "Contact us directly to modify communication preferences",
                ]}
              />
            </Section>

            <Section id="cookies" title="8. Cookies and Tracking Technologies">
              <SubSectionTitle>8.1 Types of Cookies We Use</SubSectionTitle>
              <StyledList
                items={[
                  "<i>Essential Cookies:</i> Required for platform functionality and security",
                  "<i>Performance Cookies:</i> Help us analyze platform usage and improve services",
                  "<i>Functional Cookies:</i> Remember your preferences and personalize experience",
                  "<i>Marketing Cookies:</i> Used for targeted advertising (with consent)",
                ]}
              />
              <SubSectionTitle>8.2 Cookie Management</SubSectionTitle>
              <StyledList
                items={[
                  "Browser settings to block or delete cookies",
                  "Our cookie preference center (when available)",
                  "Opting out of third-party advertising cookies",
                ]}
              />
            </Section>

            <Section id="childrens-privacy" title="9. Children's Privacy">
              <p className="text-neutral-600">
                Our services are intended for users aged 16 and above. We do not
                knowingly collect personal information from children under 16.
                If we become aware that we have collected information from a
                child under 16, we will take steps to delete such information
                promptly.
              </p>
            </Section>

            <Section
              id="international-transfers"
              title="10. International Data Transfers"
            >
              <p className="text-neutral-600">
                If we transfer your personal information outside of India, we
                will ensure appropriate safeguards are in place, including:
              </p>
              <StyledList
                items={[
                  "Adequacy decisions by the Indian government",
                  "Standard contractual clauses",
                  "Certification schemes and codes of conduct",
                ]}
              />
            </Section>

            <Section
              id="policy-changes"
              title="11. Changes to This Privacy Policy"
            >
              <p className="text-neutral-600">
                We may update this Privacy Policy periodically to reflect
                changes in our practices or legal requirements. We will:
              </p>
              <StyledList
                items={[
                  "Post the updated policy on our website",
                  "Notify you of material changes via email or platform notifications",
                  "Indicate the effective date of the new policy",
                ]}
              />
            </Section>

            <Section id="compliance" title="12. Compliance with Indian Laws">
              <p className="text-neutral-600">
                This Privacy Policy is designed to comply with:
              </p>
              <StyledList
                items={[
                  "The Information Technology Act, 2000 and IT Rules, 2011",
                  "The Personal Data Protection Bill (when enacted)",
                  "Other applicable Indian privacy and data protection laws",
                ]}
              />
            </Section>

            <Section id="contact" title="13. Contact Us" isLast={true}>
              <p>
                If you have questions, concerns, or requests regarding this
                Privacy Policy or our data practices, please contact us:
              </p>
              <InfoBox>
                <p className="text-primary-600">
                  <strong>ESPI VISA CONSULTANTS PVT LTD</strong>
                </p>
                <p className="text-neutral-600">
                  <strong>Address:</strong> Sayajigunj, Vadodara, Gujarat, India
                </p>
                <p className="text-neutral-600">
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:noreply@studystreak.in"
                    className="text-primary-600 hover:underline"
                  >
                    noreply@studystreak.in
                  </a>
                </p>
                <p className="text-neutral-600">
                  <strong>Phone:</strong> +91 98765 43210
                </p>
                <p className="text-neutral-600">
                  <strong>Data Protection Officer:</strong> Ananya Sharma
                </p>
              </InfoBox>
            </Section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
