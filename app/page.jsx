"use client";

import { useEffect, useState } from "react";
import { getNowPlaying } from "./lib/now-playing";
import { getGenre } from "./lib/genre-list";
import { getMoviesByGenre } from "./lib/by-genre";
import CardMovie from "../app/component/cardMovie";
import CardSlider from "./component/cardSlider";
import SkeletonCardSlider from "./component/skeleton/skeletonCardSlider";
import SkeletonCardMovie from "./component/skeleton/skeletonCardMovie";
import Footer from "../app/component/footer";
import Navbar from "../app/component/navbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Home = () => {
  const [playings, setPlayings] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const [isLoadingSlider, setIsLoadingSlider] = useState(true);
  const [isLoadingMovies, setIsLoadingMovies] = useState(true);
  const [isLoadingGenres, setIsLoadingGenres] = useState(true);

  // Slider: Now Playing
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNowPlaying();
        setPlayings(data);
      } catch (err) {
        console.error("Error fetch playing:", err);
      } finally {
        setIsLoadingSlider(false);
      }
    };
    fetchData();
  }, []);

  // Genre List
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getGenre();
        setGenres(data);
      } catch (err) {
        console.error("Error fetching genre data:", err);
      } finally {
        setIsLoadingGenres(false);
      }
    };
    fetchGenres();
  }, []);

  // Movie List by Genre
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoadingMovies(true);
        const data = await getMoviesByGenre(selectedGenre);
        setMovies(data);
      } catch (err) {
        console.error("Error fetching movies:", err);
      } finally {
        setIsLoadingMovies(false);
      }
    };
    fetchMovies();
  }, [selectedGenre]);

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
      <Navbar />
      <div className="container mx-auto min-h-screen">
        {/* Slider Section */}
        <section className="py-10 px-3 md:px-0 mt-16 md:mt-20 overflow-hidden">
          {isLoadingSlider ? (
            <SkeletonCardSlider />
          ) : (
            <Slider {...settings}>
              {playings.map((playing) => (
                <CardSlider
                  id={playing.id}
                  key={playing.id}
                  title={playing.title}
                  rating={playing.vote_average}
                  popularity={playing.popularity}
                  img={`https://image.tmdb.org/t/p/original${playing.backdrop_path}`}
                />
              ))}
            </Slider>
          )}
        </section>

        {/* Genre Filter Section */}
        <section className="lg:flex lg:flex-wrap flex gap-2 lg:gap-3 text-sm md:text-base lg:text-lg mx-3 px-3 py-4 lg:px-0 items-center lg:justify-center overflow-x-auto whitespace-nowrap">
          {isLoadingGenres ? (
            Array.from({ length: 15 }).map((_, index) => (
              <div
                key={index}
                className="md:w-32 min-w-20 h-10 md:h-12 bg-gray-300 rounded-full animate-pulse"
              ></div>
            ))
          ) : (
            <>
              <button
                onClick={() => setSelectedGenre(null)}
                className={`border ${
                  selectedGenre === null
                    ? "bg-red-500 text-white"
                    : "border-red-400 text-gray-700"
                } font-semibold rounded-full py-2 px-6 shadow hover:bg-red-500 hover:text-white duration-300 cursor-pointer`}
              >
                All
              </button>
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => setSelectedGenre(genre.id)}
                  className={`border ${
                    selectedGenre === genre.id
                      ? "bg-red-500 text-white"
                      : "border-red-400 text-gray-700"
                  } font-semibold rounded-full py-2 px-6 shadow hover:bg-red-500 hover:text-white duration-300 cursor-pointer`}
                >
                  {genre.name}
                </button>
              ))}
            </>
          )}
        </section>

        {/* Movies Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6  gap-3 md:gap-4 lg:gap-4 xl:gap-6 px-3 md:px-0 mt-4 lg:mt-6">
          {isLoadingMovies ? (
            Array.from({ length: 12 }).map((_, index) => (
              <SkeletonCardMovie key={index} />
            ))
          ) : movies.length > 0 ? (
            movies.map((movie) => (
              <CardMovie
                key={movie.id}
                id={movie.id}
                title={movie.title}
                img={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                rating={movie.vote_average}
                date={movie.release_date}
              />
            ))
          ) : (
            <p className="col-span-full text-center">Tidak ada film.</p>
          )}
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default Home;
