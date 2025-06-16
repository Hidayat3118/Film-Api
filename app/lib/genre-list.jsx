import axios from "axios";

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
    language: "en-En",
  },
});

export const getGenre = async () => {
  try {
    const res = await tmdb.get("/genre/movie/list");
    return res.data.genres;
  } catch (err) {
    console.error("Gagal mengambil data genre", err);
    return [];
  }
};
