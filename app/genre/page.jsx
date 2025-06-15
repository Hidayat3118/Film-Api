// "use client";

// import { useEffect, useState } from "react";
// import { getGenre } from "../lib/genre";
// import CardMovie from "../component/cardMovie";
// import LayoutSection from "../layout/layoutSection";

// const TopRatedPage = () => {
//   const [genres, setGenres] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getGenre();
//         setRateds(data);
//       } catch (err) {
//         console.error("Error fetching upcoming data:", err);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <></>
//   );
// };

// export default TopRatedPage;
