import { Route, Routes } from "react-router-dom"
import Hero from "./Hero/Hero"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Services from "./Services/Services"
import About  from "./About/About"
import Contact from "./Contact/Contact"
import Exhibition from "./Exhibition/Exhibition"
import Blog from "./Blog/Blog"
import BlogPost from "./Blog/BlogPost"
import NotFound from "./NotFound/NotFound"

function App() {
  return (
    <main className="bg-bg">
     <Navbar />
     <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/exhibition" element={<Exhibition />} />
      <Route path="/services" element={<Services />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />

      <Route path="*" element={<NotFound />} />
     </Routes>

      <Footer />
    </main>
     
  )
}

export default App