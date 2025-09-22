import type { Metadata } from "next";
import { Background, Nav, Footer, FrameCard } from "../../components/SiteChrome";

export const metadata: Metadata = { title: "Privacy • Bitcoin Peter Todd" };

export default function PrivacyPage() {
  return (
    <div className="min-h-screen body-bg text-white relative overflow-x-hidden">
      <Background />
      <Nav />
      <main id="content" className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
        <FrameCard glow>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Privacy Policy</h1>
          <div className="mt-6 space-y-4 text-white/85 leading-relaxed">
            <p>We collect data needed for whitelist onboarding and communications. Data is stored securely and not shared beyond operational needs.</p>
            <p>Contact <a href="mailto:info@bitcoinpetertodd.com" className="text-yellow-300">info@bitcoinpetertodd.com</a> to request access or removal.</p>
          </div>
        </FrameCard>
      </main>
      <Footer />
    </div>
  );
}
