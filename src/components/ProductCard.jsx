export default function ProductCard({ product, onAddToCart }) {
  const outOfStock = product.stock === 0;

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="rounded-lg w-full object-cover mb-3"
      />
      <h2 className="font-semibold text-gray-800 text-base flex-1">
        {product.name}
      </h2>
      <p className="text-red-500 font-bold text-lg mt-1">
        {product.price.toLocaleString("vi-VN")}₫
      </p>
      <div className="flex items-center justify-between mt-2">
        <span
          className={`text-sm font-medium px-2 py-0.5 rounded-full ${
            outOfStock
              ? "bg-gray-200 text-gray-500"
              : "bg-green-100 text-green-700"
          }`}
        >
          {outOfStock ? "Hết hàng" : `Còn ${product.stock}`}
        </span>
        <button
          onClick={() => onAddToCart(product)}
          disabled={outOfStock}
          className={`text-sm px-3 py-1.5 rounded-lg font-semibold transition ${
            outOfStock
              ? "bg-gray-300 text-gray-400 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600 text-white"
          }`}
        >
          + Thêm vào giỏ
        </button>
      </div>
    </div>
  );
}
