"use client";
import { getPopularMovie } from "./lib/popular-api";
import { getNowPlaying } from "./lib/now-playing";
import { useEffect, useState } from "react";
import CardMovie from "../app/component/cardMovie";
import CardPagination from "../app/component/cardPagination";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Home = () => {
  const [populars, setPopulars] = useState([]);
  const [playings, setPlayings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPopularMovie();
        setPopulars(data);
      } catch (err) {
        console.error("Error fetch popular:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNowPlaying();
        setPlayings(data);
      } catch (err) {
        console.error("Error fetch playing:", err);
      }
    };
    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <main className="container mx-auto">
      {/* Movie Terbaru - Carousel */}
      <div className="my-10 ">
        <Slider {...settings}>
          {playings.map((playing) => (
            <CardPagination
              key={playing.id}
              title={playing.title}
              rating={playing.vote_average}
              popularity={playing.popularity}
              img={`https://image.tmdb.org/t/p/original${playing.backdrop_path}`}
            />
          ))}
        </Slider>
      </div>

      {/* Movie Populer - Grid */}
      <div className="grid grid-cols-5 gap-10">
        {populars.map((popular) => (
          <CardMovie
            key={popular.id}
            title={popular.title}
            rating={popular.vote_average}
            date={popular.release_date}
            img={`https://image.tmdb.org/t/p/w500${popular.poster_path}`}
          />
        ))}
      </div>
    </main>
  );
};

export default Home;
