export default function Footer() {
  return (
    <footer
      className="
        w-full 
        bg-gradient-to-r from-[#0b1120] via-[#0e1628] to-[#0b1120]
        text-white 
        pt-16 pb-10 px-6
      "
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* About */}
        <div>
          <h3 className="text-xl font-semibold mb-4">ZentraPay</h3>
          <p className="text-white/60 leading-relaxed">
            Providing fast, secure, and seamless payments powered by modern
            technology built for businesses, creators, and global users.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-3">

            <FooterLink label="Home" href="/" />

            <FooterLink label="Pricing" href="/pricing" />

            <FooterLink label="Payment Methods" href="/methods" />

            <FooterLink label="Developers" href="/docs" />

          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Support</h4>
          <ul className="space-y-3">

            <FooterLink label="Help Center" href="/support" />

            <FooterLink label="FAQ" href="/faq" />

            <FooterLink 
              label="support@lumopay.com" 
              href="mailto:support@lumopay.com" 
            />

          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Connect</h4>

          <div className="flex items-center gap-4">

            <SocialIcon src="/facebook.svg" hoverColor="#1877F2" />
            <SocialIcon src="/twitter.svg" />
            <SocialIcon src="/instagram.svg" />

          </div>
        </div>

      </div>

      {/* Bottom line */}
      <div className="border-t border-white/10 mt-12 pt-6 text-center text-white/40 text-sm">
        © {new Date().getFullYear()} Zentrapay. All rights reserved.
      </div>
    </footer>
  );
}


/* -------------------------------------
   🔗 REUSABLE LINK COMPONENT (Animated)
-------------------------------------- */
function FooterLink({ label, href }) {
  return (
    <li>
      <a
        href={href}
        className="relative group text-white/60 hover:text-white transition inline-block"
      >
        {label}

        {/* Underline */}
        <span
          className="
            absolute left-0 -bottom-1 h-[2px]
            bg-gradient-to-r from-green-400 to-green-600
            w-0 group-hover:w-full
            transition-all duration-300
          "
        ></span>
      </a>
    </li>
  );
}


/* -------------------------------------
   🌐 SOCIAL ICON COMPONENT
-------------------------------------- */
function SocialIcon({ src }) {
  return (
    <a
      href="#"
      className="hover:opacity-80 transition"
    >
      <img src={src} className="w-6 h-6" />
    </a>
  );
}
