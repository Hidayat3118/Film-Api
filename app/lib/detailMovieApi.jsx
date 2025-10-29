import axios from "axios";

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
    language: "id-ID", 
  },
});

export const getDetailMovie = async (id) => {
  try {
   
    const response = await tmdb.get(`/movie/${id}`);
    let movie = response.data;

   
    if (!movie.overview) {
      const fallback = await tmdb.get(`/movie/${id}`, {
        params: { language: "en-US" },
      });
      movie.overview = fallback.data.overview;
    }

    return movie;
  } catch (error) {
    console.log("gagal ambil data detail movie", error);
    return null;
  }
};
