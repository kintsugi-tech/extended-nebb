"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <span className="hidden font-bold sm:inline-block text-primary">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        <Link
          href="/"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Home
        </Link>

        <Link
          href="/pilot-ranking"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/pilot-ranking")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Pilot Ranking
        </Link>
        <Link
          href="/crew-ranking"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/crew-ranking")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Crew Ranking
        </Link>
        <Link
          href="/proposals"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/proposals")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Proposals
        </Link>
        <Link
          href="/about-us"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/about-us")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          About us
        </Link>
        {/* TODO: Add a nice CTA "Earn More" */}
      </nav>
    </div>
  );
}
