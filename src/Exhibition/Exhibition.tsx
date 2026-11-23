
import { useEffect, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { X, ArrowUpRight } from "lucide-react";

const categories = [
  "All",
  "Weddings",
  "Events",
  "Portraits",
  "Commercial",
];

const photographs = [
  {
    id: 1,
    title: "Forever Begins",
    category: "Weddings",
    description:
      "Capturing the emotion, beauty, and unforgettable moments of a wedding day.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
    height: "aspect-[4/3]",
  },
  {
    id: 2,
    title: "The Celebration",
    category: "Events",
    description:
      "A collection of genuine moments and celebrations captured through my lens.",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85",
    height: "aspect-[4/3]",
  },
  {
    id: 3,
    title: "Natural Beauty",
    category: "Portraits",
    description:
      "Expressive portraits that reveal personality, character, and individuality.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85",
    height: "aspect-[3/4]",
  },
  {
    id: 4,
    title: "Timeless Details",
    category: "Commercial",
    description:
      "Creative visual storytelling for brands, products, and businesses.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85",
    height: "aspect-[4/3]",
  },
  {
    id: 5,
    title: "Golden Moments",
    category: "Weddings",
    description:
      "The small details and meaningful moments that make every story unique.",
    image:
      "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=85",
    height: "aspect-[3/4]",
  },
  {
    id: 6,
    title: "Behind the Scenes",
    category: "Events",
    description:
      "Unscripted moments and the atmosphere behind every special occasion.",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=85",
    height: "aspect-[4/3]",
  },
  {
    id: 7,
    title: "The Art of Expression",
    category: "Portraits",
    description:
      "A study of light, emotion, and the stories people carry.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=85",
    height: "aspect-[3/4]",
  },
  {
    id: 8,
    title: "Product Stories",
    category: "Commercial",
    description:
      "Making products stand out through thoughtful composition and lighting.",
    image:
      "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=1200&q=85",
    height: "aspect-[4/3]",
  },
];

const galleryVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const photoVariants = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    y: 15,
    scale: 0.97,
    transition: {
      duration: 0.25,
      ease: "easeInOut" as const,
    },
  },
};

export default function Exhibition() {
  const [activeCategory, setActiveCategory] = useState("All");

  const [selectedPhoto, setSelectedPhoto] = useState<
    (typeof photographs)[number] | null
  >(null);

  const filteredPhotos =
    activeCategory === "All"
      ? photographs
      : photographs.filter(
          (photo) => photo.category === activeCategory
        );

  // Close popup with Escape and prevent background scrolling
  useEffect(() => {
    if (!selectedPhoto) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedPhoto(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selectedPhoto]);

  return (
    <MotionConfig reducedMotion="user">
      <section className="min-h-screen bg-bg text-text overflow-hidden">

        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12 lg:py-3">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-center mb-10"
          >
            <p className="font-Kalam text-accent text-lg mb-2">
              A selection of my work
            </p>

            <h1 className="font-Kalam font-bold text-3xl md:text-5xl">
              Photography Portfolio
            </h1>
          </motion.div>

          {/* Category filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.94 }}
                className={`rounded-full border border-accent px-5 py-2 font-Kalam text-base transition-colors duration-300 ${
                  activeCategory === category
                    ? "bg-accent text-white"
                    : "bg-transparent text-text hover:bg-accent hover:text-white"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Masonry portfolio gallery */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={galleryVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="columns-1 sm:columns-2 lg:columns-3 gap-6 lg:gap-8"
            >
              {filteredPhotos.map((photo) => (
                <motion.article
                  key={photo.id}
                  variants={photoVariants}
                  className="mb-6 lg:mb-8 break-inside-avoid"
                >
                  <motion.button
                    type="button"
                    onClick={() => setSelectedPhoto(photo)}
                    aria-label={`View ${photo.title}`}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative block w-full overflow-hidden rounded-xl group cursor-pointer text-left"
                  >
                    {/* Photograph */}
                    <motion.img
                      src={photo.image}
                      alt={photo.title}
                      loading="lazy"
                      whileHover={{ scale: 1.06 }}
                      transition={{
                        duration: 0.7,
                        ease: "easeOut",
                      }}
                      className={`w-full ${photo.height} object-cover`}
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Project information */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">

                      <div>
                        <p className="font-Kalam text-accent text-sm mb-1">
                          {photo.category}
                        </p>

                        <h3 className="font-Kalam text-white text-xl font-bold">
                          {photo.title}
                        </h3>
                      </div>

                      <motion.span
                        whileHover={{ rotate: 45 }}
                        className="w-10 h-10 rounded-full bg-accent text-text flex items-center justify-center shrink-0"
                      >
                        <ArrowUpRight size={20} />
                      </motion.span>

                    </div>
                  </motion.button>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty state */}
          {filteredPhotos.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center font-Kalam text-text/60 py-16"
            >
              No projects found in this category.
            </motion.p>
          )}

        </div>

        {/* Image popup */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              key="image-preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 z-100 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            >
              {/* Close button */}
              <motion.button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close image preview"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                whileHover={{ rotate: 90, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="absolute top-5 right-5 md:top-8 md:right-8 z-20 w-11 h-11 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-accent hover:text-black hover:border-accent transition-colors"
              >
                <X size={22} />
              </motion.button>

              {/* Image only */}
              <motion.div
                onClick={(event) => event.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label={`${selectedPhoto.title} image preview`}
                initial={{ opacity: 0, scale: 0.88, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 15 }}
                transition={{
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="w-full max-w-6xl h-[85vh] flex items-center justify-center"
              >
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </section>
    </MotionConfig>
  );
}
