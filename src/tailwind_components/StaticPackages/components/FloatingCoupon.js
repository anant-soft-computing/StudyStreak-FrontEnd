import React from "react";

const FloatingCoupon = ({
  promoCode,
  originalPrice,
  discountedPrice,
  setIsModalOpen,
}) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-xl p-4 flex items-center animate-fade-in">
      <div>
        {promoCode && (
          <>
            <p className="text-neutral-600 text-sm">Use code:</p>
            <p className="font-mono font-bold text-primary-700">{promoCode}</p>
          </>
        )}
        <button
          className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-2 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          onClick={() => setIsModalOpen(true)}
        >
          Get Start Now
        </button>
      </div>
      <div className="ml-4 pl-4 border-l border-neutral-200">
        <div className="text-2xl font-bold text-primary-700">
          ₹{discountedPrice}
        </div>
        <div className="text-xs text-neutral-500 line-through">
          ₹{originalPrice}
        </div>
      </div>
    </div>
  );
};

export default FloatingCoupon;
