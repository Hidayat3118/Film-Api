import axios from "axios";

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
    language: "id-ID",
  },
});

export const getPopularMovie = async () => {
  try {
    const response = await tmdb.get("/movie/popular");
    return response.data.results;
  } catch (error) {
    console.log("gagal Ambil data movie popular", error);
    return [];
  }
};
