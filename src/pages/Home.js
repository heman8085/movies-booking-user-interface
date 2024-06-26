// import React from "react";
// import MovieList from "../components/MoviesList"

// const Home = () => {
//   return (
//     <div className="container mx-auto p-4">
//       {/*here add a carousel which dispaly the poster of the movie with the full width  of the screen*/}
//       <h1 className="text-3xl font-bold mb-4">Now Playing</h1>
//       <MovieList />
//       <h1 className="text-3xl font-bold mb-4">Top Movies in theaters</h1>
//       {/* here add carousel of movie poster and trailer link*/}
//     </div>
//   );
// };

// export default Home;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../features/moviesSlice";
import Slider from "react-slick";

const Home = () => {
  const dispatch = useDispatch();
  const { movies, status } = useSelector((state) => state.movies);

  useEffect(() => {
    console.log("Dispatching fetchMovies action");
    dispatch(fetchMovies());
  }, [dispatch]);

  useEffect(() => {
    console.log("Status:", status);
    console.log("Movies:", movies);
  }, [status, movies]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Failed to load movies</p>;
  }
 if (status === "succeeded" && movies.length === 0) {
   return <p>No movies found.</p>;
 }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Now Playing</h1>
      <>
        <Slider {...settings}>
          {movies.map((movie) => (
            <div key={movie.id}>
              <img
                src={movie.posterUrl}
                alt={movie.name}
                className="w-full h-96 object-cover rounded"
              />
            </div>
          ))}
        </Slider>

        <h1 className="text-3xl font-bold mb-4">Top Movies in Theaters</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <div key={movie.id}>
              <img
                src={movie.posterUrl}
                alt={movie.name}
                className=" h-96 object-cover rounded"
              />
              <div className="text-center mt-2">
                <a
                  href={movie.trailerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  Watch Trailer
                </a>
              </div>
            </div>
          ))}
        </div>
      </>
    </div>
  );
};

export default Home;






