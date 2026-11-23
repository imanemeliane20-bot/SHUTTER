
import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";

import {
  Link,
  Navigate,
  useParams,
} from "react-router-dom";

import {
  ArrowUpRight,
  Eye,
  Link as LinkIcon,
  Star,
  MessageSquare,
  Send,
  Check,
  Smile,
  Image,
  Video,
  X,
} from "lucide-react";

import { blogPosts } from "../Data/blogPosts";
import MoreButton from "../components/MoreButton";
import ShareModel from "../components/ShareModel";
import { FaFacebookF, FaLinkedin } from "react-icons/fa";

type CommentAttachment = {
  file: File;
  url: string;
};

type CommentItem = {
  text: string;
  attachments: CommentAttachment[];
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();

  const article = blogPosts.find((post) => post.slug === slug);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [sharePost, setSharePost] = useState<
    typeof blogPosts[number] | null
  >(null);

  const [comments, setComments] = useState<CommentItem[]>([]);
  const [attachments, setAttachments] = useState<CommentAttachment[]>([]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Keep track of preview URLs to release browser memory.
  const objectUrls = useRef<Set<string>>(new Set());

  useEffect(() => {
    return () => {
      objectUrls.current.forEach((url) => URL.revokeObjectURL(url));
      objectUrls.current.clear();
    };
  }, []);

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const relatedArticles = blogPosts
    .filter(
      (post) =>
        post.id !== article.id &&
        post.category === article.category
    )
    .slice(0, 3);

  const shareUrl =
    typeof window !== "undefined" ? window.location.href : "";

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  // Emoji picker
  const emojis = [
    "😀", "😂", "😍", "🔥", "❤️",
    "👏", "🎉", "😊", "😎", "👍",
    "🥰", "🤩", "🙌", "💯", "✨",
  ];

  const addEmoji = (emoji: string) => {
    setComment((current) => current + emoji);
    setShowEmojiPicker(false);
  };

  // Handle image, GIF and video selection
  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files ?? []);

    const newAttachments = files.map((file) => {
      const url = URL.createObjectURL(file);

      objectUrls.current.add(url);

      return {
        file,
        url,
      };
    });

    setAttachments((current) => [
      ...current,
      ...newAttachments,
    ]);

    // Allows selecting the same file again.
    event.target.value = "";
  };

  // Remove an attachment before publishing
  const removeAttachment = (index: number) => {
    setAttachments((current) => {
      const attachment = current[index];

      if (attachment) {
        URL.revokeObjectURL(attachment.url);
        objectUrls.current.delete(attachment.url);
      }

      return current.filter((_, i) => i !== index);
    });
  };

  // Cancel the current comment
  const cancelComment = () => {
    attachments.forEach((attachment) => {
      URL.revokeObjectURL(attachment.url);
      objectUrls.current.delete(attachment.url);
    });

    setComment("");
    setAttachments([]);
    setShowEmojiPicker(false);
  };

  // Publish the comment
  const publishComment = () => {
    if (!comment.trim() && attachments.length === 0) return;

    setComments((current) => [
      ...current,
      {
        text: comment.trim(),
        attachments: [...attachments],
      },
    ]);

    setComment("");
    setAttachments([]);
    setShowEmojiPicker(false);
  };

  return (
    <section className="min-h-screen bg-bg text-text">
      <div className="max-w-240 mx-auto px-5 md:px-8 py-10 md:py-16">

        {/* Article container */}
        <article className="border border-text p-5 sm:p-8 md:p-10">

          {/* Article metadata */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3 font-Kalam text-xs text-text/70">
              <span>{article.date}</span>
              <span>·</span>
              <span>{article.readTime}</span>
              <span>·</span>
              <span className="text-accent">{article.category}</span>
            </div>

            {/* More options */}
            <div className="relative">
              <MoreButton
                onClick={() => {
                  setIsMenuOpen((current) => !current);
                }}
              />

              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-2 z-50 w-48 bg-text border border-text/20 text-bg shadow-xl p-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSharePost(article);
                      setIsMenuOpen(false);
                      setCopied(false);
                    }}
                    className="flex items-center gap-3 w-full text-left font-Kalam text-sm hover:text-bg/80 cursor-pointer"
                  >
                    <Send size={17} />
                    Share Post
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Article title */}
          <h1 className="font-Kalam text-accent text-3xl lg:text-4xl font-bold leading-tight mb-7">
            {article.title}
          </h1>

          {/* Introduction */}
          <p className="font-Kalam text-text/90 text-sm md:text-base leading-8 mb-8">
            {article.description}
          </p>

          {/* Article sections */}
          <div className="space-y-8">
            {article.sections.map((section, index) => (
              <section key={`${article.id}-${index}`}>

                <h2 className="font-Kalam text-accent text-xl md:text-2xl font-bold mb-4">
                  {section.heading}
                </h2>

                <div className="space-y-4">
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p
                      key={paragraphIndex}
                      className="font-Kalam text-text/85 text-sm leading-7"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Bullet list */}
                {section.bullets && (
                  <ul className="list-disc pl-6 mt-5 space-y-3">
                    {section.bullets.map((bullet, bulletIndex) => (
                      <li
                        key={bulletIndex}
                        className="font-Kalam text-text/85 text-sm leading-7 pl-1"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Article image */}
                {section.image && (
                  <figure className="my-8 mx-10">
                    <img
                      src={section.image}
                      alt={section.imageCaption || section.heading}
                      loading="lazy"
                      className="w-full max-h-110"
                    />

                    {section.imageCaption && (
                      <figcaption className="font-Kalam text-text/50 text-xs text-center mt-3">
                        {section.imageCaption}
                      </figcaption>
                    )}
                  </figure>
                )}

              </section>
            ))}
          </div>

          {/* Article footer */}
          <div className="mt-12 pt-6 border-t border-text/20">

            {/* Social sharing */}
            <div className="flex items-center gap-6 mb-6">
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-text flex items-center justify-center text-xl"
                aria-label="Share on X"
              >
                𝕏
              </a>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noreferrer"
                className="font-Kalam text-sm transition-colors"
              >
                <FaFacebookF className="text-[#4267B2]" />
              </a>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noreferrer"
                className="font-Kalam text-sm"
              >
                <FaLinkedin size={19} className="text-[#0077B5] bg-white" />
              </a>

              <button
                type="button"
                onClick={copyLink}
                aria-label="Copy article link"
                className="flex items-center gap-2 cursor-pointer font-Kalam text-sm text-[#4267B2]"
              >
                {copied ? <Check /> : <LinkIcon size={17} />}
              </button>
            </div>

            {/* Article statistics */}
            <div className="flex flex-wrap items-center gap-6 border-t border-text/20 pt-5">

              <div className="flex items-center gap-2 text-text/60">
                <Eye size={19} strokeWidth={1.6} />
                <span className="font-Kalam text-sm">
                  {article.views} views
                </span>
              </div>

              <div className="flex items-center gap-2 text-text/60">
                <MessageSquare size={18} strokeWidth={1.6} />
                <span className="font-Kalam text-sm">
                  {article.comments + comments.length} comments
                </span>
              </div>

            </div>
          </div>
        </article>

        {/* Related articles */}
        {relatedArticles.length > 0 && (
          <section className="mt-16">

            <div className="mb-8">
              <p className="font-Kalam text-accent text-lg">
                Keep exploring
              </p>

              <h2 className="font-Kalam text-text text-3xl font-bold">
                Related Articles
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group border border-text/30 hover:border-accent transition-colors"
                >
                  <div className="aspect-4/3 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  <div className="p-4">
                    <p className="font-Kalam text-accent text-xs mb-2">
                      {post.category}
                    </p>

                    <h3 className="font-Kalam text-text text-lg leading-relaxed">
                      {post.title}
                    </h3>

                    <span className="flex items-center gap-2 text-accent font-Kalam text-sm mt-4">
                      Read article
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Comments section */}
        <section className="mt-12 border border-text/40 p-5 md:p-8">

          {/* Comments heading */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-text/20 pb-5 mb-7">
            <h2 className="font-Kalam text-text text-xl font-bold">
              Comments
            </h2>

            <span className="font-Kalam text-text/50 text-sm flex items-center gap-2">
              <MessageSquare size={16} />
              {article.comments + comments.length} comments
            </span>
          </div>

          {/* Interactive rating */}
          <div className="flex flex-wrap items-center gap-3 mb-7">
            <div className="flex items-center gap-1 text-accent">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  aria-label={`Rate ${value} out of 5`}
                  aria-pressed={rating === value}
                  className="hover:scale-110 transition-transform"
                >
                  <Star
                    size={22}
                    fill={value <= rating ? "currentColor" : "none"}
                  />
                </button>
              ))}
            </div>

            <span className="font-Kalam text-text/60 text-xs">
              {rating === 0
                ? "Add a rating"
                : `Your rating: ${rating}/5`}
            </span>
          </div>

          {/* Comment composer */}
          <div className="relative border border-text/30 p-4 md:p-6">

            {/* Comment input */}
            <textarea
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Write a comment..."
              rows={4}
              className="w-full bg-transparent text-text text-base outline-none resize-y placeholder:text-text/50"
            />

            {/* Attachment previews */}
            {attachments.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-4">
                {attachments.map((attachment, index) => (
                  <div
                    key={`${attachment.file.name}-${index}`}
                    className="relative border border-text/20 p-2"
                  >
                    {attachment.file.type.startsWith("image/") ? (
                      <img
                        src={attachment.url}
                        alt={attachment.file.name}
                        className="w-28 h-20 object-cover"
                      />
                    ) : attachment.file.type.startsWith("video/") ? (
                      <video
                        src={attachment.url}
                        controls
                        className="w-40 h-24 object-cover"
                      />
                    ) : (
                      <div className="max-w-40 text-xs truncate">
                        {attachment.file.name}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      aria-label={`Remove ${attachment.file.name}`}
                      className="absolute -top-2 -right-2 rounded-full bg-text text-bg p-1 hover:bg-accent hover:text-black"
                    >
                      <X size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Emoji picker */}
            {showEmojiPicker && (
              <div className="absolute bottom-full left-4 mb-2 z-50 bg-bg border border-text/20 shadow-xl p-3 grid grid-cols-5 gap-3">
                {emojis.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => addEmoji(emoji)}
                    className="text-xl hover:scale-125 transition-transform"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}

            {/* Hidden file inputs */}
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={handleFileChange}
            />
            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              multiple
              hidden
              onChange={handleFileChange}
            />

            {/* Composer toolbar */}
            <div className="flex items-center gap-6 mt-5 text-text">

              {/* Emoji */}
              <button
                type="button"
                onClick={() => setShowEmojiPicker((current) => !current)}
                aria-label="Add emoji"
                className="hover:text-accent transition-colors cursor-pointer"
              >
                <Smile size={23} />
              </button>

              {/* Image */}
              <button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                aria-label="Add image"
                className="hover:text-accent transition-colors cursor-pointer"
              >
                <Image size={23} />
              </button>
              {/* Video */}
              <button
                type="button"
                onClick={() => videoInputRef.current?.click()}
                aria-label="Add video"
                className="hover:text-accent transition-colors cursor-pointer"
              >
                <Video size={23} />
              </button>

            </div>
          </div>

          {/* Composer actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-5">

            <p className="font-Kalam text-sm text-text/60">
              Share your thoughts about this article.
            </p>

            <div className="flex items-center gap-5">

              {/* Cancel */}
              <button
                type="button"
                onClick={cancelComment}
                className="font-Kalam text-sm text-accent hover:text-text transition-colors cursor-pointer"
              >
                Cancel
              </button>

              {/* Publish */}
              <button
                type="button"
                onClick={publishComment}
                disabled={!comment.trim() && attachments.length === 0}
                className="bg-accent text-black px-7 py-3 font-Kalam text-sm hover:bg-text hover:text-bg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Publish
              </button>

            </div>
          </div>

          {/* Published comments */}
          {comments.length > 0 && (
            <div className="mt-8 space-y-6">

              {comments.map((item, index) => (
                <div
                  key={index}
                  className="border-t border-text/15 pt-5"
                >
                  {item.text && (
                    <p className="font-Kalam text-text/80 text-sm">
                      {item.text}
                    </p>
                  )}

                  {/* Published attachments */}
                  {item.attachments.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-4">
                      {item.attachments.map((attachment, fileIndex) => (
                        <div key={fileIndex}>

                          {attachment.file.type.startsWith("image/") ? (
                            <img
                              src={attachment.url}
                              alt={attachment.file.name}
                              className="max-w-64 max-h-48 object-cover"
                            />
                          ) : attachment.file.type.startsWith("video/") ? (
                            <video
                              src={attachment.url}
                              controls
                              className="max-w-64 max-h-48"
                            />
                          ) : (
                            <p className="text-sm text-text/70">
                              {attachment.file.name}
                            </p>
                          )}

                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

            </div>
          )}

        </section>
      </div>

      {/* Share modal */}
      {sharePost && (
        <ShareModel
          sharePost={sharePost}
          setSharePost={setSharePost}
          copied={copied}
          setCopied={setCopied}
        />
      )}

    </section>
  );
}
