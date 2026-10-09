const footerSections = [
  {
    title: "Actions",
    links: ["Summarist Magazine", "Cancel Subscription", "Help", "Contact us"],
  },
  {
    title: "Useful Links",
    links: [
      "Pricing",
      "Summarist Business",
      "Gift Cards",
      "Authors & Publishers",
    ],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Partners", "Code of Conduct"],
  },
  {
    title: "Other",
    links: ["Sitemap", "Legal Notice", "Terms of Service", "Privacy Policies"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#f1f6f4]">
      <div className="w-full py-10">
        <div className="mx-auto w-full max-w-[1070px] px-6">
          <div className="mx-auto mt-8 mb-16 flex flex-col text-center gap-8 sm:grid sm:grid-cols-2 md:flex md:flex-row md:justify-between md:text-sm md:text-start">
            {footerSections.map((section) => (
              <div key={section.title} className="z-[1]">
                <h3 className="text-primary mb-4 text-lg font-semibold">
                  {section.title}
                </h3>
                <div>
                  {section.links.map((link) => (
                    <div key={link} className="mb-3 leading-none last:mb-0">
                      <span className="text-secondary-text cursor-not-allowed text-sm">
                        {link}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center">
            <p className="text-primary font-medium">
              Copyright &copy; 2026 Summarist.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
