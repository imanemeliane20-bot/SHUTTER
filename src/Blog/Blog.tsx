
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Eye,
  MessageSquare,
  Send
} from "lucide-react";

import { blogPosts } from "../Data/blogPosts";
import MoreButton from "../components/MoreButton";
import ShareModel from "../components/ShareModel";


export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All Posts");
  const [searchQuery, setSearchQuery] = useState("");
  const [OpenMenuId,setOpenMenuId]=useState<number | null>(null)
  const [sharePost,setSharePost]=useState<typeof blogPosts[number] | null>(null);
  const [Copied,setCopied]=useState(false)
  const [likedArticles, setLikedArticles] = useState<number[]>(()=>{
    try{
      const savedLikes = localStorage.getItem("blog-liked-articles");
      return savedLikes ? JSON.parse(savedLikes) : [];
    } catch {
      return [];
    }
  });
  useEffect(()=>{
    localStorage.setItem("blog-liked-articles",JSON.stringify(likedArticles))
  },[likedArticles])

  const filteredArticles = blogPosts.filter((article) => {
    const matchesCategory =
      activeCategory === "All Posts" ||
      article.category === activeCategory;

    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const toggleLike = (id: number) => {
    setLikedArticles((current) =>
      current.includes(id)
        ? current.filter((articleId) => articleId !== id)
        : [...current, id]
    );
  };

  return (
    <section className="min-h-screen bg-bg text-text overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-10 lg:py-14">
        {/* Category banner */}
        <div className="flex items-center px-6 md:px-8 mb-5">
          <h1 className="font-Kalam text-accent text-3xl md:text-4xl">
            {activeCategory}
          </h1>
        </div>     

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 mx-40 lg:gap-9">
          {filteredArticles.map((article) => {
            const isLiked = likedArticles.includes(article.id);
            const likeCount = isLiked ? 1 : 0;
            return (
              <article
                key={article.id}
                className="group border border-text flex flex-col min-w-0 bg-bg"
              >
                {/* Article image */}
                <Link
                  to={`/blog/${article.slug}`}
                  className="relative block w-full aspect-4/3 overflow-hidden"
                  aria-label={`Read ${article.title}`}
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>

                {/* Article content */}
                <div className="p-5 flex flex-col flex-1">

                  {/* Date and reading time */}
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <p className="font-Kalam text-text/80 text-xs">
                      {article.date} · {article.readTime}
                    </p>
                    <div className="relative">
                    <MoreButton onClick={()=>
                      setOpenMenuId(
                        OpenMenuId===article.id ? null : article.id
                      )
                    } />
                  {OpenMenuId === article.id && 
                      (<div className="absolute right-0 top-full bg-text text-white p-3 mt-1 w-40 ">
                       <button 
                       onClick={()=> {
                        setSharePost(article);
                      }}
                       className="flex items-center justify-center font-Kalam  hover:text-white/80 cursor-pointer">
                        <Send width={17} />
                         <span className="whitespace-nowrap ml-2 font-kalam">
                          Share Post
                        </span>
                       </button>
                        
                      </div>)
                      }
                    </div>
                  
                  </div>
 
                  {/* Title */}
                  <Link
                    to={`/blog/${article.slug}`}
                    className="font-Kalam text-accent text-xl md:text-lg leading-relaxed mb-4 hover:text-accent/80 transition-colors"
                  >
                    {article.title}
                  </Link>

                  {/* Description */}
                  <p className="font-Kalam text-text/85 text-sm leading-relaxed line-clamp-3 mb-5 lg:mb-10">
                    {article.description}
                  </p>
                  {/* Bottom statistics */}
                  <div className="mt-auto pt-5 border-t border-text/30 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-5 ">
                      <span className="flex items-center gap-2 text-text  text-xs">
                        <Eye size={20} strokeWidth={1.6} />
                        <span className="font-Kalam">
                          {article.views}
                        </span>
                        
                      </span>

                      <span className="flex items-center font-Kalam gap-2 text-text text-xs">
                        <MessageSquare size={19} strokeWidth={1.6} />
                        <span className="">
                          {article.comments}
                        </span>
                        
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleLike(article.id)}
                      aria-label={isLiked ? "Unlike article" : "Like article"}
                      aria-pressed={isLiked}
                      className="text-red-500 flex items-center transition-transform cursor-pointer duration-300 hover:scale-110"
                    >
                      
                    
                      <Heart
                        size={21}
                        fill={isLiked ? "currentColor" : "none"}
                        strokeWidth={1.8}
                      />
                      {isLiked  &&   
                       <span className="font-Kalam ml-1">
                          {likeCount}
                      </span>
                      }
                     
                    </button>
                  </div>
                </div>
              </article>
 
            );

          })}
        </div>
         {sharePost && <ShareModel
         sharePost={sharePost}
         setSharePost={setSharePost}
         copied={Copied}
         setCopied={setCopied}
         />}

        {/* Empty state */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-20">
            <p className="font-Kalam text-text/60 text-lg">
              No posts found.
            </p>

            <button
              type="button"
              onClick={() => {
                setActiveCategory("All Posts");
                setSearchQuery("");
              }}
              className="font-Kalam text-accent mt-4 underline underline-offset-4"
            >
              Clear filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
