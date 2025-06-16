import axios from "axios";

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
    language: "en-En",
  },
});

export const getMoviesByGenre  = async (genreId) => {
  try {
    const res = await tmdb.get("/discover/movie", {
      params: genreId ? { with_genres: genreId } : {},
    });
    return res.data.results; 
  } catch (err) {
    console.error("Gagal mengambil data by genre", err);
    return [];
  }
};
