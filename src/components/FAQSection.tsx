
import { useState } from "react";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { blogPosts } from "../Data/blogPosts";
import { Link } from "react-router-dom";

const faqCategories = ["General", "Booking", "Delivery & Pricing"];

const faqData: Record<string, { question: string; answer: string }[]> = {
  General: [
    {
      question: "What types of photography do you offer?",
      answer:
        "I offer portrait, wedding, event, lifestyle and commercial photography, with each session tailored to your needs.",
    },
    {
      question: "Where are you based, and do you travel?",
      answer:
        "I'm based in [Your City] and available for photography sessions in surrounding areas and selected destinations.",
    },
    {
      question: "What is your photography style?",
      answer:
        "My approach combines natural moments, creative composition and attention to detail to create authentic images.",
    },
    {
      question: "What camera and equipment do you use?",
      answer:
        "I work with professional cameras, lenses and lighting equipment to achieve high-quality results in different shooting conditions.",
    },
  ],
  Booking: [
    {
      question: "How can I book a photography session?",
      answer:
        "You can contact me through the contact form or WhatsApp. We'll discuss your project and find a suitable date.",
    },
    {
      question: "How far in advance should I book?",
      answer:
        "For weddings and major events, booking several weeks or months ahead is recommended. For smaller sessions, availability may be more flexible.",
    },
    {
      question: "Can I request a specific location?",
      answer:
        "Absolutely. We can discuss your preferred location and choose a setting that suits the style of your photos.",
    },
  ],
  "Delivery & Pricing": [
    {
      question: "How much does a photography session cost?",
      answer:
        "Pricing depends on the type of session, duration, location and deliverables. Contact me for a personalized quote.",
    },
    {
      question: "How long does photo delivery take?",
      answer:
        "Delivery time depends on the project. I'll provide an estimated timeline when we confirm your booking.",
    },
    {
      question: "How will I receive my photographs?",
      answer:
        "Your edited photographs will be delivered through a private online gallery where you can view and download them.",
    },
  ],
};

const FAQSection = () => {
  const [activeCategory, setActiveCategory] = useState("General");
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const questions = faqData[activeCategory];

  return (
    <section
      id="FAQ"
      className="bg-cream px-6 py-2 md:px-12 lg:py-5"
    >
      <div className="mx-auto grid max-w-250 gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">

        {/* LEFT: BLOG POSTS */}
        <div className="flex flex-col">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-Kalam text-xl lg:3xl font-bold text-accent">
              From Behind the Lens
            </h2>
          </div>

          <div className="space-y-5">
            {blogPosts
            .filter((post : any)=>[5,7,8].includes(post.id))
            .map((post:any) => (
              <Link
                to={`/blog/${post.slug}`}
                key={post.title}
                className="group grid min-h-36 max-h-45 grid-cols-[40%_1fr] overflow-hidden border border-text bg-white transition-transform hover:-translate-y-1"
              >
                <div className="overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full min-h-36 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-col justify-center gap-3 p-4 md:p-6">
                  <span className="font-body text-[10px] font-semibold uppercase tracking-widest text-text">
                    {post.category}
                  </span>

                  <h3 className="font-Kalam text-md font-semibold leading-snug md:text-xl">
                    {post.title}
                  </h3>

                  <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider hover:text-accent">
                    Read article <ArrowUpRight size={15} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <a
            href="/blog"
            className="mt-3 flex w-fit items-center gap-3 rounded-lg bg-accent px-3 py-2 font-Kalam text-xl font-bold text-white transition-colors hover:bg-accent/90"
          >
            Read More Blogs
            <ArrowUpRight size={20} />
          </a>
        </div>

        {/* RIGHT: FAQ */}
        <div>
          <h2 className="mb-12 font-Kalam text-accent text-xl font-bold lg:text-3xl">
            Frequently Asked Questions
          </h2>

          {/* Categories */}
          <div className="mb-10 flex flex-wrap gap-x-7 gap-y-4 border-text/20">
            {faqCategories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setOpenQuestion(null);
                }}
                className={`relative cursor-pointer pb-4 font-Kalam text-lg font-semibold transition-colors md:text-xl ${
                  activeCategory === category
                    ? "text-accent"
                    : "text-text/80 hover:text-text/90"
                }`}
              >
                {category}

                {activeCategory === category && (
                  <span className="absolute bottom-0 left-0 h-1 w-full bg-accent" />
                )}
              </button>
            ))}
          </div>

          {/* Questions */}
          <div>
            {questions.map((item, index) => {
              const isOpen = openQuestion === index;

              return (
                <div
                  key={item.question}
                  className="border-b border-text/30"
                >
                  <button
                    onClick={() =>
                      setOpenQuestion(isOpen ? null : index)
                    }
                    aria-expanded={isOpen}
                    className="flex w-full cursor-pointer items-center justify-between gap-5 py-8 text-left"
                  >
                    <span className="font-Kalam text-lg font-semibold md:text-xl lg:text-2xl">
                      {item.question}
                    </span>

                    <ChevronDown
                      size={24}
                      className={`shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-text" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <p className="max-w-2xl pb-8 pr-8 font-Kalam text-lg leading-7 text-text/70">
                      {item.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
