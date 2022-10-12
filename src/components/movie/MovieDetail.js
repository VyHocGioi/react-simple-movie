import React from "react";
import { useParams } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import { apiKey, fetcher, tmdbAPI } from "../../config";
import MovieCard from "./MovieCard";

// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>
// https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>

const MovieDetail = () => {
  const { movieId } = useParams();
  const { data, error } = useSWR(tmdbAPI.getMovieDetail(movieId), fetcher);
  console.log(data);
  if (!data) return null;
  const { poster_path, backdrop_path, title, genres, overview } = data;
  return (
    <div className="py-10">
      <div className="w-full h-[600px] relative">
        <div className="absolute inset-0 bg-black bg-opacity-50 "></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${tmdbAPI.imageOriginal(backdrop_path)})`,
          }}></div>
      </div>
      <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
        <img
          src={tmdbAPI.imageOriginal(poster_path)}
          className="w-full h-full object-cover rounded-xl"
          alt=""
        />
      </div>
      <h1 className="text-center text-white text-4xl font-bold mb-10">
        {title}
      </h1>
      {genres.length > 0 && (
        <div className="flex items-center justify-center gap-x-5 mb-10">
          {genres.map((item) => (
            <span
              key={item.id}
              className="py-2 px-4 border border-primary text-primary">
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="text-center text-sm text-white leading-relaxed max-w-[600px] mx-auto mb-10">
        {overview}
      </p>
      <MovieMeta type="credits"></MovieMeta>
      <MovieMeta type="videos"></MovieMeta>
      <MovieVideo></MovieVideo>
      <MovieMeta type="similar"></MovieMeta>

      {/* <MovieCredits></MovieCredits>
      <MovieVideo></MovieVideo>
      <MovieSimilar></MovieSimilar> */}
    </div>
  );
};

function MovieCredits() {
  const { movieId } = useParams();

  const { data, error } = useSWR(tmdbAPI.getMovieCredit(movieId), fetcher);
  const { cast } = data || {};
  if (!cast || cast.length <= 0) return null;
  return (
    <div className="py-10">
      <h2 className="text-center text-3xl mb-10 text-white ">Cast</h2>
      <div className="grid grid-cols-4 gap-5">
        {cast.slice(0, 4).map((item) => (
          <div
            className="cast-item"
            key={item.id}>
            <img
              src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
              // src={tmdbAPI.imageOriginal(item.profile_path)}
              alt=""
              className="w-full h-[350px] object-cover rounded-lg mb-3"
            />
            <h3 className="text-white text-xl font-medium">{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

function MovieVideo() {
  const { movieId } = useParams();
  const { data, error } = useSWR(tmdbAPI.getMovieDetail(movieId), fetcher);
  console.log(data);
  if (!data) return null;
  return (
    <div className="py-10">
      <div className="flex flex-col gap-5">
        <div className="text-white w-full aspect-video">
          <iframe
            width="1154"
            height="721"
            src={`https://www.2embed.to/embed/tmdb/movie?id=${movieId}`}
            title="MyFrame"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full  "></iframe>
        </div>
      </div>
    </div>
  );
}
function MovieSimilar() {
  const { movieId } = useParams();
  const { data, error } = useSWR(tmdbAPI.getMovieSimilar(movieId), fetcher);
  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  console.log(results);
  return (
    <div className="py-10">
      <h2 className="text-3xl font-medium mb-10 text-white">Similar movies</h2>
      <div className="movie-list">
        <Swiper
          grabCursor={"true"}
          spaceBetween={40}
          slidesPerView={"auto"}>
          {results.length > 0 &&
            results.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}

function MovieMeta({ type = "videos" }) {
  const { movieId } = useParams();
  const { data, error } = useSWR(
    tmdbAPI.getMovieVideos(movieId, type),
    fetcher
  );
  if (!data) return null;
  if (type === "credits") {
    const { cast } = data || {};
    if (!cast || cast.length <= 0) return null;
    return (
      <div className="py-10">
        <h2 className="text-center text-3xl mb-10 text-white ">Cast</h2>
        <div className="grid grid-cols-4 gap-5">
          {cast.slice(0, 4).map((item) => (
            <div
              className="cast-item"
              key={item.id}>
              <img
                src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
                // src={tmdbAPI.imageOriginal(item.profile_path)}
                alt=""
                className="w-full h-[350px] object-cover rounded-lg mb-3"
              />
              <h3 className="text-white text-xl font-medium">{item.name}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    const { results } = data;
    if (!results || results.length <= 0) return null;
    if (type === "videos")
      return (
        <div className="py-10">
          <div className="flex flex-col gap-5">
            {results.slice(0, 5).map((item) => (
              <div key={item.id}>
                <h3 className=" mb-5 text-xl font-medium text-white bg-secondary inline-block">
                  {item.name}
                </h3>
                <div className="text-white w-full aspect-video">
                  <iframe
                    width="1154"
                    height="721"
                    src={`https://www.youtube.com/embed/${item.key}`}
                    title={item.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full  "></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    if (type === "similar")
      return (
        <div className="py-10">
          <h2 className="text-3xl font-medium mb-10 text-white">
            Similar movies
          </h2>
          <div className="movie-list">
            <Swiper
              grabCursor={"true"}
              spaceBetween={40}
              slidesPerView={"auto"}>
              {results.length > 0 &&
                results.map((item) => (
                  <SwiperSlide key={item.id}>
                    <MovieCard item={item}></MovieCard>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      );
  }
}

export default MovieDetail;
