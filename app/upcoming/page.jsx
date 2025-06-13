"use client";

import { useEffect, useState } from "react";
import { Upcoming as fetchUpcoming } from "../lib/upcoming";
import CardMovie from "../component/cardMovie";
import LayoutSection from "../layout/layoutSection";

const UpcomingPage = () => {
  const [comings, setComings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUpcoming();
        setComings(data);
      } catch (err) {
        console.error("Error fetching upcoming data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <LayoutSection>
      {comings.map((coming) => (
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
