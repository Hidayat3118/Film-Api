const SkeletonCardMovie = () => {
  return (
    <div className="hover:scale-105 duration-300 shadow-2xl rounded-2xl overflow-hidden flex flex-col h-auto bg-white animate-pulse">
      {/* Gambar (Placeholder) */}
      <div className="w-full h-64 md:h-80 bg-gray-300" />

      {/* Judul Placeholder */}
      <div className="flex-grow flex flex-col justify-between items-center text-center px-4 pt-3 pb-2">
        <div className="w-3/4 h-5 bg-gray-300 rounded mb-2" />
      </div>

      {/* Rating dan Tanggal */}
      {/* <div className="flex items-center justify-center gap-2 py-4 bg-gray-100 text-sm">
        <div className="flex justify-around w-full text-xs md:text-sm">
          <div className="flex gap-2 items-center">
            <div className="w-4 h-4 rounded-full bg-gray-400" />
            <div className="w-6 h-4 bg-gray-300 rounded" />
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-4 h-4 rounded-full bg-gray-400" />
            <div className="w-12 h-4 bg-gray-300 rounded" />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default SkeletonCardMovie;
