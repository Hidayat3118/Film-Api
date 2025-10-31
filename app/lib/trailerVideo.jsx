import axios from "axios";

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
    language: "id-ID",
  },
});

export const getMovieTrailer = async (id) => {
  try {
    let response = await tmdb.get(`/movie/${id}/videos`, {
      params: { language: "id-ID" },
    });
    let videos = response.data.results;

    if (!videos.length) {
      // fallback ke bahasa Inggris kalau kosong
      response = await tmdb.get(`/movie/${id}/videos`, {
        params: { language: "en-US" },
      });
      videos = response.data.results;
    }

    const trailer =
      videos.find((v) => v.site === "YouTube" && v.type === "Trailer") ||
      videos.find((v) => v.site === "YouTube" && v.type === "Teaser");

    return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
  } catch (error) {
    console.error("Gagal ambil trailer:", error);
    return null;
  }
};
