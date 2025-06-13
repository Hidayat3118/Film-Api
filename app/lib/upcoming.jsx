import axios from "axios";

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
    language: "id-ID",
  },
});

export const Upcoming = async () => {
  try {
    const response = await tmdb.get("/movie/upcoming");
    return response.data.results;
  } catch (error) {
    console.log("gagal Ambil data movie upcoming", error);
    return [];
  }
};
