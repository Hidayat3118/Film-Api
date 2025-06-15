"use client";

import { useEffect, useState } from "react";
import { getPopularMovie } from "../lib/popular-api";
import CardMovie from "../component/cardMovie";
import LayoutSection from "../layout/layoutSection";

const TopRatedPage = () => {
  const [populars, setPopulars] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPopularMovie();
        setPopulars(data);
      } catch (err) {
        console.error("Error fetching upcoming data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <LayoutSection>
      {populars.map((popular) => (
        <CardMovie
          key={popular.id}
          title={popular.title}
          rating={popular.vote_average}
          date={popular.release_date}
          img={`https://image.tmdb.org/t/p/w500${popular.poster_path}`}
        />
      ))}
    </LayoutSection>
  );
};

export default TopRatedPage;
