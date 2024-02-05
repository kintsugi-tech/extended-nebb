import { siteConfig } from "@/config/site";

export default function AboutUsPage() {
  return (
    <div className="container relative">
      <div className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:pb-18">
        <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1] text-primary">
          Kintsugi Tech
        </h1>
        <div className="px-8 pt-6 pb-8 mb-4">
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            We are an amalgamation of the most experienced people, technology
            services, and ecosystem development history maturing the blockchain
            ecosystem.
          </p>
          <p className="mt-4">
            Check out our{" "}
            <a
              href={siteConfig.links.web}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              website
            </a>
            .
          </p>

          <h2 className="scroll-m-20 border-b pt-6 text-3xl font-semibold tracking-tight first:mt-0">
            Validators
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Technology & finance are not culturally agnostic. The future of
            blockchain is global distribution which requires global
            representation by regional validators. Regional validator hotspots
            contribute to decentralized infrastructure. We are establishing and
            acquiring local validators in regions globally. By leveraging our
            technical experience and brand, we are finding the qualified local
            partners with specialized GTM expertise. Our network of validators
            will share best practices & assure a layer of quality control.
          </p>
          <p className="mt-4">
            Find us on{" "}
            <a
              href={siteConfig.links.staking}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              mintscan
            </a>
            .
          </p>
          <h2 className="scroll-m-20 border-b pt-6 text-3xl font-semibold tracking-tight first:mt-0">
            Developers
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Our team of developers stands at the forefront of the Web3
            revolution, bringing a rich legacy of Web2 expertise. We excel in
            crafting decentralized applications (DApps) that are not only
            innovative but also user-friendly, ensuring a smooth transition for
            users from the familiar terrain of Web2 to the new possibilities of
            Web3. Our approach combines the best of both worlds – the
            reliability and user experience of traditional web applications with
            the decentralized, transparent nature of blockchain technology. Our
            DApps are designed to empower users with greater control and
            security, paving the way for a more interconnected and efficient
            digital future.
          </p>
          <p className="mt-4">
            Find us on{" "}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
          <h2 className="scroll-m-20 border-b pt-6 text-3xl font-semibold tracking-tight first:mt-0">
            Blockchain Advocates
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            As Blockchain Advocates, we are committed to demystifying and
            spreading awareness about blockchain technology. Our team is
            composed of enthusiastic individuals who are deeply immersed in the
            blockchain space, always staying abreast of the latest trends and
            developments. We engage with the community through various
            platforms, sharing insights, participating in discussions, and
            contributing to the collective understanding of blockchain
            technology. Our advocacy extends beyond just conversations; we
            actively participate in blockchain events, workshops, and seminars,
            playing a pivotal role in shaping the future of this transformative
            technology.
          </p>
          <p className="mt-4">
            Find us on{" "}
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              X
            </a>
            ,{" "}
            <a
              href={siteConfig.links.youtube}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              YouTube
            </a>{" "}
            , and other social platforms.
          </p>
        </div>
      </div>
    </div>
  );
}
