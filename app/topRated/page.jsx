"use client";

import { useEffect, useState } from "react";
import { getTopRated } from "../lib/top-rated";
import CardMovie from "../component/cardMovie";
import LayoutSection from "../layout/layoutSection";
import SkeletonCardMovie from "../component/skeleton/skeletonCardMovie"; 

const TopRatedPage = () => {
  const [topRate, setTopRate] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTopRated();
        setTopRate(data);
      } catch (err) {
        console.error("Error fetching upcoming data:", err);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  return (
    <LayoutSection>
      {loading
        ? Array.from({ length: 12 }).map((_, index) => (
            <SkeletonCardMovie key={index} />
          ))
        : topRate.map((topRates) => (
            <CardMovie
              id={topRates.id}
              key={topRates.id}
              title={topRates.title}
              rating={topRates.vote_average}
              date={topRates.release_date}
              img={`https://image.tmdb.org/t/p/w500${topRates.poster_path}`}
            />
          ))}
    </LayoutSection>
  );
};

export default TopRatedPage;
