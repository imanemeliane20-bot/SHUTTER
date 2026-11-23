
import { ArrowUpRight } from "lucide-react";
import { motion, MotionConfig } from "motion/react";

const processSteps = [
  {
    number: "I.",
    title: "BOOK THE DATE.",
    description:
      "We begin with a one-on-one consultation to design a session that reflects your unique personality and vision. From selecting stunning locations to wardrobe styling and professional beauty recommendations, every detail is carefully planned to create a high-end experience.",
  },
  {
    number: "II.",
    title: "TAKE PHOTOS.",
    description:
      "Step into the spotlight with a luxury photoshoot designed to make you feel like royalty. With expert posing guidance, cinematic lighting, and breathtaking backdrops, we transform your moments into epic, magazine-worthy portraits.",
  },
  {
    number: "III.",
    title: "DELIVER MEMORIES.",
    description:
      "Experience the magic of your portraits in a VIP image reveal session, where your best moments are showcased in a cinematic presentation. Choose from luxury handcrafted albums, custom wall art, and premium keepsakes to preserve your memories in the most elegant way.",
  },
];

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
      staggerChildren: 0.18,
    },
  },
};

export default function Contact() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="bg-bg text-text overflow-hidden">

        <div className="max-w-[1600px] mx-auto px-6 lg:px-25 lg:mr-30 py-12 lg:py-16">

          {/* MAIN CONTACT LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-[0.55fr_1.45fr] gap-12 lg:gap-10 items-center">

            {/* LEFT: CONTACT INFORMATION */}
            <motion.div
              className="flex flex-col items-center justify-center"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >

              <motion.h1
                variants={fadeUp}
                className="font-Kalam text-3xl lg:text-5xl text-accent font-bold mb-8 lg:mb-14"
              >
                Contact
              </motion.h1>

              <motion.div
                className="flex flex-col gap-8"
                variants={staggerContainer}
              >

                {/* EMAIL */}
                <motion.a
                  href="mailto:your@email.com"
                  variants={fadeUp}
                  whileHover={{
                    x: 6,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="group flex font-Kalam items-center gap-3 text-lg lg:text-xl hover:text-accent transition-colors"
                >
                  <span className="underline underline-offset-4">
                    your@email.com
                  </span>

                  <ArrowUpRight
                    size={18}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </motion.a>

                {/* PHONE */}
                <motion.a
                  href="tel:+000000000000"
                  variants={fadeUp}
                  whileHover={{
                    x: 6,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="group flex items-center gap-3 font-Kalam text-lg lg:text-xl hover:text-accent transition-colors"
                >
                  +00 000 000 000

                  <ArrowUpRight
                    size={18}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </motion.a>

                {/* SOCIAL LINKS */}
                <motion.div
                  variants={fadeUp}
                  className="flex items-center gap-6 mt-2"
                >

                  <motion.a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    whileHover={{
                      y: -5,
                      scale: 1.1,
                    }}
                    whileTap={{
                      scale: 0.9,
                    }}
                    className="hover:text-accent transition-colors"
                  >
                  </motion.a>

                  <motion.a
                    href="https://www.linkedin.com/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    whileHover={{
                      y: -5,
                      scale: 1.1,
                    }}
                    whileTap={{
                      scale: 0.9,
                    }}
                    className="hover:text-accent transition-colors"
                  >
                  </motion.a>

                </motion.div>

              </motion.div>
            </motion.div>

            {/* RIGHT: THREE PROCESS CARDS */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-5"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
            >

              {processSteps.map((step) => (
                <motion.article
                  key={step.number}
                  variants={fadeUp}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                  className="bg-secondary rounded-2xl p-5 lg:p-6 flex flex-col min-h-76"
                >

                  {/* NUMBER AND TITLE */}
                  <h2 className="font-Kalam text-lg font-bold text-accent tracking-wider mb-4">
                    {step.number} {step.title}
                  </h2>

                  {/* DESCRIPTION */}
                  <p className="font-Kalam text-text/70 text-sm font-semibold leading-7">
                    {step.description}
                  </p>

                </motion.article>
              ))}

            </motion.div>

          </div>

          {/* BOTTOM MESSAGE */}
          <motion.div
            className="mt-14 flex justify-center"
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.5,
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="font-Kalam text-lg lg:text-xl text-text font-bold text-center">
              Have a project in mind? Let's make it happen.
            </p>
          </motion.div>

        </div>
      </section>
    </MotionConfig>
  );
}
