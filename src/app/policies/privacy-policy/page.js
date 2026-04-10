import { Mail } from "lucide-react";


export default function PP() {
    return (
        <div className="min-h-screen relative flex items-center justify-center py-10 text-white overflow-hidden bg-zinc-950">

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
                    Privacy Policy
                </h1>
                <p className="text-sm text-gray-400 text-center mb-8">
                    Last updated: April 2026
                </p>

                <p className="leading-relaxed text-sm mb-10">
                    Thank you for visiting <span className="text-white font-semibold">TSS Website</span>.
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your
                    personal information when you access or use our website and services.
                    By using the platform, you consent to the practices described below.
                </p>

                {/* Main Content */}
                <div className="space-y-8 text-gray-300 text-sm leading-relaxed">

                    <section>
                        <h2 className="text-lg font-extrabold text-white mb-2">
                            1. Information We Collect
                        </h2>

                        <p className="mb-3">
                            <span className="font-semibold text-white">a. Personal Information:</span>{" "}
                            We may collect personal information such as your name, email address,
                            phone number, academic details, and other relevant data when you
                            register for events, join our community, or interact with our platform.
                        </p>

                        <p>
                            <span className="font-semibold text-white">b. Non-Personal Information:</span>{" "}
                            We may also collect non-personal data such as browser type, IP address,
                            device information, and usage patterns to enhance performance, security,
                            and user experience.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-extrabold text-white mb-2">
                            2. How We Use Your Information
                        </h2>

                        <p className="mb-3">
                            <span className="font-semibold text-white">a. Event Participation:</span>{" "}
                            Your information is used to process registrations, manage participation,
                            and provide updates related to events, workshops, and competitions.
                        </p>

                        <p className="mb-3">
                            <span className="font-semibold text-white">b. Communication:</span>{" "}
                            We may send you emails or messages regarding announcements, schedules,
                            results, or important updates. You can opt out of non-essential
                            communications anytime.
                        </p>

                        <p className="mb-3">
                            <span className="font-semibold text-white">c. Improvement:</span>{" "}
                            We analyze user behavior to improve our website, services, and overall
                            user experience.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-extrabold text-white mb-2">
                            3. Sharing of Information
                        </h2>

                        <p className="mb-3">
                            <span className="font-semibold text-white">a. Trusted Services:</span>{" "}
                            We may share your data with trusted third-party services (such as hosting,
                            analytics, or email services) strictly for operational purposes.
                        </p>

                        <p>
                            <span className="font-semibold text-white">b. Legal Requirements:</span>{" "}
                            We may disclose information if required by law or to protect our rights,
                            users, or services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-extrabold text-white mb-2">
                            4. Data Security
                        </h2>

                        <p>
                            We implement reasonable security measures to protect your personal data.
                            However, no online platform can guarantee complete security, and users
                            share information at their own risk.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-extrabold text-white mb-2">
                            5. Cookies
                        </h2>

                        <p>
                            We use cookies and similar technologies to improve user experience,
                            analyze traffic, and personalize content. You can disable cookies
                            through your browser settings if preferred.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-extrabold text-white mb-2">
                            6. Third-Party Links
                        </h2>

                        <p>
                            Our website may contain links to external websites. We are not responsible
                            for their privacy practices, and we encourage users to review their
                            policies before sharing information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-extrabold text-white mb-2">
                            7. Policy Updates
                        </h2>

                        <p>
                            We may update this Privacy Policy from time to time. Any changes will be
                            posted on this page, and continued use of the website indicates your
                            acceptance of the updated policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-extrabold text-white mb-2">
                            8. Contact Us
                        </h2>

                        <p>
                            If you have any questions or concerns regarding this Privacy Policy,
                            feel free to contact us:
                        </p>

                        <a href="mailto:tss.gndu@gmail.com" className="relative"><p className="mt-2 text-white font-semibold flex items-center">
                            <Mail className="h-4" />tss.gndu@gmail.com
                        </p></a>
                    </section>

                </div>
                <p className="text-sm text-gray-400 text-center pt-10">
                    By using the platform, you agree to the terms outlined in this Privacy Policy.
                </p>
            </div>
        </div>
    );
}
