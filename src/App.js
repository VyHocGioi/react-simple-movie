import { Fragment, lazy, Suspense } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import Banner from "./components/banner/Banner";
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import MovieCard from "./components/movie/MovieCard";
import MoviePageV2 from "./pages/MoviePageV2";
import NotFoundPage from "./pages/NotFoundPage";
// import MovieDetail from "./components/movie/MovieDetail";
// import MovieList from "./components/movie/MovieList";
// import HomePage from "./pages/HomePage";
// import MoviePage from "./pages/MoviePage";

const HomePage = lazy(() => import("./pages/HomePage"));
const MovieDetail = lazy(() => import("./components/movie/MovieDetail"));
const MoviePage = lazy(() => import("./pages/MoviePage"));

function App() {
  return (
    <Fragment>
      <Suspense fallback={<></>}>
        <Routes>
          <Route element={<Main></Main>}>
            <Route
              path="/"
              element={
                <Fragment>
                  <Banner></Banner>
                  <HomePage></HomePage>
                </Fragment>
              }
            ></Route>
            <Route path="/movie" element={<MoviePage></MoviePage>}></Route>
            <Route
              path="/movie/:movieId"
              element={<MovieDetail></MovieDetail>}
            ></Route>
          </Route>
          <Route
            path="*"
            element={
              <Fragment>
                <NotFoundPage></NotFoundPage>
              </Fragment>
            }
          ></Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
