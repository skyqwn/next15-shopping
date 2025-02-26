import React from "react";

const ProductItemSkeleton = () => {
  return (
    <div className="mx-auto flex h-full min-h-[calc(100vh-4rem)] max-w-screen-xl flex-col justify-between px-4 py-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-[300px] animate-pulse bg-gray-200" />
        ))}
      </div>
    </div>
  );
};

export default ProductItemSkeleton;
