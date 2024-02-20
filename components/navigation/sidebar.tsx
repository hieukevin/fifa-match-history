"use client";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import HamburgerMenu, { path01Variants, path02Variants } from "./hamburgerMenu";

const links = [
  { name: "Home", to: "/", id: 1 },
  { name: "Match history", to: "/match-history", id: 2 },
  { name: "About", to: "/about", id: 3 },
  { name: "Admin", to: "/admin", id: 4 },
];

const itemVariants = {
  closed: {
    opacity: 0,
  },
  open: { opacity: 1 },
};

const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1,
    },
  },
};

const menuVariant = {
  open: {
    width: "300px",
    height: "280px",
  },

  closed: {
    width: 10,
    height: 10,
    left: 10,
    top: 15,
    opacity: 0,
    transition: {
      duration: 0.55,
      delay: 0.35,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const path01Controls = useAnimation();
  const path02Controls = useAnimation();
  return (
    <main>
      {/* TODO: pathcontrol put into component */}
      <HamburgerMenu
        isOpen={open}
        setOpen={setOpen}
        className="fixed z-30 p-2"
        path01Controls={path01Controls}
        path02Controls={path02Controls}
      />
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed w-screen h-screen bg-black z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0, transition: { duration: 0.9 } }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.aside
            className=" fixed bg-white text-black  z-20 rounded-lg inset-0"
            initial={{ width: 40, height: 40 }}
            variants={menuVariant}
            animate="open"
            exit="closed"
          >
            <motion.div
              className="mx-16 my-6 flex flex-col"
              variants={sideVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {links.map(({ name, to, id }) => (
                <motion.div
                  variants={itemVariants}
                  className="my-4"
                  whileHover={{ scale: 1.1 }}
                >
                  <Link
                    key={id}
                    href={to}
                    prefetch
                    className={`link ${pathname === to ? "text-blue-500" : ""}`}
                    onClick={async () => {
                      setOpen(false);
                      path01Controls.start(path01Variants.closed);
                      await path02Controls.start(path02Variants.moving);
                      path02Controls.start(path02Variants.closed);
                    }}
                  >
                    {name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </main>
  );
}
