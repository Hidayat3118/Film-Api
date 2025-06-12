const CardMovie = ({ title, img, rating }) => {
  return (
    <div className="hover:scale-105 duration-300 cursor-pointer shadow-2xl rounded-2xl overflow-hidden">
      <img src={img} alt={title} className="object-cover "/>
      <div className="p-4 ">
        <h2 className="font-bold text-2xl py-3">{title}</h2>
        <p>Rating : {rating}</p>
      </div>
    </div>
  );
};

export default CardMovie;
