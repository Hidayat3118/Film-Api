"use client";

import { useEffect, useState } from "react";
import { getTopRated } from "../lib/top-rated";
import CardMovie from "../component/cardMovie";
import LayoutSection from "../layout/layoutSection";

const TopRatedPage = () => {
  const [rateds, setRateds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTopRated();
        setRateds(data);
      } catch (err) {
        console.error("Error fetching upcoming data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <LayoutSection>
      {rateds.map((rated) => (
        <CardMovie
          key={rated.id}
          title={rated.title}
          rating={rated.vote_average}
          date={rated.release_date}
          img={`https://image.tmdb.org/t/p/w500${rated.poster_path}`}
        />
      ))}
    </LayoutSection>
  );
};

export default TopRatedPage;
