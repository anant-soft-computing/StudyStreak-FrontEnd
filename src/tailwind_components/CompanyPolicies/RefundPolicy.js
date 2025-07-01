import React from "react";
import { CircleDollarSign } from "lucide-react";

const RefundPolicy = () => {
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

  const CategoryTitle = ({ children }) => (
    <h4 className="font-semibold text-neutral-600 mt-4 mb-2">{children}</h4>
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
            <CircleDollarSign className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Refund Policy
          </h1>
        </div>
      </header>

      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-card p-8 md:p-12 mx-auto">
            <Section id="introduction" title="1. Introduction">
              <p>
                This Refund Policy outlines the terms and conditions under which
                ESPI Consultants provides refunds for courses and services
                purchased through StudyStreak.in. We are committed to student
                satisfaction while maintaining fair business practices.
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
              </InfoBox>
            </Section>

            <Section
              id="general-principles"
              title="2. General Refund Principles"
            >
              <SubSectionTitle>2.1 Our Commitment</SubSectionTitle>
              <p className="text-neutral-600">
                We strive to provide high-quality educational services and stand
                behind our courses. However, refunds are subject to the terms
                outlined in this policy.
              </p>
              <SubSectionTitle>2.2 Refund Processing</SubSectionTitle>
              <StyledList
                items={[
                  "All refunds are processed back to the original payment method",
                  "Refund processing time: 7-14 business days after approval",
                  "Bank processing may take additional 3-5 business days",
                  "Refund amounts may be subject to payment gateway charges",
                ]}
              />
              <SubSectionTitle>2.3 Currency and Charges</SubSectionTitle>
              <StyledList
                items={[
                  "Refunds are processed in the same currency as the original payment",
                  "Payment gateway charges (typically 2-3%) may be deducted from refunds",
                  "International transaction fees (if applicable) are non-refundable",
                ]}
              />
            </Section>

            <Section id="eligibility" title="3. Refund Eligibility Criteria">
              <SubSectionTitle>
                3.1 Full Refund Eligibility (100% Refund)
              </SubSectionTitle>
              <CategoryTitle>Technical Issues (Platform-Side):</CategoryTitle>
              <StyledList
                items={[
                  "Persistent technical problems preventing course access for more than 48 hours",
                  "Significant platform outages affecting course delivery",
                  "Course content delivery failures due to our technical errors",
                ]}
              />
              <CategoryTitle>Course Cancellation by Us:</CategoryTitle>
              <StyledList
                items={[
                  "We cancel or discontinue a course before completion",
                  "Instructor unavailability leading to course cancellation",
                  "Force majeure events preventing course delivery",
                ]}
              />
              <CategoryTitle>Early Withdrawal (Within 7 Days):</CategoryTitle>
              <StyledList
                items={[
                  "Request submitted within 7 days of enrollment",
                  "Course content accessed is less than 10% of total content",
                  "No certificates or completion badges have been earned",
                  "No live sessions attended",
                ]}
              />

              <SubSectionTitle>
                3.2 Partial Refund Eligibility (50% Refund)
              </SubSectionTitle>
              <CategoryTitle>Mid-Course Withdrawal:</CategoryTitle>
              <StyledList
                items={[
                  "Request submitted between 8-14 days after enrollment",
                  "Course completion is less than 25%",
                  "Valid reason for withdrawal (medical emergency, visa rejection, etc.)",
                  "Documentation may be required for certain circumstances",
                ]}
              />
              <CategoryTitle>Course Quality Issues:</CategoryTitle>
              <StyledList
                items={[
                  "Significant discrepancies between advertised and delivered content",
                  "Major technical issues affecting learning experience",
                  "Instructor-related issues impacting course quality",
                ]}
              />

              <SubSectionTitle>
                3.3 Pro-Rated Refund (Variable Amount)
              </SubSectionTitle>
              <CategoryTitle>Visa Rejection:</CategoryTitle>
              <StyledList
                items={[
                  "Official visa rejection letter required",
                  "Application must be for study purposes related to the enrolled course",
                  "Refund calculated based on unused course duration",
                  "Administrative fee may apply",
                ]}
              />
              <CategoryTitle>Medical Emergency:</CategoryTitle>
              <StyledList
                items={[
                  "Medical certificate from registered practitioner required",
                  "Emergency must prevent continued course participation",
                  "Refund based on unused course content and duration",
                ]}
              />
            </Section>

            <Section id="non-refundable" title="4. Non-Refundable Situations">
              <SubSectionTitle>4.1 No Refund Circumstances</SubSectionTitle>
              <CategoryTitle>Student-Related Factors:</CategoryTitle>
              <StyledList
                items={[
                  "Change of mind or study plans after 14 days",
                  "Failure to meet course prerequisites",
                  "Inadequate internet connectivity or technical issues on student's end",
                  "Dissatisfaction with teaching methodology (unless significantly different from advertised)",
                ]}
              />
              <CategoryTitle>Course Completion:</CategoryTitle>
              <StyledList
                items={[
                  "Course completion exceeding 25% of total content",
                  "Certificate or completion badge already issued",
                  "Significant engagement with course materials (downloads, assignments completed)",
                ]}
              />
              <CategoryTitle>Policy Violations:</CategoryTitle>
              <StyledList
                items={[
                  "Account termination due to terms of service violations",
                  "Academic dishonesty or integrity violations",
                  "Sharing of account credentials or course materials",
                ]}
              />
              <CategoryTitle>External Factors:</CategoryTitle>
              <StyledList
                items={[
                  "Changes in test formats or requirements by testing organizations (IELTS, GRE, GMAT, TOEFL)",
                  "Personal circumstances not related to our services",
                  "Employer or sponsor funding decisions",
                ]}
              />

              <SubSectionTitle>4.2 Non-Refundable Items</SubSectionTitle>
              <StyledList
                items={[
                  "Individual study materials or e-books purchased separately",
                  "One-time consultation fees",
                  "Administrative and processing fees",
                  "Certification fees paid to external organizations",
                ]}
              />
            </Section>

            <Section id="request-process" title="5. Refund Request Process">
              <SubSectionTitle>5.1 How to Request a Refund</SubSectionTitle>
              <p className="text-neutral-600">
                To request a refund, email us at{" "}
                <a
                  href="mailto:refunds@studystreak.in"
                  className="text-primary-600 font-medium hover:underline"
                >
                  refunds@studystreak.in
                </a>{" "}
                with your full name, registered email, course name, transaction
                ID, a detailed reason for the request, and any supporting
                documentation.
              </p>
              <SubSectionTitle>5.2 Review Process</SubSectionTitle>
              <StyledList
                items={[
                  "<strong>Initial Review (2-3 Business Days):</strong> Verification of account, purchase, and course usage.",
                  "<strong>Detailed Assessment (3-5 Business Days):</strong> Evaluation against policy criteria.",
                  "<strong>Processing (7-14 Business Days):</strong> Approved refunds are processed to the original payment method.",
                ]}
              />
              <SubSectionTitle>5.3 Appeal Process</SubSectionTitle>
              <p className="text-neutral-600">
                If your refund request is denied, you may appeal the decision
                within 15 days by providing additional documentation. All
                decisions after an appeal are final.
              </p>
            </Section>

            <Section
              id="special-circumstances"
              title="6. Special Circumstances"
            >
              <SubSectionTitle>6.1 Visa-Related Refunds</SubSectionTitle>
              <StyledList
                items={[
                  "<strong>Eligible Circumstances:</strong> Official visa rejection for study purposes.",
                  "<strong>Required Documentation:</strong> Official visa rejection letter, copy of visa application, and proof of course relevance.",
                  "<strong>Refund Calculation:</strong> 80% refund if requested within 30 days of rejection; 60% within 60 days.",
                ]}
              />
              <SubSectionTitle>6.2 Course Transfer Option</SubSectionTitle>
              <StyledList
                items={[
                  "Transfer to a different course or a future batch.",
                  "Transfer is valid for 12 months from original enrollment.",
                  "A one-time transfer per enrollment is permitted.",
                ]}
              />
              <SubSectionTitle>6.3 Partial Course Access</SubSectionTitle>
              <p className="text-neutral-600">
                Following a partial refund, you may retain access to completed
                modules and downloaded materials for personal use, but will lose
                access to incomplete modules and future support.
              </p>
            </Section>

            <Section
              id="payment-terms"
              title="7. Payment-Specific Refund Terms"
            >
              <SubSectionTitle>7.1 Credit/Debit Card Payments</SubSectionTitle>
              <StyledList
                items={[
                  "Refunds are processed to the same card used for payment.",
                  "The refund may appear on your bank statement within an additional 2-3 business days after our processing.",
                ]}
              />
              <SubSectionTitle>7.2 Net Banking and UPI</SubSectionTitle>
              <StyledList
                items={[
                  "Refunds are credited directly to the bank account.",
                  "Account verification may be required.",
                  "Processing time is typically 5-10 business days.",
                ]}
              />
              <SubSectionTitle>7.3 Digital Wallets</SubSectionTitle>
              <StyledList
                items={[
                  "Refunds are processed to the same wallet, subject to wallet-specific processing times",
                  "An alternative refund method may be used if the wallet is inactive.",
                ]}
              />
              <SubSectionTitle>7.4 International Payments</SubSectionTitle>
              <StyledList
                items={[
                  "Currency conversion rates at the time of refund will apply, and international transfer fees may be deducted.",
                  "Additional processing time may be required.",
                ]}
              />
            </Section>

            <Section id="promotions" title="8. Promotional and Discount Impact">
              <SubSectionTitle>8.1 Discounted Enrollments</SubSectionTitle>
              <StyledList
                items={[
                  "Refunds are calculated on the actual amount paid.",
                  "Promotional credits are forfeited upon refund.",
                  "Future discount eligibility may be affected.",
                ]}
              />
              <SubSectionTitle>8.2 Bundle Packages</SubSectionTitle>
              <StyledList
                items={[
                  "Partial refunds are available for unused courses in a bundle.",
                  "The bundle discount benefits may be recalculated, and individual course pricing may apply to remaining courses.",
                ]}
              />
            </Section>

            <Section id="exceptions" title="9. Exceptional Circumstances">
              <SubSectionTitle>
                9.1 Natural Disasters and Emergencies
              </SubSectionTitle>
              <StyledList
                items={[
                  "During declared emergencies, refund requests will be evaluated on a case-by-case basis.",
                  "Extended refund windows or alternative arrangements may be offered.",
                ]}
              />
              <SubSectionTitle>
                9.2 Platform Migration or Shutdown
              </SubSectionTitle>
              <StyledList
                items={[
                  "Full refunds for unused courses will be provided if the platform shuts down.",
                  "We will provide a 30-day notice for any major platform changes.",
                ]}
              />
            </Section>

            <Section id="contact" title="10. Contact Information and Support">
              <SubSectionTitle>10.1 Refund Inquiries</SubSectionTitle>
              <p>
                For all refund-related questions, please contact us with your
                full name, account email, order ID, and course name.
              </p>
              <InfoBox>
                <p className="text-neutral-600">
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:refunds@studystreak.in"
                    className="text-primary-600 hover:underline"
                  >
                    refunds@studystreak.in
                  </a>
                </p>
                <p className="text-neutral-600">
                  <strong>Phone:</strong> +91 98765 43210
                </p>
                <p className="text-neutral-600">
                  <strong>Business Hours:</strong> Monday - Friday, 10:00 AM -
                  6:00 PM IST
                </p>
              </InfoBox>
              <SubSectionTitle>10.3 Escalation Process</SubSectionTitle>
              <StyledList
                items={[
                  "If you are not satisfied with an initial response, you may request a supervisor review via email.",
                  "Management will conduct a final review within 5-7 business days.",
                  "If you continue to be dissatisfied, you may file a formal complaint with our compliance team.",
                ]}
              />
            </Section>

            <Section id="updates" title="11. Policy Updates and Communication">
              <SubSectionTitle>11.1 Policy Changes</SubSectionTitle>
              <p className="text-neutral-600">
                Refund policy updates will be communicated via email and apply
                to enrollments made after the new effective date. Existing
                enrollments are governed by the policy at the time of purchase.
              </p>
              <SubSectionTitle>11.2 Student Communication</SubSectionTitle>
              <p className="text-neutral-600">
                We communicate all refund decisions and status updates through
                email, SMS, and account dashboard notifications.
              </p>
            </Section>

            <Section id="legal" title="12. Legal Compliance" isLast={true}>
              <p className="text-neutral-600">
                This refund policy is designed to comply with applicable Indian
                laws, including:
              </p>
              <StyledList
                items={[
                  "Consumer Protection Act, 2019",
                  "Information Technology Act, 2000",
                  "Guidelines issued by the Ministry of Education, Government of India",
                  "Reserve Bank of India (RBI) payment guidelines",
                ]}
              />
            </Section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RefundPolicy;
