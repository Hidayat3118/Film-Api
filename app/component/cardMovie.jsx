import { FaStar } from "react-icons/fa";

const CardMovie = ({ title, img, rating, date }) => {
  return (
    <div className="hover:scale-105 duration-300 cursor-pointer shadow-2xl rounded-2xl overflow-hidden flex flex-col h-[520px] bg-white">
      {/* Gambar */}
      <img src={img} alt={title} className="object-cover w-full" />

      {/* Judul */}
      <div className="flex-grow flex flex-col justify-between items-center text-center px-4 pt-3 ">
        <h2 className="font-bold text-2xl line-clamp-1">{title}</h2>
      </div>

      {/* Rating di bawah */}
      <div className="flex items-center justify-center gap-2 pb-3 bg-gray-100 ">
        <div className="flex justify-around w-full">
          <div className="flex gap-2">
            <FaStar className="text-yellow-500" />
            <p className="text-md font-semibold">{rating}</p>
          </div>
          <div>
            <p className="text-md font-semibold">{date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardMovie;
