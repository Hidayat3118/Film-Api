const CardPagination = ({ title, img, rating, popularity }) => {
  return (
    <div className="h-[600px] w-full relative overflow-hidden">
      <img src={img} alt={title} className="object-cover" />

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex items-center">
        <div className="text-white px-10 max-w-2xl">
          <h2 className="text-5xl font-bold">{title}</h2>
          <div className="mt-10">
            <p className="mt-2 text-xl font-semibold">Rating : {rating}</p>
            <p className="mt-2 text-xl font-semibold">
              popularity : {popularity}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPagination;
