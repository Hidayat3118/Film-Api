"use client";
import { getPopularMovie } from "./lib/popular-api";
import { getNowPlaying } from "./lib/now-playing";
import { getGenre } from "./lib/genre-list";
import { useEffect, useState } from "react";
import CardMovie from "../app/component/cardMovie";
import CardSlider from "./component/cardSlider";
import Footer from "../app/component/footer";
import Navbar from "../app/component/navbar";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Home = () => {
  // const [populars, setPopulars] = useState([]);
  const [playings, setPlayings] = useState([]);
  const [genres, setGenres] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await getPopularMovie();
  //       setPopulars(data);
  //     } catch (err) {
  //       console.error("Error fetch popular:", err);
  //     }
  //   };
  //   fetchData();
  // }, []);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGenre();
        setGenres(data);
      } catch (err) {
        console.error("Error fetching genre data:", err);
      }
    };

    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <main className="bg-gray-100">
      <Navbar></Navbar>
      <div className="container mx-auto min-h-screen">
        {/* Movie Terbaru - Carousel */}
        <section className="py-10 px-3 md:px-0 bg-gray-100 mt-16 md:mt-20 lg:mt-20 overflow-hidden ">
          <Slider {...settings}>
            {playings.map((playing) => (
              <CardSlider
                key={playing.id}
                title={playing.title}
                rating={playing.vote_average}
                popularity={playing.popularity}
                img={`https://image.tmdb.org/t/p/original${playing.backdrop_path}`}
              />
            ))}
          </Slider>
        </section>
        {/* button genre */}
        <section className="lg:flex flex lg:flex-wrap gap-2 lg:gap-3 text-sm md:text-base lg:text-lg mx-3 lg:px-0 lg:items-center lg:justify-center overflow-x-auto whitespace-nowrap px-3 py-4">
          {genres.map((genre) => (
            <button
              key={genre.id}
              className="border border-red-400 text-gray-700 font-semibold rounded-full py-2 hover:scale-105 px-6 shadow hover:bg-red-500 hover:text-white cursor-pointer duration-300"
            >
              {genre.name}
            </button>
          ))}
        </section>

        {/* Movie Populer - Grid */}
        {/* <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 lg:gap-5 xl:gap-10 px-3 md:px-0 mt-4 lg:mt-6">
          {populars.map((popular) => (
            <CardMovie
              key={popular.id}
              title={popular.title}
              rating={popular.vote_average}
              date={popular.release_date}
              img={`https://image.tmdb.org/t/p/w500${popular.poster_path}`}
            />
          ))}
        </section> */}
      </div>
      <Footer></Footer>
    </main>
  );
};

export default Home;
