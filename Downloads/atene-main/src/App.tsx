import { Routes, Route } from "react-router-dom";
import ProductPage from "./pages/productPage/ProductPage";
import NavbarWithState from "./components/NavBar";
import Footer from "./components/Footer";
import Login from "./pages/login/Login";

function App() {
  return (
    <main className=" font-oxygen  ">
      <NavbarWithState />
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
