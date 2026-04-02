export default function TC() {
    return (
        <>
            <div className="min-h-screen relative flex items-center justify-center py-10 text-white overflow-hidden bg-[#470003]">

                {/* Background Image */}
                <div
                    className=" absolute inset-0 bg-[url('/images/backgrounds/stars.png')] bg-repeat-y bg-center"
                    style={{
                        backgroundSize: '100% 24rem' // 24rem = h-96
                    }}
                />

                {/* Content */}
                <div className="mx-auto font-[Satoshi] px-20 max-sm:px-5">

                    {/* Page Title */}
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                        Terms & Conditions
                    </h1>
                    <p className="text-sm text-gray-400 text-center mb-8">
                        Last updated: April 2026
                    </p>

                    {/* Main Content */}
                    <div className="space-y-8 text-gray-300 text-sm leading-relaxed">

  {/* 1. Acceptance */}
  <section>
    <h2 className="text-lg font-extrabold text-white mb-2">
      1. Acceptance of Terms
    </h2>
    <p>
      By accessing or using the Technical Students' Society (TSS) GNDU website,
      you agree to be bound by these Terms & Conditions and all applicable laws.
      If you do not agree with any part of these terms, you must discontinue use
      of the platform immediately.
      <br /><br />
      These terms apply to all users, including visitors, registered members,
      and event participants.
    </p>
  </section>

  {/* 2. Eligibility */}
  <section>
    <h2 className="text-lg font-semibold text-white mb-2">
      2. Eligibility
    </h2>
    <p>
      TSS services are intended for students, professionals, and individuals
      interested in technical activities. Users under the age of 18 should use
      the platform under the supervision of a parent or guardian.
      <br /><br />
      By registering for any event or service, you confirm that the information
      provided is accurate and complete.
    </p>
  </section>

  {/* 3. User Responsibilities */}
  <section>
    <h2 className="text-lg font-semibold text-white mb-2">
      3. User Responsibilities
    </h2>
    <p>
      Users agree to provide accurate information and maintain respectful
      behavior across all interactions. Any misuse of the platform, including
      impersonation, submission of false data, or disruptive conduct, may
      result in suspension or termination of access.
      <br /><br />
      Participants are expected to follow ethical practices during events,
      workshops, and competitions.
    </p>
  </section>

  {/* 4. Events & Participation */}
  <section>
    <h2 className="text-lg font-semibold text-white mb-2">
      4. Events & Participation
    </h2>
    <p>
      Participation in TSS events is subject to event-specific guidelines.
      TSS reserves the right to modify schedules, formats, or rules when
      necessary.
      <br /><br />
      Failure to comply with event rules or misconduct may lead to
      disqualification without prior notice.
    </p>
  </section>

  {/* 5. Intellectual Property */}
  <section>
    <h2 className="text-lg font-semibold text-white mb-2">
      5. Intellectual Property
    </h2>
    <p>
      All content on this website, including text, graphics, logos, and media,
      is the property of TSS GNDU and is protected by applicable laws.
      <br /><br />
      Users may not copy, distribute, or reproduce any content without prior
      written permission. Any submissions made during events remain the
      participant’s property; however, TSS may use them for promotional or
      educational purposes.
    </p>
  </section>

  {/* 6. Website Usage */}
  <section>
    <h2 className="text-lg font-semibold text-white mb-2">
      6. Website Usage
    </h2>
    <p>
      You agree to use this website only for lawful purposes. Any attempt to
      harm, disrupt, or misuse the platform—including unauthorized access or
      introducing malicious software—is strictly prohibited.
      <br /><br />
      TSS reserves the right to restrict access in case of violations.
    </p>
  </section>

  {/* 7. Media Consent */}
  <section>
    <h2 className="text-lg font-semibold text-white mb-2">
      7. Media Consent
    </h2>
    <p>
      By participating in TSS events, you consent to being photographed or
      recorded. These materials may be used for promotional and documentation
      purposes across digital platforms.
      <br /><br />
      No compensation will be provided for such usage.
    </p>
  </section>

  {/* 8. Limitation of Liability */}
  <section>
    <h2 className="text-lg font-semibold text-white mb-2">
      8. Limitation of Liability
    </h2>
    <p>
      TSS shall not be held liable for any direct or indirect damages arising
      from the use of the website or participation in events. Users engage with
      the platform at their own risk.
    </p>
  </section>

  {/* 9. Changes to Terms */}
  <section>
    <h2 className="text-lg font-semibold text-white mb-2">
      9. Changes to Terms
    </h2>
    <p>
      TSS reserves the right to update or modify these Terms at any time.
      Changes will be effective immediately upon posting. Continued use of the
      website indicates acceptance of the updated terms.
    </p>
  </section>

  {/* 10. Governing Law */}
  <section>
    <h2 className="text-lg font-semibold text-white mb-2">
      10. Governing Law
    </h2>
    <p>
      These Terms & Conditions are governed by the laws of India. Any disputes
      shall be subject to the jurisdiction of courts in Amritsar, Punjab.
    </p>
  </section>

</div>

                </div>
            </div>
        </>
    );
}