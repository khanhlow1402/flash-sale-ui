import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkout } from "../api/orderApi";
import { clearMockCart } from "../api/cartApi";

export default function CheckoutPage({ onCartUpdate }) {
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    setStatus("loading");
    try {
      const res = await checkout();
      setOrder(res.data);
      setStatus("success");
      clearMockCart();
      onCartUpdate();
    } catch (err) {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <p className="text-6xl mb-4">🎉</p>
        <h2 className="text-2xl font-bold text-green-600 mb-2">
          Đặt hàng thành công!
        </h2>
        <p className="text-gray-500 mb-1">
          Mã đơn hàng:{" "}
          <span className="font-mono font-bold">{order?.orderId}</span>
        </p>
        <p className="text-gray-400 text-sm mb-6">
          Stock đã được giảm trên Redis ngay lập tức ⚡
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 font-semibold"
        >
          Tiếp tục mua sắm
        </button>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <p className="text-6xl mb-4">😢</p>
        <h2 className="text-2xl font-bold text-red-600 mb-2">
          Đặt hàng thất bại!
        </h2>
        <p className="text-gray-400 mb-6">Sản phẩm có thể đã hết hàng.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-500 text-white px-6 py-2 rounded-lg"
        >
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center">
      <p className="text-5xl mb-4">📦</p>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Xác nhận đặt hàng
      </h2>
      <button
        onClick={handleCheckout}
        disabled={status === "loading"}
        className="bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-3 rounded-xl text-lg transition disabled:opacity-50"
      >
        {status === "loading" ? "Đang xử lý..." : "✅ Xác nhận đặt hàng"}
      </button>
    </div>
  );
}
