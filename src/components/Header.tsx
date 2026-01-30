"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { ExternalLink } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);

  const openMenu = () => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setResourcesOpen(true);
  };

  const closeMenuWithDelay = () => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = window.setTimeout(() => {
      setResourcesOpen(false);
    }, 120);
  };

  return (
    <header className="bg-white">
      <div className="flex justify-center items-center gap-14 py-6 px-10 text-black">
        <Link href="/" className="hover:text-gray-500">Home</Link>
        <Link href="https://www.ethcatherders.com/about" className="hover:text-gray-500">About</Link>
        <DropdownMenu open={resourcesOpen} onOpenChange={setResourcesOpen} modal={false}>
          <DropdownMenuTrigger
            className="hover:text-gray-500 pb-1 cursor-pointer"
            onMouseEnter={openMenu}
            onMouseLeave={closeMenuWithDelay}
          >
            Resources
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            side="bottom"
            sideOffset={0}
            alignOffset={0}
            avoidCollisions={false}
            onCloseAutoFocus={(event: Event) => event.preventDefault()}
            onMouseEnter={openMenu}
            onMouseLeave={closeMenuWithDelay}
          >
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="https://blog.echinstitute.org" target="_blank" rel="noopener noreferrer">
                <span>Blog</span>
                <ExternalLink className="ml-auto size-4 opacity-70" aria-hidden="true" />
              </Link>
            </DropdownMenuItem>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Podcasts</DropdownMenuLabel>
              <DropdownMenuItem asChild className="cursor-pointer ml-2">
                <Link href="https://www.ethcatherders.com/peepaneip" target="_blank" rel="noopener noreferrer">
                  <span>PEEPanEIP</span>
                  <ExternalLink className="ml-auto size-4 opacity-70" aria-hidden="true" />
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer ml-2">
                <Link href="https://www.youtube.com/playlist?list=PL4cwHXAawZxrhbMXuCqMsCiwx1lwu_cNs" target="_blank" rel="noopener noreferrer">
                  <span>Ecosystem Project Demos</span>
                  <ExternalLink className="ml-auto size-4 opacity-70" aria-hidden="true" />
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer ml-2">
                <Link href="https://www.ethcatherders.com/podcast" target="_blank" rel="noopener noreferrer">
                  <span>All Podcasts</span>
                  <ExternalLink className="ml-auto size-4 opacity-70" aria-hidden="true" />
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/reports/First_Annual_Report_ECH_Institute_Inc.pdf" target="_blank" rel="noopener noreferrer">
                <span>First Annual Report</span>
                <ExternalLink className="ml-auto size-4 opacity-70" aria-hidden="true" />
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Link href="/donate" className="hover:text-gray-500">Donate</Link>
      </div>
    </header>
  );
}
