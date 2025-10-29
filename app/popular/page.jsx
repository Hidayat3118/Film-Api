"use client";

import { useEffect, useState } from "react";
import { getPopularMovie } from "../lib/popular-api";
import CardMovie from "../component/cardMovie";
import SkeletonCardMovie from "../component/skeleton/skeletonCardMovie";
import LayoutSection from "../layout/layoutSection";

const PopularPage = () => {
  const [populars, setPopulars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPopularMovie();
        setPopulars(data);
      } catch (err) {
        console.error("Error fetching popular data:", err);
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
        : populars.map((popular) => (
            <CardMovie
              id={popular.id}
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

export default PopularPage;
