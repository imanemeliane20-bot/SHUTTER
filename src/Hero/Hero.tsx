
import { motion, MotionConfig } from "motion/react";
import { Link } from "react-router-dom";
import { WandSparkles } from "lucide-react";

import FAQSection from "../components/FAQSection";
import Testimonials from "./Testimonials";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 1.08,
      y: 30,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const scrollVariants = {
    hidden: {
      opacity: 0,
      y: 35,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <MotionConfig reducedMotion="user">
      <main
        id="photography"
        className="relative min-h-screen overflow-hidden px-6 pb-6 pt-8 text-text md:px-12"
      >

        {/* HERO GRID */}
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-10 lg:grid-cols-[minmax(300px,0.85fr)_minmax(0,1.5fr)] lg:gap-16">

          {/* LEFT SIDE */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative flex flex-col pl-10 md:pl-14 lg:pl-16"
          >

            {/* Vertical branding */}
            <motion.div
              variants={itemVariants}
              className="absolute left-0 top-0 flex flex-col items-center gap-3"
            >
              <span className="text-xl font-Kalam font-bold">
                //
              </span>

              <span
                className="font-Kalam text-xl font-bold uppercase"
                style={{ writingMode: "vertical-rl" }}
              >
                Shutter
              </span>
            </motion.div>

            {/* Main photograph */}
            <motion.div
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              className="mt-5 overflow-hidden rounded-2xl lg:h-145"
            >
              <motion.img
                src="/images/person_in_orange.png"
                alt="Photographer capturing a moment"
                className="h-full w-full object-cover"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </motion.div>

            {/* Vertical indicators */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex items-center gap-2 lg:absolute lg:left-2 lg:bottom-13 lg:mt-0 lg:flex-col"
            >
              {[1, 2, 3, 4].map((item, index) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 1 + index * 0.15,
                    duration: 0.4,
                  }}
                  className={`rounded-full ${
                    index === 0
                      ? "h-2 w-2 bg-black"
                      : "h-1.5 w-1.5 bg-black/60"
                  }`}
                />
              ))}
            </motion.div>

            {/* Decorative icon */}
            <motion.div
              animate={{
                rotate: [0, 15, -15, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mt-5 flex justify-end text-accent lg:absolute lg:left-0 lg:bottom-2"
            >
              <WandSparkles size={25} />
            </motion.div>

          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-between py-2"
          >

            {/* Main heading */}
            <div>

              <motion.h1
                variants={itemVariants}
                className="font-Kalam text-4xl sm:text-5xl lg:text-7xl font-bold uppercase leading-tight lg:leading-normal"
              >
                <span className="block">
                  Expressing Emotions
                </span>

                <span className="block">
                  Capturing Souls
                </span>
              </motion.h1>

              {/* CTA and introduction */}
              <motion.div
                variants={itemVariants}
                className="mt-8 lg:mt-10 flex flex-col gap-7 sm:flex-row sm:items-center lg:gap-25"
              >

                <Link
                  to="/contact"
                  className="inline-flex w-fit items-center gap-4 rounded-lg bg-accent px-8 py-4 font-Kalam text-lg font-bold text-white transition-colors hover:bg-accent/90"
                >
                  <motion.span
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    Get In Touch
                  </motion.span>
                </Link>

                <p className="max-w-75 font-Kalam text-xl leading-7">
                  Every frame tells a story, feeling, moments that live forever.
                </p>

              </motion.div>
            </div>

            {/* About block */}
            <motion.div
              id="about"
              variants={itemVariants}
              className="mt-12 flex flex-col gap-5 sm:flex-row sm:gap-10 lg:mt-1"
            >

              <h2 className="mb-4 inline-flex font-Kalam text-3xl font-bold uppercase text-accent">
                About
              </h2>

              <div>
                <p className="max-w-md font-Kalam text-xl leading-8 text-text">
                  With 4 years of experience behind the camera, I focus on capturing genuine emotions, beautiful details, and meaningful moments.
                </p>

                <Link
                  to="/about"
                  className="mt-6 inline-flex items-center gap-3 font-display text-sm font-bold uppercase transition-colors hover:text-accent"
                >
                  Discover More

                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    →
                  </motion.span>
                </Link>
              </div>

            </motion.div>

          </motion.div>
        </div>

        {/* BOTTOM NAVIGATION */}
        <motion.footer
          variants={scrollVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mx-auto mt-16 flex max-w-[1600px] items-center justify-between border-b border-browny/30 pb-3"
        >
          <a
            href="#photography"
            className="font-display text-xl font-bold uppercase transition-colors hover:text-accent"
          >
            Photography
          </a>
        </motion.footer>

        {/* TESTIMONIALS LINK */}
        <motion.a
          href="#testimonials"
          variants={scrollVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-5 flex justify-end font-display text-xl font-bold uppercase transition-colors hover:text-accent"
        >
          Testimonials
        </motion.a>

        {/* TESTIMONIALS */}
        <motion.div
          variants={scrollVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <Testimonials />
        </motion.div>

        {/* FAQ */}
        <motion.div
          variants={scrollVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <FAQSection />
        </motion.div>

      </main>
    </MotionConfig>
  );
};

export default Hero;
