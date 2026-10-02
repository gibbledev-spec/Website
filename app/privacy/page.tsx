import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Gibble collects, uses, shares and protects your personal information, and the privacy rights you have.",
};

type Part = { heading: string; paras?: string[]; bullets?: string[] };
type Section = { id: string; heading: string; paras?: string[]; bullets?: string[]; parts?: Part[] };

const email = site.email;

const sections: Section[] = [
  {
    id: "collection",
    heading: "Collection Of Personal Information",
    bullets: [
      "First and foremost, please note that you are not legally required to provide us with any of your personal data and may do so (or avoid doing so) at your own free will by not visiting or interacting with our Sites, nor using our Service or Apps.",
      "Some features of the Services do not require any personal information to be submitted. Accessing other parts and features of our services require you to provide your name, a valid email address and some additional information in order to adjust our services to you. We will use your email to send you messages, send you notifications about your account or about features in our services, including periodic updates, other information and offers.",
      "If you choose to subscribe to the Apps, Gibble uses the services of a credit card processing company to bill our users for subscription fees. These third parties do not retain, share, or store this personally identifiable information or its part other than for providing these services and are bound by strict agreements limiting their use of such information. Gibble does not collect or process any credit card information.",
      "Additionally, please note that we do not collect sensitive information such as medical, health, racial, ethnic, political, religious, philosophic, union membership or sexual orientation information.",
      "Our Site may contain links to third party websites, which may access and collect some of your data. This Privacy Policy only applies only to our Services and information we collect, while such third parties operate under their own privacy policies. Some of these third parties may be located in other countries where the law regarding processing personal information can differ from the laws of your country. By using our services or by providing us with your information you consent to this collection, transfer, storage, and processing of information to and in different countries.",
    ],
    parts: [
      {
        heading: "2.1. Data We May Collect",
        paras: ["In order to use other features and fully access all of our Services you we may collect the following types of personal information or data:"],
        bullets: [
          "Registration information. Upon signing up for the Services, we may collect your username, password, and email address to help us identify you, provide the Services, and inform you about your account and the Services.",
          "Additional profile details. You may give us additional information, such as your real name, your role (parent, student, teacher etc.), and your phone number to improve your experience.",
          "User generated content. We may also collect content you provide to us when you use our Services, such as information regarding your use of the Services, sample audio recordings for quality assurance and improving acoustic recognition experience, and other information relevant to customer surveys and/or commercial offers. We store all messages sent to our forums to help users find useful information about the Services.",
          "Support. If you contact with our support team regarding issues in our Services or any other issues, we may collect the information regarding your interactions with us, in order to help us provide a better service.",
          "Billing. We collect information required for processing the billing of your Services, subscriptions and other purchases you make.",
        ],
      },
      {
        heading: "2.2. Data We May Collect Automatically",
        bullets: [
          "Device and browser information. We may automatically receive and record information from your device and browser, including your cookie information, your country, regional and language settings, device model, operating system, mobile carrier and Apps and hardware attributes.",
          "IP address. We may use your IP address to provide you with our product on your device, to help us with server problem diagnosis and to administer the Services. An IP address is a numeric code that identifies your device on a network, or in this case, the Internet.",
          "We may also need to use your IP geolocation data in order to receive your general location and provide you with contents adjusted for your territory. Your IP address is also used to gather broad demographic information.",
        ],
      },
      {
        heading: "2.3. Information We Receive From Other Sources",
        paras: [
          "Some of our Services include registration via third parties, such as Facebook, Google, or other social networks. When you use such social networks, we receive profile information available about you, including your username, real name, email address and profile picture, may be shared with us.",
          "We use those for the same purposes as when you give them to us directly.",
        ],
      },
      {
        heading: "2.4. Cookies",
        paras: ["We use cookies on the Site for the following main purposes:"],
        bullets: [
          "to associate each of the pages that you visit on our Site with each other and thereby allows us to present the correct information to you.",
          "to keep you signed into our Site and ensure the content you are viewing is secure.",
          "to maintain your personal preferences",
        ],
      },
      {
        heading: "",
        paras: [
          "You may refuse to accept cookies by activating the setting on your browser. However, if you do so, you may be unable to access certain parts of our site. Unless you have adjusted your browser setting so that it will refuse cookies, our system will issue cookies when you log on to our site.",
        ],
      },
      {
        heading: "2.5. Statistical Information",
        bullets: [
          "When you use the Site or Apps, we may automatically collect and record information related to this use, either independently or with the help of third-party service providers, through cookies and similar technologies.",
          "We may analyze, profile and segment all such collected data. We may use services (such as Google Analytics) to understand users' behavior. These tools may use cookies to collect information. We use this information only to manage and improve our Services, and to create new features and functionality.",
        ],
      },
    ],
  },
  {
    id: "sharing",
    heading: "3. When And With Whom Information Is Shared",
    parts: [
      {
        heading: "3.1. Personal Identifiable Information",
        paras: ["We do not share any personal identifiable information or data with third parties, except as described below:"],
        bullets: [
          "We may share Personal Information with service providers and third parties for our operational purposes to enable the provisions of our services and with other service providers who provide crucial functions as database management, maintenance, marketing, data processing and analytics customer support platforms, hosting service providers, payment processors, analytics partners, third party account providers, security and/or social media service. These third parties have access to your data only to carry out these tasks on our behalf and are contractually obligated to keep all personal data they process strictly confidential.",
          "Legal. We may share Personal Information while we respond to subpoenas, court orders, or legal process, to establish or exercise our legal rights, to defend against legal claims or in such circumstances where, in our judgment, disclosure is required or appropriate in accordance with applicable laws and regulations.",
          "Violations. If we believe it is necessary to investigate, prevent or take action regarding illegal activities, suspected fraud, situations involving potential threats to the physical safety of any person, violations of our various terms of service or as otherwise required by law.",
          "In transactions. where all or part of our business is being sold, Personal Information collected from users is generally one of the business assets that will be transferred and will remain subject to this Privacy Policy or subsequent policies to which you have consented.",
        ],
      },
      {
        heading: "",
        paras: ["In addition, we may also share other types of personal information, as follows:"],
      },
      {
        heading: "3.2. Non-Personally Identifying Information",
        paras: [
          "We may share non-personally identifiable information (such as anonymous usage data, referring/exit pages and URLs, platform types, number of clicks, etc.) with third party service providers to help us understand the usage patterns for our service. Such data consist solely of non-personally identifiable information. Non-personally identifiable information may be stored indefinitely.",
        ],
      },
      {
        heading: "3.3. Public Information",
        paras: [
          "We may share as it sees fit information that you voluntarily make public, including information that you post on any blogs, message boards, chat rooms or other similar forums, whether such forums are owned by us or not. Since such public information can be accessed by the public and used by any member of the public, such use by third parties is beyond the control of Gibble.",
        ],
      },
    ],
  },
  {
    id: "rights",
    heading: "4. Controlling Your Privacy Rights",
    paras: [
      "Under applicable data protection laws, you have certain privacy rights in connection with your Personal Information and the way we handle it. Some of these rights may be subject to certain exceptions or limitations in accordance with applicable law.",
      "We follow the highest common standards to protect and enable your privacy rights.",
      "The following is a non-exhaustive list of certain privacy rights you may exercise:",
    ],
    parts: [
      {
        heading: "4.1. Right To Access Your Information",
        paras: [
          "You can access much of your information by logging into your account. Where legally required, we can provide your information upon your request. Note that, in accordance with applicable law, information will not be provided where doing so would adversely affect the rights (including the intellectual property rights) of others.",
        ],
      },
      {
        heading: "4.2. Right To Change, Restrict & Limit",
        paras: [
          `If you believe that any information we hold about you is incorrect or incomplete, please email us as soon as possible, at ${email}. We will promptly correct any information found to be incorrect.`,
        ],
      },
      {
        heading: "4.3. Right To Erasure",
        paras: [
          "You have the right to end this relationship is by deleting your account. If you choose to do so, we will delete all your personal data from our systems, including backups within 30 days, unless there is a legitimate business interest to keep the data, such as to comply with legal obligations, to enforce agreements or to resolve disputes.",
        ],
      },
      {
        heading: "4.4. Right To Be Forgotten",
        paras: [
          "You have the right to be forgotten. If you choose to delete your profile, we will delete all associated information and it will be like you never signed up in the first place (with the exceptions mentioned above, meaning that we may, for a legitimate reason, have the right to keep some of your data).",
        ],
      },
      {
        heading: "4.5. Right To Object",
        paras: [
          "If we process your information based on our legitimate interests explained above, or in the public interest, you can object to this processing in certain circumstances. In such cases, we will cease processing your information unless we have compelling legitimate grounds to continue processing or where it is needed for legal reasons.",
        ],
      },
      {
        heading: "4.6. Right To Revoke Consent",
        paras: [
          "Where you have previously provided your consent, you have the right to withdraw your consent to the processing of your information at any time. In certain cases, we may continue to process your information after you have withdrawn consent if we have a legal basis to do so or if your withdrawal of consent was limited to certain processing activities.",
        ],
      },
      {
        heading: "4.7. Right To Lodge A Complaint",
        paras: [
          "Should you wish to raise a concern about our use of your information (and without prejudice to any other rights you may have), you have the right to do so with your local data protection authority.",
        ],
      },
    ],
  },
  {
    id: "retention",
    heading: "5. Retention; Minimization",
    bullets: [
      "Unless instructed otherwise by a user, by default we do not retain identified usage data. We also periodically review and delete, archive or de-identify inactive data and related Personal Information that have been inactive for five years.",
      "We may retain Personal Information for longer periods if it is still necessary to meet our legal obligations (e.g. in relation to claims) or to deal with complaints, queries and to protect our legal rights in the event of a claim being made.",
      "We may also retain communications with you in order to process your inquiries, verify account details, respond to your requests and improve our Site, Apps and/or the services we provide.",
      "We will further consider if and how we can minimize over time the Personal Information that we use, and if we can anonymize your Personal Information so that it can no longer be associated with you or identify you, in which case we may use that information without further notice to you.",
    ],
  },
  {
    id: "transfer",
    heading: "6. Transfer Of Data Outside Your Territory",
    paras: [
      "We may store and process information in various locations throughout the globe, including through cloud services. The laws in those other countries may provide a lesser degree of data protection than the laws of your own country. You agree to the transfer of your information to such other countries for the purpose of the processing as described in this Policy, including through cloud services.",
    ],
  },
  {
    id: "protection",
    heading: "7. How Information Is Protected",
    bullets: [
      "We maintain technical and organizational measures to protect against accidental or unlawful destruction, loss, alteration, unauthorized disclosure of, or access to your information and we are committed to ensuring that all your collected data is secure.",
      "We strive to maintain the reliability, accuracy, and completeness of personal information that we collect and to protect the privacy and security of our users. We keep your personal information only for as long as reasonably necessary for the purposes for which it was collected or to comply with any applicable legal or ethical reporting or document retention requirements.",
      "We limit access to personal information about you to employees, contractors, and service provider who we believe reasonably need to be exposed to the personal information. These individuals are bound by confidentiality obligations and may be subject to discipline, including termination and criminal prosecution, if they fail to meet these obligations.",
      `If you suspect your login information has been compromised, you should notify us immediately at ${email} and change your password.`,
      "From time to time, we review our security mechanisms. However, please be aware that despite the efforts and resources we are investing, no security measures are perfect or impenetrable. Therefore, while we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.",
    ],
  },
  {
    id: "minors",
    heading: "8. Minors",
    bullets: [
      "We care about the safety of children and take reasonable measures to protect children personal information in accordance with applicable law. We do not knowingly engage in activities that process the data of minors under 13 or target children. Children are not allowed to register with or use the Services, or to disclose any personal identifiable information without appropriate parental or legal guardian approval.",
      "If you are under the age of 13, you must obtain parental consent (or consent from your legal guardian) prior to using our Services. We do not knowingly contact or engage with children under the age of 13 without said parental consent (or consent from your legal guardian).",
    ],
  },
];

function Text({ paras, bullets }: { paras?: string[]; bullets?: string[] }) {
  return (
    <>
      {paras?.map((p) => (
        <p key={p} className="mt-3">{p}</p>
      ))}
      {bullets && (
        <ul className="mt-3 list-disc space-y-2.5 pl-5 marker:text-brand">
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy policy">
        How Gibble collects, uses, shares and protects your personal information.
      </PageHero>
      <section className="px-4 pb-24 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[240px_1fr]">
          <nav aria-label="Privacy policy sections" className="hidden lg:block">
            <ul className="sticky top-28 space-y-1 text-sm">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="block rounded-xl px-3 py-2 font-semibold text-ink-soft hover:bg-white hover:text-ink">
                    {s.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <article className="min-w-0 rounded-[2rem] bg-white p-6 leading-relaxed text-ink-soft ring-1 ring-line sm:p-10 md:p-12">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className={`scroll-mt-28 ${i > 0 ? "mt-12 border-t border-line pt-10" : ""}`}>
                <h2 className="text-2xl font-black text-ink sm:text-3xl">{s.heading}</h2>
                <Text paras={s.paras} bullets={s.bullets} />
                {s.parts?.map((p, j) => (
                  <div key={p.heading || `${s.id}-${j}`} className={p.heading ? "mt-8" : "mt-3"}>
                    {p.heading && <h3 className="font-sans text-lg font-bold tracking-normal text-ink">{p.heading}</h3>}
                    <Text paras={p.paras} bullets={p.bullets} />
                  </div>
                ))}
              </section>
            ))}
            <p className="mt-12 border-t border-line pt-8">
              Questions about this policy? Email us at{" "}
              <a href={`mailto:${email}`} className="font-semibold text-ink underline">{email}</a>.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
