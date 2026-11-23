
import { useState } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  message: string;
  rating: number;
  avatar: string;
};

// Replace these sample testimonials and avatar URLs with genuine client reviews.
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Jason",
    role: "Business owner",
    message:
      "The whole experience was excellent. The photos feel natural, the details are beautifully captured, and the final results exceeded my expectations.",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    id: 2,
    name: "Mehdi",
    role: "Designer",
    message:
      "I love how simple and comfortable the process was. The photographer understood the style I wanted and delivered images that tell a story.",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=11",
  },
  {
    id: 3,
    name: "Emily",
    role: "Fashion designer",
    message:
      "The attention to lighting, composition, and small details was impressive. I am very happy with the portraits and would absolutely recommend the service.",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=47",
  },
  {
    id: 4,
    name: "Sarah",
    role: "Event client",
    message:
      "Every important moment was captured without making the event feel staged. The photos brought back the atmosphere of the day perfectly.",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=44",
  },
  {
    id: 5,
    name: "Adam",
    role: "Entrepreneur",
    message:
      "Professional from the first conversation to the final delivery. The images gave my brand the visual quality I was looking for.",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=14",
  },
];

const wrapIndex = (index: number) =>
  (index + testimonials.length) % testimonials.length;

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(1);

  const visibleTestimonials = [
    testimonials[wrapIndex(activeIndex - 1)],
    testimonials[activeIndex],
    testimonials[wrapIndex(activeIndex + 1)],
  ];

  const previous = () =>
    setActiveIndex((current) => wrapIndex(current - 1));

  const next = () =>
    setActiveIndex((current) => wrapIndex(current + 1));

  return (
    <section
     id="testimonials"
      className="bg-bg text-text py-16 lg:py-24 overflow-hidden">
      <div className="max-w-350 mx-auto px-6 lg:px-10">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <h2 className="font-Kalam text-3xl md:text-5xl font-bold">
            What People Say About Us
          </h2>

          <p className="font-Kalam text-text/60 mt-4 leading-relaxed">
            Every project is a collaboration. Here is what some clients have
            to say about their experience.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="relative">

          {/* Previous button */}
          <button
            type="button"
            onClick={previous}
            aria-label="Previous testimonials"
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-12 h-12 rounded-full bg-secondary text-text items-center justify-center hover:bg-accent hover:text-white transition-colors"
          >
            <ArrowLeft size={21} />
          </button>

          {/* Next button */}
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonials"
            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 w-12 h-12 rounded-full bg-accent text-white items-center justify-center hover:opacity-80 transition-opacity"
          >
            <ArrowRight size={21} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7 items-center">
            {visibleTestimonials.map((testimonial, position) => {
              const isActive = position === 1;

              return (
                <article
                  key={`${testimonial.id}-${position}`}
                  className={`rounded-3xl p-7 lg:p-8 min-h-75 flex-col justify-between transition-all duration-500 ${
                    isActive
                      ? "bg-accent text-white md:scale-105 shadow-xl flex"
                      : "bg-secondary text-text hidden md:flex"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <img
                        src={testimonial.avatar}
                        alt=""
                        className="w-12 h-12 rounded-full object-cover border-2 border-white/30"
                      />

                      <div>
                        <h3 className="font-Montserrat text-sm font-bold">
                          {testimonial.name}
                        </h3>

                        <p
                          className={`font-Kalam text-sm ${
                            isActive ? "text-white/75" : "text-text/60"
                          }`}
                        >
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    <p
                      className={`font-Kalam text-base leading-7 ${
                        isActive ? "text-white/95" : "text-text/75"
                      }`}
                    >
                      “{testimonial.message}”
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-between mt-8">
                    <div className="flex items-center gap-1 text-yellow-300">
                      {Array.from({ length: testimonial.rating }).map(
                        (_, index) => (
                          <Star
                            key={index}
                            size={16}
                            fill="currentColor"
                            strokeWidth={1.5}
                          />
                        )
                      )}
                    </div>

                    <span
                      className={`font-Montserrat text-sm font-semibold ${
                        isActive ? "text-white" : "text-text/70"
                      }`}
                    >
                      {testimonial.rating.toFixed(1)} / 5
                    </span>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Mobile navigation */}
          <div className="flex md:hidden justify-center items-center gap-5 mt-7">
            <button
              type="button"
              onClick={previous}
              aria-label="Previous testimonial"
              className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center hover:bg-accent hover:text-white transition-colors"
            >
              <ArrowLeft size={19} />
            </button>

            <span className="font-Montserrat text-xs text-text/60 tabular-nums">
              {activeIndex + 1} / {testimonials.length}
            </span>

            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="w-11 h-11 rounded-full bg-accent text-white flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <ArrowRight size={19} />
            </button>
          </div>

          {/* Desktop pagination */}
          <div className="hidden md:flex justify-center gap-2 mt-10">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show testimonial ${index + 1}`}
                aria-current={activeIndex === index ? "true" : undefined}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "w-8 bg-accent"
                    : "w-2 bg-text/20 hover:bg-text/40"
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
