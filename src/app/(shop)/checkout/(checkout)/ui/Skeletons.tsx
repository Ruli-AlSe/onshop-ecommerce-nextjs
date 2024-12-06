export const AddressSkeleton = () => {
  return (
    <div className="mb-10">
      <p className="bg-gray-200 animate-pulse w-full mb-1 h-8" />
      <p className="bg-gray-200 animate-pulse w-full mb-1 h-5" />
      <p className="bg-gray-200 animate-pulse w-full mb-1 h-5" />
      <p className="bg-gray-200 animate-pulse w-full mb-1 h-5" />
      <p className="bg-gray-200 animate-pulse w-full mb-1 h-5" />
      <p className="bg-gray-200 animate-pulse w-full mb-1 h-5" />
    </div>
  );
};

export const OrderDetailsSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-1">
      <span>Products count</span>
      <span className="w-full h-5 bg-gray-200 animate-pulse" />

      <span>Subtotal:</span>
      <span className="w-full h-5 bg-gray-200 animate-pulse" />

      <span>Taxes (15%):</span>
      <span className="w-full h-5 bg-gray-200 animate-pulse" />

      <span className="mt-5 text-2xl">Total:</span>
      <span className="w-full h-10 bg-gray-200 animate-pulse" />
    </div>
  );
};
