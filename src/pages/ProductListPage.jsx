import { useEffect, useState } from "react";
import { getProducts } from "../api/productApi";
import { addToCart } from "../api/cartApi";
import ProductCard from "../components/ProductCard";

export default function ProductListPage({ onCartUpdate }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  useEffect(() => {
    getProducts().then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  }, []);

  const handleAddToCart = async (product) => {
    await addToCart(product);
    onCartUpdate();
    setToast(`✅ Đã thêm "${product.name}" vào giỏ!`);
    setTimeout(() => setToast(""), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        🔥 Sản phẩm Flash Sale
      </h1>

      {toast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {toast}
        </div>
      )}

      {loading ? (
        <p className="text-center text-gray-400 mt-20">Đang tải sản phẩm...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} />
          ))}
        </div>
      )}
    </div>
  );
}
