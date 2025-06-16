import { FaStar } from "react-icons/fa";
import {
  MdOutlinePlayCircleFilled,
  MdOutlineCalendarToday,
} from "react-icons/md";
import { toast } from "react-toastify";

const CardMovie = ({ title, img, rating, date }) => {
  const Toggle = () => {
    toast.error("tidak bisa menonton karna hak cipta");
  };
  return (
    <div onClick={Toggle} className=" hover:scale-105 duration-300 cursor-pointer shadow-2xl rounded-2xl overflow-hidden flex flex-col h-auto bg-white group relative">
      {/* Gambar */}
      <img
        src={img}
        alt={title}
        className="object-cover w-full group-hover:brightness-50 duration-300"
      />
      <div className="absolute inset-0 flex items-center justify-center transition duration-300 opacity-0 group-hover:opacity-100">
        <MdOutlinePlayCircleFilled size={72} className="text-white" />
      </div>
      {/* Judul */}
      <div className="flex-grow flex flex-col justify-between items-center text-center px-4 pt-3 ">
        <h2 className="font-bold text-base md:text-lg lg:text-xl line-clamp-1 text-gray-700">
          {title}
        </h2>
      </div>

      {/* Rating di bawah */}
      <div className="flex items-center justify-center gap-2 py-4 text-sm">
        <div className="flex justify-around w-full text-xs md:text-sm">
          <div className="flex gap-2 ">
            <FaStar className="text-yellow-500" />
            <p className=" font-semibold text-gray-700">{rating}</p>
          </div>
          {/* Date */}
          <div className="flex gap-2">
            <MdOutlineCalendarToday className="text-gray-700" />
            <span className="font-semibold text-gray-700">{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardMovie;
