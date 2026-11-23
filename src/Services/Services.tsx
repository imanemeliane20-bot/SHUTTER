
import { ArrowUpRight, Camera, Heart, Briefcase, User } from "lucide-react";
import { motion, MotionConfig } from "motion/react";

const services = [
  {
    number: "01",
    title: "Wedding Photography",
    description: {
      1: "Wedding photography for intimate ceremonies, grand celebrations and everything in between, with coverage focused on the people, details and moments that make your day unique.",
      2: "From the preparations and ceremony to the celebrations, every part of your story is captured with care and attention to detail.",
      3: "Tell me your wedding date, venue and the style of photography you have in mind. Let's plan how to capture your day.",
    },
    image: "/wedding.jpg",
    icon: Heart,
    reverse: false,
  },
  {
    number: "02",
    title: "Event Photography",
    description: {
      1: "Need professional coverage for your event? I plan each shoot around your event's key moments, people and atmosphere.",
      2: "From corporate conferences to private celebrations, I capture the important details and candid moments.",
      3: "I capture the important details and candid moments, delivering a polished collection of photographs that tells the story of your event.",
    },
    image: "/event moment.jpg",
    icon: Camera,
    reverse: true,
  },
  {
    number: "03",
    title: "Portrait Photography",
    description: {
      1: "Want portraits that feel natural and true to who you are? Each session is tailored to your personality, style and the look you're aiming for.",
      2: "From individual portraits to professional headshots and creative studio sessions, I focus on natural expressions, flattering lighting and carefully composed images.",
      3: "",
    },
    image: "/portrait.jpg",
    icon: User,
    reverse: false,
  },
  {
    number: "04",
    title: "Commercial Photography",
    description: {
      1: "Every brand has a story worth showing. I create distinctive commercial photographs that bring your products, identity and creative vision into focus.",
      2: "From striking product shots and lifestyle imagery to campaign visuals and brand storytelling, each image is",
      3: "crafted to make your business stand out and leave a lasting impression.",
    },
    image: "/watch in white bg.jpg",
    icon: Briefcase,
    reverse: true,
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
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

const fadeIn = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: "easeOut" as const,
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

export default function Services() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="min-h-screen bg-cream text-text overflow-hidden">

        {/* HERO SECTION */}
        <div className="relative bg-cream text-text overflow-hidden">

          <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-10 md:py-10 bg-secondary mb-5">

            {/* MAIN HERO GRID */}
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-12 items-center"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >

              {/* LEFT - MAIN HEADLINE */}
              <motion.div
                className="relative z-10"
                variants={staggerContainer}
              >

                <motion.p
                  variants={fadeUp}
                  className="font-Kalam text-accent text-md lg:text-lg font-bold tracking-[0.25em] uppercase mb-6"
                >
                  Photography & Visual Services
                </motion.p>

                <motion.h1
                  variants={fadeUp}
                  className="font-Kalam text-xl lg:text-4xl mb-2 font-black uppercase leading-[1.15] tracking-[-0.045em]"
                >
                  Some moments happen once,
                  <br />
                  <span className="text-accent">
                    Their stories last forever,
                  </span>
                  <br />
                  Your vision is our focus.
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  className="font-Kalam lg:text-lg"
                >
                  From intimate portraits and beautiful weddings to lively
                  events, lifestyle sessions and commercial photography, we
                  capture the moments, people and stories that matter. Every
                  project is approached with creativity, attention to detail
                  and a personal touch, turning your ideas into images you'll
                  want to keep forever.
                </motion.p>

              </motion.div>

              {/* RIGHT - CAMERA VISUAL */}
              <motion.div
                className="relative flex items-center justify-center min-h-63 md:min-h-85"
                variants={fadeIn}
              >

                <motion.div
                  className="absolute w-56 h-56 md:w-72 md:h-72 rounded-full bg-accent/10 blur-3xl"
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <motion.img
                  src="/camera.png"
                  alt="Professional camera"
                  className="relative z-10 w-full max-w-85 aspect-square object-cover mix-blend-multiply rounded-full"
                  animate={{
                    y: [0, -12, 0],
                    rotate: [0, 2, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

              </motion.div>

            </motion.div>
          </div>
        </div>

        {/* SERVICES SECTION */}
        <div className="min-h-screen max-w-8xl mt-3 mx-auto px-6 lg:px-12 pb-24">

          <div className="space-y-4 lg:space-y-15">

            {services.map((service) => {
              return (
                <motion.article
                  key={service.number}
                  className={`grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-24 items-center ${
                    service.reverse
                      ? "md:[&>*:first-child]:order-2"
                      : ""
                  }`}
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                >

                  {/* IMAGE */}
                  <motion.div
                    className="relative group overflow-hidden"
                    variants={fadeIn}
                  >

                    <motion.img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-70 lg:h-85 object-cover"
                      loading="lazy"
                      whileHover={{
                        scale: 1.05,
                      }}
                      transition={{
                        duration: 0.6,
                        ease: "easeOut",
                      }}
                    />

                  </motion.div>

                  {/* TEXT */}
                  <motion.div variants={fadeUp}>

                    <h3 className="font-Kalam text-4xl lg:text-4xl text-accent font-bold leading-tight mb-3">
                      {service.title}
                    </h3>

                    <div className="font-Kalam text-lg leading-8 text-text/75 space-y-3">

                      <p>{service.description[1]}</p>

                      <p>{service.description[2]}</p>

                      {service.description[3] && (
                        <p>{service.description[3]}</p>
                      )}

                    </div>

                  </motion.div>

                </motion.article>
              );
            })}

          </div>
        </div>

        {/* CREATIVE FINAL SECTION */}
        <div className="bg-secondary text-text px-5 py-1 pt-3 lg:pt-5 lg:py-0 overflow-hidden">

          <div className="max-w-7xl mx-auto">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              {/* LEFT COLUMN */}
              <motion.div
                className="md:col-span-3 flex flex-col gap-5"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
              >

                <motion.div
                  variants={fadeUp}
                  className="bg-[#f1ddc9] p-5 rounded-xl"
                >

                  <h3 className="font-Kalam text-xl font-black uppercase leading-tight mb-5">
                    Harnessing light,
                    <br />
                    capturing memories.
                  </h3>

                  <motion.img
                    src="/camera2.png"
                    alt="Event photography camera"
                    className="w-full h-64 object-cover rounded-lg"
                    whileHover={{
                      scale: 1.04,
                    }}
                    transition={{
                      duration: 0.5,
                    }}
                  />

                </motion.div>

                <motion.h3
                  variants={fadeUp}
                  className="font-Kalam text-xl font-black uppercase leading-tight"
                >
                  Elevating moments
                  <br />
                  <span className="text-accent">
                    into masterpieces.
                  </span>
                </motion.h3>

              </motion.div>

              {/* MIDDLE COLUMN */}
              <motion.div
                className="md:col-span-4 flex flex-col gap-8"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
              >

                <motion.div
                  variants={fadeUp}
                  className="pt-3"
                >

                  <h1 className="font-Kalam text-2xl font-extrabold leading-7 text-text mb-2">
                    Got Something Different in Mind?
                  </h1>

                  <p className="font-Kalam text-lg leading-7 text-text">
                    If you have an idea that doesn't quite fit the services
                    above. I'm always open to hearing about new projects and
                    finding a way to make them happen.
                  </p>

                  <br />

                  <p className="font-Kalam text-lg leading-7 text-text">
                    Whether it's something small or something ambitious,
                    let's have a conversation and see where it goes.
                  </p>

                  <a
                    href="/exhibition"
                    className="inline-flex items-center gap-2 mt-4 font-Montserrat text-sm font-bold border-b border-accent pb-1 hover:text-accent"
                  >
                    See our projects <ArrowUpRight size={16} />
                  </a>

                </motion.div>

                <motion.div
                  variants={fadeUp}
                  className="bg-white p-4 mb-5 rounded-xl shadow-md rotate-3 hover:rotate-0 transition-transform duration-500"
                >

                  <motion.img
                    src="/camera4.png"
                    alt="A camera"
                    className="w-full h-40 object-contain rounded-lg"
                    whileHover={{
                      scale: 1.06,
                    }}
                    transition={{
                      duration: 0.5,
                    }}
                  />

                  <p className="font-Kalam text-xl text-center mt-4 text-text">
                    Your memories that will last a lifetime.
                  </p>

                </motion.div>

              </motion.div>

              {/* RIGHT COLUMN */}
              <motion.div
                className="lg:col-span-5 relative min-h-130 overflow-hidden flex flex-col"
                initial={{
                  opacity: 0,
                  x: 40,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >

                {/* TEXT AND BUTTON */}
                <div className="relative z-10 p-4 mt-10 flex flex-col items-center justify-center text-center group">

                  {/* DECORATIVE ACCENT */}
                  <motion.div
                    className="flex items-center gap-2 mb-4"
                    initial={{
                      opacity: 0,
                      scale: 0.7,
                    }}
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.7,
                    }}
                  >
                    <span className="w-8 h-0.5 bg-accent"></span>

                    <motion.span
                      className="w-2 h-2 rounded-full bg-accent"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [1, 0.5, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />

                    <span className="w-8 h-0.5 bg-accent"></span>
                  </motion.div>

                  {/* HEADING */}
                  <motion.p
                    className="font-Kalam text-2xl md:text-3xl leading-snug font-bold"
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.7,
                      delay: 0.15,
                    }}
                  >
                    Have a story worth
                    <span className="block text-accent italic">
                      capturing?
                    </span>
                  </motion.p>

                  {/* BUTTON */}
                  <motion.a
                    href="/contact"
                    className="group/btn inline-flex items-center gap-3 mt-6 px-6 py-3 bg-accent text-white text-xs uppercase tracking-wider font-bold rounded-sm shadow-md hover:bg-accent/90 hover:shadow-xl transition-all duration-300"
                    whileHover={{
                      y: -5,
                      scale: 1.03,
                    }}
                    whileTap={{
                      scale: 0.96,
                    }}
                  >
                    Let's talk

                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1"
                    />
                  </motion.a>

                </div>

                {/* IMAGE AT THE BOTTOM */}
                <motion.img
                  src="/camera_with_holder.png"
                  alt="Camera with holder"
                  className="absolute -bottom-6 left-0 w-full h-120 object-contain object-bottom block"
                  initial={{
                    opacity: 0,
                    y: 50,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.3,
                    ease: "easeOut",
                  }}
                />

              </motion.div>

            </div>
          </div>
        </div>

      </section>
    </MotionConfig>
  );
}
