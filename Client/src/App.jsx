import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Layout/Navbar";
import Home from "./Pages/Home";
import BlogDetails from "./Pages/Blog/BlogDetails";
import CreateBlog from "./Pages/Blog/CreateBlog";
import Signin from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/SignUp";
import MyBlogs from "./Pages/Blog/MyBlogs";
import EditBlog from "./Pages/Blog/EditBlog";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/blog/new" element={<CreateBlog />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/my-blogs" element={<MyBlogs />} />
        <Route path="/blog/edit/:id" element={<EditBlog />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;