"use client";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import Image from "next/image";
import { InferSchemaType } from "mongoose";
import { teamStats } from "@/models/models";

const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: 1,
    },
  },
};

const itemVariants = {
  closed: {
    opacity: 0,
  },
  open: { opacity: 1 },
};

export function DropdownStatsLeft({
  teamsStats,
}: {
  teamsStats: InferSchemaType<typeof teamStats>[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="z-0 mt-10 ml-4 flex flex-col gap-4 overflow-scroll max-h-screen">
      <div className="grid grid-cols-3 gap-4">
        <button onClick={toggleOpen}>
          <IoIosArrowDown className="" />
        </button>
        {isOpen && <p className="flex items-center justify-center ">W/D/L</p>}
        {isOpen && <p className="flex items-center justify-center">Goals</p>}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="flex flex-col gap-4"
            initial="closed"
            animate="open"
            exit="closed"
            variants={sideVariants}
          >
            {teamsStats.map((team, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="grid grid-cols-3"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <Image
                    src={`/logos/${team.team}.png`}
                    alt={team.team}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <p className="flex items-center justify-center">
                  <span className=" text-green-400">{team.wins}</span>/
                  {team.draws}/
                  <span className=" text-red-400">{team.losses}</span>
                </p>
                <p className="flex items-center justify-center">
                  <span className="">{team.goalsScored}</span>:
                  <span className="">{team.goalsConcede}</span>
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
