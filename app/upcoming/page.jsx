"use client";

import { useEffect, useState } from "react";
import { Upcoming as fetchUpcoming } from "../lib/upcoming";
import CardMovie from "../component/cardMovie";
import SkeletonCardMovie from "../component/skeleton/skeletonCardMovie"; 
import LayoutSection from "../layout/layoutSection";

const UpcomingPage = () => {
  const [comings, setComings] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUpcoming();
        setComings(data);
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
        : comings.map((coming) => (
            <CardMovie
              key={coming.id}
              title={coming.title}
              rating={coming.vote_average}
              date={coming.release_date}
              img={`https://image.tmdb.org/t/p/w500${coming.poster_path}`}
            />
          ))}
    </LayoutSection>
  );
};

export default UpcomingPage;
