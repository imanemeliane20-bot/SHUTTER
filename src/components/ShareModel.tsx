import { Check, LinkIcon, X } from "lucide-react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";

type SharePost={
    title:string;
    slug:string;
};
type ShareModelProps={
    sharePost:SharePost;
    setSharePost:(post:null)=>void;
    copied:boolean;
    setCopied:(copied:boolean)=>void;
}

const ShareModel = ({
    sharePost,
    setSharePost,
    copied,
    setCopied
}: ShareModelProps) => {

  return (

        <div
          className="fixed inset-0 z-100 bg-black/70 flex items-center justify-center p-4"
          onClick={() => {
            setSharePost(null);
            setCopied(false);
          }}
        >
          <div
            className="relative bg-white text-black w-full max-w-3xl min-h-88 lg:min-h-105 flex flex-col items-center justify-center p-8 md:p-12"
            onClick={(e) => e.stopPropagation()}
          >
      {/* Close button */}
      <button
        type="button"
        onClick={() => {
          setSharePost(null);
          setCopied(false);
        }}
        className="absolute top-5 right-5 cursor-pointer text-black/60 hover:text-black"
        aria-label="Close share modal"
      >
        <X size={25} />
      </button>

      {/* Modal title */}
      <h2 className="font-Montserrat text-2xl md:text-3xl font-semibold mb-4 text-center">
        Share Post
      </h2>

      <p className="font-Kalam text-black/60 text-center mb-10">
        {sharePost.title}
      </p>

      {/* Social media buttons */}
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">

        {/* Facebook */}
        <button
          type="button"
          onClick={() =>
            window.open(
              `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + "/blog/" + sharePost.slug)}`,
              "_blank",
              "width=600,height=500"
            )
          }
          className="w-11 h-11 cursor-pointer rounded-full bg-[#4267B2] text-white flex items-center justify-center hover:scale-110 transition-transform"
          aria-label="Share on Facebook"
        >
          <FaFacebookF size={25} fill="white" />
        </button>

        {/* X */}
        <button
          type="button"
          onClick={() =>
            window.open(
              `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.origin + "/blog/" + sharePost.slug)}&text=${encodeURIComponent(sharePost.title)}`,
              "_blank",
              "width=600,height=500"
            )
          }
          className="w-11 h-11 cursor-pointer rounded-full bg-[#55ACEE] text-white flex items-center justify-center text-3xl hover:scale-110 transition-transform"
          aria-label="Share on X"
        >
          𝕏
        </button>

        {/* LinkedIn */}
        <button
          type="button"
          onClick={() =>
            window.open(
              `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin + "/blog/" + sharePost.slug)}`,
              "_blank",
              "width=600,height=500"
            )
          }
          className="w-11 h-11 cursor-pointer rounded-full bg-[#0077B5] text-white flex items-center justify-center hover:scale-110 transition-transform"
          aria-label="Share on LinkedIn"
        >
          <FaLinkedinIn  size={25} />
        </button>

        {/* Copy link */}
        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(
                window.location.origin + "/blog/" + sharePost.slug
              );
              setCopied(true);
            } catch {
              setCopied(false);
            }
          }}
          className="w-11 h-11 cursor-pointer rounded-full bg-[#333333] text-white flex items-center justify-center hover:scale-110 transition-transform"
          aria-label="Copy post link"
        >
          {copied ? <Check size={25} /> : <LinkIcon size={25} />}
        </button>

      </div>

      {copied && (
        <p className="font-Kalam text-green-600 mt-6">
          Link copied successfully!
        </p>
      )}
    </div>
  </div>
)}


export default ShareModel