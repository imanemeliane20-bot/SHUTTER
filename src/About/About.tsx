
import {
  ArrowUpRight,
  Mail,
  Phone,
} from "lucide-react";

import { motion, MotionConfig } from "motion/react";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
    },
  },
};

export default function About() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="min-h-screen bg-bg text-text overflow-hidden">

        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-10 lg:py-8 pr-1">

          {/* PAGE TITLE */}
          <motion.div
            className="mb-8 lg:mb-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={fadeUp}
              className="font-Kalam text-4xl lg:text-5xl text-accent font-bold"
            >
              About Me
            </motion.h1>

            <motion.h2
              variants={fadeUp}
              className="font-Kalam text-2xl lg:text-3xl text-text mt-3"
            >
              The person behind the lens.
            </motion.h2>
          </motion.div>

          {/* MAIN CONTENT */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-3 items-start">

            {/* LEFT: STORY */}
            <motion.div
              className="font-Kalam text-base lg:text-normal leading-7 lg:leading-8 text-text/80 space-y-5"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.15,
              }}
            >

              <motion.p variants={fadeUp}>
                Photography is more than capturing what we see.
                It's about preserving emotions, telling stories and
                finding beauty in the moments that might otherwise
                pass unnoticed.
              </motion.p>

              <motion.p variants={fadeUp}>
                My approach to photography is built around creativity,
                attention to detail and a genuine interest in the stories
                behind every person, place and occasion.
              </motion.p>

              <motion.p variants={fadeUp}>
                From intimate portraits and beautiful weddings to
                lively events and commercial projects, I aim to create
                images that feel authentic, meaningful and timeless.
              </motion.p>

              <motion.p variants={fadeUp}>
                Every project has its own personality. I take the time
                to understand the vision, explore different perspectives
                and bring together the details that make each photograph
                unique.
              </motion.p>

              <motion.p variants={fadeUp}>
                For me, the best photographs are not simply images.
                They are memories, emotions and stories worth returning
                to.
              </motion.p>

              <motion.p variants={fadeUp}>
                Have an idea, a project or a story you'd like to capture?
                I'd love to hear about it and explore what we can create
                together.
              </motion.p>

            </motion.div>

            {/* RIGHT: PORTRAIT */}
            <motion.div
              className="relative w-full -mt-18"
              initial={{
                opacity: 0,
                x: 45,
                scale: 0.96,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.img
                src="/About-portrait.jpg"
                alt="Portrait of the photographer"
                className="relative z-10 w-full aspect-4/5 object-cover"
                whileHover={{
                  scale: 1.025,
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                }}
              />
            </motion.div>

          </div>

          {/* CONTACT INFORMATION */}
          <motion.div
            className="mt-20 lg:mt-28 pt-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.3,
            }}
          >

            <div className="flex flex-col lg:flex-row items-center justify-center gap-7 lg:gap-14">

              {/* EMAIL */}
              <motion.a
                href="/contact"
                variants={fadeUp}
                whileHover={{
                  y: -4,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                className="flex items-center gap-3 text-sm hover:text-accent transition-colors"
              >
                <Mail size={19} />
                <span className="font-Montserrat">Get in touch</span>
                <ArrowUpRight size={15} />
              </motion.a>

              {/* PHONE */}
              <motion.a
                href="/contact"
                variants={fadeUp}
                whileHover={{
                  y: -4,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                className="flex items-center gap-3 text-sm hover:text-accent transition-colors"
              >
                <Phone size={19} />
                <span className="font-Montserrat">Contact me</span>
                <ArrowUpRight size={15} />
              </motion.a>

              {/* SOCIAL LINKS */}
              <motion.div
                variants={fadeUp}
                className="flex items-center gap-6"
              >

                <motion.a
                  href="#"
                  aria-label="Instagram"
                  whileHover={{
                    y: -4,
                    scale: 1.1,
                  }}
                  className="hover:text-accent transition-colors"
                >
                </motion.a>

                <motion.a
                  href="#"
                  aria-label="LinkedIn"
                  whileHover={{
                    y: -4,
                    scale: 1.1,
                  }}
                  className="hover:text-accent transition-colors"
                >
                </motion.a>

              </motion.div>

            </div>
          </motion.div>

        </div>
      </section>
    </MotionConfig>
  );
}
