import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard, { MovieCardSkeleton } from "./MovieCard";
import "swiper/scss";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../../config";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
//https://api.themoviedb.org/3/movie/now_playing?api_key=1af566f85ecb6a3b7bd189b25a385be8&language=en-US&page=1

const MovieList = ({ type = "now_playing" }) => {
  const { data, error } = useSWR(tmdbAPI.getMovieList(type), fetcher);
  const isLoading = !data && !error;
  const movies = data?.results || [];
  return (
    <div className="movie-list">
      {isLoading && (
        <>
          <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
          </Swiper>
        </>
      )}
      {!isLoading && (
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {movies.length > 0 &&
            movies.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  );
};

MovieList.propTypes = {
  type: PropTypes.string.isRequired,
};
function FallbackComponent() {
  return (
    <p className="bg-red-50 text-red-400">
      Something went wrong with this component{" "}
    </p>
  );
}
export default withErrorBoundary(MovieList, {
  FallbackComponent,
});
