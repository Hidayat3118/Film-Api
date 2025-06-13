"use client";
import { getPopularMovie } from "./lib/popular-api";
import { getNowPlaying } from "./lib/now-playing";
import { useEffect, useState } from "react";
import CardMovie from "../app/component/cardMovie";
import CardPagination from "../app/component/cardPagination";
import Footer from "../app/component/footer";
import Navbar from "../app/component/navbar";

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
    // arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <main className="bg-gray-100">
      <Navbar></Navbar>
      <div className="container mx-auto">
        {/* Movie Terbaru - Carousel */}
        <section className="my-10 px-3 md:px-0 bg-gray-100 shadow-2xl mt-32 overflow-hidden">
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
        </section>

        {/* Movie Populer - Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 lg:gap-5 xl:gap-10 px-3 md:px-0">
          {populars.map((popular) => (
            <CardMovie
              key={popular.id}
              title={popular.title}
              rating={popular.vote_average}
              date={popular.release_date}
              img={`https://image.tmdb.org/t/p/w500${popular.poster_path}`}
            />
          ))}
        </section>
      </div>
      <Footer></Footer>
    </main>
  );
};

export default Home;
