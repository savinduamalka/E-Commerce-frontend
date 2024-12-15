import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Contact from "./pages/contact";
import Cart from "./pages/cart";
import Product from "./pages/products";
import AdminHome from "./pages/adminpages/adminHome";
import Category from "./pages/category";
import UserManagement from "./pages/adminpages/adminuser";
import EditUserProfile from "./pages/editUserprofile";
import CategoryManagement from "./pages/adminpages/adminCategory";
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <>
    <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Product />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/categories" element={<Category/>} />
          <Route path="/admin/users" element={<UserManagement/>} />
          <Route path="/editUserprofile" element={<EditUserProfile />} />
          <Route path="/admin/categories" element={<CategoryManagement/>} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
