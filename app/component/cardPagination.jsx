import { FaStar, FaFire, FaPlay, FaInfoCircle } from "react-icons/fa";

const CardPagination = ({ title, img, rating, popularity }) => {
  return (
    <div className="h-[600px] w-full relative cursor-pointer shadow-2xl rounded-2xl overflow-hidden">
      {/* Gambar */}
      <img src={img} alt={title} className="object-cover w-full h-full" />

      {/* Overlay dan Konten */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex items-center">
        <div className="grid gap-10">
          {/* Judul */}
          <div className="text-white px-10 max-w-2xl">
            <h2 className="text-5xl font-bold">{title}</h2>

            {/* Rating & Popularity */}
            <div className="mt-10 gap-2 grid">
              <div className="flex items-center gap-3 text-xl font-semibold">
                <FaStar className="text-yellow-400" />
                <p>Rating: {rating}</p>
              </div>
              <div className="flex items-center gap-3 text-xl font-semibold">
                <FaFire className="text-red-500" />
                <p>Popularity: {popularity}</p>
              </div>
            </div>
          </div>

          {/* Tombol */}
          <div className="flex gap-5 pl-8">
            <button className="flex items-center gap-2 bg-red-500 border border-white text-white font-semibold py-3 px-6 rounded-full hover:bg-transparent hover:scale-105 duration-300">
              <FaPlay />
              Watch Now
            </button>
            <button className="flex items-center gap-2 border border-white text-white font-semibold py-3 px-6 rounded-full hover:bg-red-600 hover:scale-105 duration-300">
              <FaInfoCircle />
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPagination;
