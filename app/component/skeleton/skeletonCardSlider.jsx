const SkeletonCardSlider = () => {
  return (
    <div className="h-[400px] sm:h-[550px] md:h-[600px] w-full relative rounded-2xl overflow-hidden animate-pulse bg-gray-800">
      {/* Background Skeleton */}
      <div className="w-full h-full object-cover bg-gray-700" />

      {/* Overlay konten */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex items-center">
        <div className="grid gap-6 sm:gap-8 md:gap-10 px-5 sm:px-10 max-w-xl text-white">

          {/* Judul Skeleton */}
          <div className="space-y-4">
            <div className="h-10 sm:h-12 md:h-14 w-3/4 bg-gray-600 rounded" />
          </div>

          {/* Rating & Popularity */}
          <div className="mt-4 sm:mt-6 md:mt-10 grid gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gray-500 rounded-full" />
              <div className="h-5 w-1/3 bg-gray-600 rounded" />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gray-500 rounded-full" />
              <div className="h-5 w-1/3 bg-gray-600 rounded" />
            </div>
          </div>

          {/* Tombol Skeleton */}
          <div className="flex flex-wrap gap-4">
            <div className="w-32 h-10 sm:h-12 bg-gray-700 rounded-full" />
            <div className="w-32 h-10 sm:h-12 bg-gray-700 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCardSlider;
