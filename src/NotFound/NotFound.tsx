
import { Link } from "react-router-dom";
import {  Home } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-screen bg-bg text-text flex items-center justify-center px-6 py-16 overflow-hidden">

      <div className="max-w-3xl w-full text-center">
        {/* Error number */}
        <h1 className="font-Kalam text-[110px] sm:text-[160px] lg:text-7xl font-black leading-none tracking-tight text-accent">
          404
        </h1>

        {/* Heading */}
        <h2 className="font-Kalam text-3xl md:text-5xl font-bold mt-4">
          Lost in the frame?
        </h2>

        {/* Description */}
        <p className="font-Kalam text-text/60 text-base md:text-lg leading-relaxed max-w-lg mx-auto mt-5">
          Looks like this page wasn't captured.
          The link may be broken, or the page may have moved.
          Let's get you back on track.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">

          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-accent text-white px-7 py-3 rounded-full font-Kalam text-base hover:bg-accent/90 transition-all duration-300 w-full sm:w-auto"
          >
            <Home size={18} />
            Back to Home
          </Link>

        </div>

        {/* Footer text */}
        <p className="font-Kalam text-white/30 text-sm tracking-widest mt-20">
          SHUTTER VISION · EVERY FRAME TELLS A STORY
        </p>

      </div>
    </section>
  );
}
