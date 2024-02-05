import { siteConfig } from "@/config/site";
import { Icons } from "./icons";

export function SiteFooter() {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by
          <a href={siteConfig.links.twitter} target="_blank" rel="noreferrer">
            <Icons.fullLogo className="h-4 text-foreground inline-block mx-1" />
          </a>
        </p>
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          If you like our work{" "}
          <a
            href={siteConfig.links.staking}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            stake with us
          </a>
          , every delegation is much apreciated ❤️
        </p>
      </div>
    </footer>
  );
}
