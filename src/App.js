import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductListPage from "./pages/ProductListPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => setCartCount((prev) => prev + 1);
  const resetCartCount = () => setCartCount(0);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar cartCount={cartCount} />
        <Routes>
          <Route
            path="/"
            element={<ProductListPage onCartUpdate={updateCartCount} />}
          />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/checkout"
            element={<CheckoutPage onCartUpdate={resetCartCount} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
