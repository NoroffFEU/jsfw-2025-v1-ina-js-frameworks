const ProductCardSkeleton = () => {
  return (
    <div className="relative border rounded-lg p-4 shadow bg-blue-50 animate-pulse">
      <div className="absolute top-2 right-2 h-7 w-16 rounded bg-blue-100"></div>

      <div className="w-full aspect-square bg-blue-100 mb-4 rounded"></div>

      <div className="h-6 bg-blue-100 rounded w-3/4 mb-2"></div>

      <div className="space-y-2 mb-2">
        <div className="h-4 bg-blue-100 rounded w-full"></div>
        <div className="h-4 bg-blue-100 rounded w-5/6"></div>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <div className="h-5 bg-blue-100 rounded w-16"></div>
        <div className="h-5 bg-blue-100 rounded w-20"></div>
      </div>

      <div className="h-5 bg-blue-100 rounded w-24"></div>
    </div>
  );
};

export default ProductCardSkeleton;
