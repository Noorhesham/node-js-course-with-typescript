import React from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
const Header = ({
  view = true,
  title,
  desc,
  col,
  className,
}: {
  title: string;
  view?: boolean;
  desc: string;
  col?: boolean;
  className?: string;
}) => {
  const { placeId } = useParams();

  return (
    <div>
      <div className={`${col && "flex-col"} ${className && className} flex text-white items-start gap-4 `}>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={` ${className} !w-fit text-6xl special-font font-special`}
        >
          North Coast
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl space-y-4 text-cream/80"
        >
          <p>
            Q Developments was established in 2022 to engrave its signature in the Egyptian market for a lifetime by
            introducing quality homes to the Egyptian society in perfectly planned projects that provide integrated
            services.
          </p>
          <p>
            Q Developments strives to provide affordable quality homes, exceptional experience & highest quality service
            to be presented to the Egyptian culture with a good return on investment.
          </p>{" "}
          {view && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center"
            >
              <Link
                to={`/${placeId}/projects`}
                className="px-8 py-3 bg-white/10 hover:bg-white/20 mr-auto text-white rounded-lg transition-colors"
              >
                View Projects
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Header;
