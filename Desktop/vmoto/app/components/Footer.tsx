"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import MaxWidthWrapper from "./MaxWidthWrapper";

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

const footerLinks = {
  Vehicles: [{ name: "Full-range Vehicles", href: "#" }],
  Company: [
    { name: "Store Locator", href: "#" },
    { name: "Become a dealer", href: "#" },
    { name: "Investor Centre", href: "#" },
  ],
  Services: [
    { name: "Manuals", href: "#" },
    { name: "Warranty", href: "#" },
    { name: "RMI", href: "#" },
    { name: "Content Portal", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-black relative mt-20 text-white">
      {/* Newsletter Section */}
      <div className="  -mt-4 ">
        <MaxWidthWrapper className="bg-cyan-200 lg:flex-row flex-col gap-4  absolute -top-24 left-1/2 -translate-x-1/2    z-40 flex items-center justify-between">
          <h3 className="special text-xl font-light tracking-[0.2em] text-black">JOIN THE VMOTO NEWSLETTER</h3>
          <div className="flex flex-col w-full items-start gap-4">
            <div className="flex gap-2 items-center">
              <input type="email" placeholder="Email" className="rounded-md border border-gray-300 px-4 py-2" />
              <button className="rounded-md bg-black px-6 py-2 text-white">SIGN UP</button>
            </div>
            <label className="flex items-center gap-2 text-sm text-black">
              <input type="checkbox" className="rounded border-gray-300" />I accept the Privacy Policy
            </label>
          </div>
        </MaxWidthWrapper>
      </div>

      {/* Main Footer */}
      <MaxWidthWrapper className="py-16 !pt-32">
        <div className="flex items-start justify-between">
          {/* Logos */}
          <div className="flex flex-col gap-8">
            <Image src="/logo.png" alt="VMOTO" width={150} height={50} />
            {/* Social Links */}
            <div className="flex  gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="rounded-sm bg-black p-2 text-cyan-400 transition-colors hover:bg-cyan-400 hover:text-black"
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Logo */}
          <Image src="/footer1.svg" alt="Ducati" width={150} height={50} className=" hidden lg:block" />
        </div>

        {/* Links Grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-2 font-semibold text-lg text-cyan-400">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-400 transition-colors hover:text-white">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        <Image src="/footer1.svg" alt="Ducati" width={150} height={50} className=" ml-auto block lg:hidden" />
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-wrap gap-3 items-center justify-between border-t border-gray-800 pt-8 text-sm text-gray-400">
          <p>© 2025 Vmoto Limited - All rights reserved</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white">
              Cookie Policy
            </Link>
            <span>•</span>
            <Link href="#" className="hover:text-white">
              Privacy Policy
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}
