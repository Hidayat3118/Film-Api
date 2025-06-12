"use client";
import { getPopularMovie } from "./lib/popular-api";
import { getNowPlaying } from "./lib/now-playing";
import { useEffect, useState } from "react";
import CardMovie from "../app/component/cardMovie";
import CardPagination from "../app/component/cardPagination";

const Home = () => {
  // movie pupular
  const [populars, setPopulars] = useState([]);
  const [playings, setPlayings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPopularMovie();
      setPopulars(data);
    };
    fetchData();
  }, []);

  // movie terbaru
  useEffect(() => {
    const fetchData = async () => {
      const data = await getNowPlaying();
      setPlayings(data);
    };
    fetchData();
  }, []);

  return (
    <main className="container mx-auto">
      {/* movie terbaru */}
      <div className="grid grid-cols-1">
        {playings.map((playing) => (
          <CardPagination
            key={playing.id}
            title={playing.title}
            rating={playing.vote_average}
            popularity={playing.popularity}
            img={`https://image.tmdb.org/t/p/original${playing.backdrop_path}`}
          />
        ))}
      </div>
      {/* card movie popular */}
      <div className="grid grid-cols-5 gap-10">
        {populars.map((popular) => (
          <CardMovie 
            key={popular.id}
            title={popular.title}
            rating={popular.vote_average}
            img={`https://image.tmdb.org/t/p/w500${popular.poster_path}`}
          />
        ))}
      </div>
    </main>
  );
};

export default Home;
