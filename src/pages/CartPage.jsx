import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart } from "../api/cartApi";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCart().then((res) => setCartItems(res.data));
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">🛒 Giỏ hàng</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-400 mt-20">
          <p className="text-4xl mb-4">🛒</p>
          <p>Giỏ hàng trống</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Tiếp tục mua sắm
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="bg-white rounded-xl shadow p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Số lượng: {item.quantity}
                  </p>
                </div>
                <p className="text-red-500 font-bold">
                  {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-white rounded-xl shadow p-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Tổng cộng:</span>
              <span className="text-red-500">
                {total.toLocaleString("vi-VN")}₫
              </span>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition"
            >
              Đặt hàng ngay ⚡
            </button>
          </div>
        </>
      )}
    </div>
  );
}
