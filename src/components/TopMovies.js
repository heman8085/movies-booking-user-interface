import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../features/moviesSlice";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const TopMovies = () => {
  const dispatch = useDispatch();
  const { movies, status } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const topMovies = movies.filter(
    (movie) => movie.category === "Top Movies in Theaters"
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
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

  if (status === "succeeded" && topMovies.length === 0) {
    return <p>No movies found.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Top Movies in Theaters</h1>
      <Slider {...settings}>
        {topMovies.map((movie) => (
          <div key={movie.id} className="relative h-96">
            <Link to={`/movie/${movie.id}`}>
              <img
                src={movie.posterUrl}
                alt={movie.name}
                className="w-full h-full object-cover rounded"
              />
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TopMovies;
