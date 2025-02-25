"use client";

import { motion } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { useEffect, useState } from "react";
import { useNav } from "@/context/NavContext";

const Slide4 = () => {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  const team = [
    {
      name: "Eng. Samy Abdelrahim",
      role: "Board Member of Q Developments",
      image: "/Rectangle 7 (3).png",
      details: `• Over 15 years of experience in real estate development, construction and business management.
      • Graduated as a Civil Engineer.
      • Proven track record in managing and executing large-scale projects with total investments exceeding EGP 2B.
      • Built the reputation of a trusted expert in Real Estate development and construction.
      • Extensive knowledge in project planning and execution.`,
    },
    {
      name: "Eng. Mohamed Gaber",
      role: "Board Member of Q Developments",
      image: "/Rectangle 7 (2).png",
      details: `• Over 15 years of experience in real estate development and project management.
      • Civil Engineering background with extensive expertise.
      • Successfully managed projects worth over EGP 1.5B.
      • Known for innovative solutions and strategic planning.`,
    },
    {
      name: "Eng. Abdullah Ahmed",
      role: "Board Member of Q Developments",
      image: "/Rectangle 7 (3).png",
      details: `• 12+ years in real estate and construction management.
      • Architectural engineering expertise.
      • Led projects valued at EGP 2B+.
      • Specializes in sustainable development practices.`,
    },
  ];
  const { setTitle } = useNav();
  useEffect(() => {
    setTitle("Board Members");
  }, []);
  return (
    <div className="relative min-h-screen bg-[#003B5C] overflow-hidden">
      <MaxWidthWrapper className="text-white z-30 relative">
        <div className="pt-24 pb-16">
          <div className="grid grid-cols-3 gap-8 mt-16">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative"
                onMouseEnter={() => setHoveredMember(index)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <div className="relative aspect-square rounded-[32px] overflow-hidden bg-white/5 backdrop-blur-sm">
                  <motion.img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    animate={hoveredMember === index ? { opacity: 0.1 } : { opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Info Overlay - Always visible */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <p className="text-sm text-cream/80">{member.role}</p>
                  </div>

                  {/* Details Overlay - Visible on hover */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={hoveredMember === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-[#003B5C]/95 p-6 rounded-[32px]"
                  >
                    <div className="flex items-center gap-2 mb-6">
                      <img src="/Vector (8).png" alt="Q" className="w-8 h-8" />
                      <div>
                        <h3 className="text-lg font-semibold">{member.name}</h3>
                        <p className="text-sm text-cream/80">{member.role}</p>
                      </div>
                    </div>
                    <div className="text-sm text-cream/90 space-y-4">
                      {member.details.split("\n").map((detail, i) => (
                        <p key={i} className="leading-relaxed pl-4 relative">
                          <span className="absolute left-0">•</span>
                          {detail.trim()}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Slide4;
