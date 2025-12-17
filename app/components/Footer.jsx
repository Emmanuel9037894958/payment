export default function Footer() {
  return (
    <footer
      className="
        w-full 
        bg-gradient-to-r from-[#0b1120] via-[#0e1628] to-[#0b1120]
        text-white 
        pt-14 sm:pt-16 lg:pt-20
        pb-10 sm:pb-12
        px-4 sm:px-6 lg:px-10
      "
    >
      <div
        className="
          max-w-7xl 2xl:max-w-[1400px]
          mx-auto
          grid grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-10 lg:gap-12
        "
      >
        {/* About */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
            ZentraPay
          </h3>
          <p className="text-white/60 leading-relaxed text-sm sm:text-base max-w-md">
            Providing fast, secure, and seamless payments powered by modern
            technology built for businesses, creators, and global users.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
            Quick Links
          </h4>
          <ul className="space-y-3">
            <FooterLink label="Home" href="/" />
            <FooterLink label="Pricing" href="/pricing" />
            <FooterLink label="Payment Methods" href="/methods" />
            <FooterLink label="Developers" href="/docs" />
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
            Support
          </h4>
          <ul className="space-y-3">
            <FooterLink label="Help Center" href="/support" />
            <FooterLink label="FAQ" href="/faq" />
            <FooterLink
              label="support@lumopay.com"
              href="mailto:support@lumopay.com"
            />
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-base sm:text-lg font-semibold mb-4">
            Connect
          </h4>

          <div className="flex items-center gap-4">
            <SocialIcon src="/facebook.svg" />
            <SocialIcon src="/twitter.svg" />
            <SocialIcon src="/instagram.svg" />
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div
        className="
          border-t border-white/10
          mt-12 sm:mt-16
          pt-6
          text-center
          text-white/40
          text-xs sm:text-sm
        "
      >
        © {new Date().getFullYear()} ZentraPay. All rights reserved.
      </div>
    </footer>
  );
}

/* -------------------------------------
   🔗 REUSABLE LINK COMPONENT
-------------------------------------- */
function FooterLink({ label, href }) {
  return (
    <li>
      <a
        href={href}
        className="
          relative group
          text-white/60 hover:text-white
          transition inline-block
          text-sm sm:text-base
        "
      >
        {label}

        <span
          className="
            absolute left-0 -bottom-1 h-[2px]
            bg-gradient-to-r from-green-400 to-green-600
            w-0 group-hover:w-full
            transition-all duration-300
          "
        />
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
      className="
        flex items-center justify-center
        w-10 h-10
        rounded-full
        bg-white/5
        hover:bg-white/10
        transition
      "
    >
      <img src={src} className="w-5 h-5" />
    </a>
  );
}
