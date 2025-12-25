import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import UserDetail from "./pages/UserDetail";
import Posts from "./pages/Posts";

interface INav {
  path: string;
  text: string;
}

export const NavLinks: INav[] = [
  {
    path: "/",
    text: "Users",
  },
  // {
  //   path: "/posts",
  //   text: "Posts",
  // },
];

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/user/:userId" element={<UserDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}
