"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, MapPin, Menu } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Image from "next/image";
import useIsMobile from "../hooks/useIsMobile";

const vehicles = [
  {
    title: "Electric Motorcycles",
    href: "/vehicles/motorcycles",
    description: "High-performance electric motorcycles for the modern rider.",
  },
  {
    title: "Electric Scooters",
    href: "/vehicles/scooters",
    description: "Efficient and stylish electric scooters for urban mobility.",
  },
  {
    title: "Commercial Vehicles",
    href: "/vehicles/commercial",
    description: "Sustainable electric solutions for business operations.",
  },
];

const business = [
  {
    title: "Fleet Solutions",
    href: "/business/fleet",
    description: "Electric vehicle fleet management for businesses.",
  },
  {
    title: "Dealerships",
    href: "/business/dealerships",
    description: "Join our growing network of VMOTO dealerships.",
  },
];

const discover = [
  {
    title: "Technology",
    href: "/discover/technology",
    description: "Explore our cutting-edge electric vehicle technology.",
  },
  {
    title: "Sustainability",
    href: "/discover/sustainability",
    description: "Our commitment to a sustainable future.",
  },
];

export function MainNav() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();
  const [isScrolling, setIsScrolling] = React.useState(false);
  const [lastScrollPosition, setLastScrollPosition] = React.useState(0);
  const isMobile = useIsMobile();
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(lastScrollPosition < window.scrollY);
      setLastScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollPosition]);
  return (
    <header
      className={`  ${
        isScrolling ? "-translate-y-24" : "translate-y-0"
      } fixed left-1/2 transition-all -translate-x-1/2 dark top-10 z-50  max-w-7xl mx-auto w-full bg-black/90 rounded-lg backdrop-blur-sm`}
    >
      <div className="container flex h-20 justify-between items-center px-4">
        <Link href="/" className=" w-44 h-44 relative">
          <Image fill src="/logo.png" className="object-contain" alt="VMOTO" />
        </Link>

        {/* Desktop Navigation */}
        <div className="flex items-center">
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Vehicles</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="flex flex-col items-start text-white w-[400px] gap-3 p-4 md:w-[500px] ">
                    {vehicles.map((item) => (
                      <ListItem key={item.title} title={item.title} href={item.href}>
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Business</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="flex flex-col items-start text-white w-[400px] gap-3 p-4 md:w-[500px] ">
                    {business.map((item) => (
                      <ListItem key={item.title} title={item.title} href={item.href}>
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Discover</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="flex flex-col items-start text-white w-[400px] gap-3 p-4 md:w-[500px] ">
                    {discover.map((item) => (
                      <ListItem key={item.title} title={item.title} href={item.href}>
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/partnership" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Partnership & Testimonials
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contacts" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Contacts</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex  flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="text-white">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Language</span>
              </Button>
              <Button variant="ghost" size="icon" className="text-white">
                <MapPin className="h-5 w-5" />
                <span className="sr-only">Location</span>
              </Button>
            </nav>

            {/* Mobile Navigation */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full bg-black/95 text-white">
                <nav className="flex flex-col space-y-4">
                  <Link
                    href="/vehicles"
                    className="text-lg font-medium hover:text-gray-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Vehicles
                  </Link>
                  <Link
                    href="/business"
                    className="text-lg font-medium hover:text-gray-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Business
                  </Link>
                  <Link
                    href="/discover"
                    className="text-lg font-medium hover:text-gray-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Discover
                  </Link>
                  <Link
                    href="/partnership"
                    className="text-lg font-medium hover:text-gray-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Partnership & Testimonials
                  </Link>
                  <Link
                    href="/contacts"
                    className="text-lg font-medium hover:text-gray-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Contacts
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li className="w-full">
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none  space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
