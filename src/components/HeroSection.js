import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../features/moviesSlice";
import Slider from "react-slick";

const HeroSection = () => {
  const dispatch = useDispatch();
  const { movies, status } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const heroSectionMovies = movies.filter(
    (movie) => movie.category === "Hero Section"
  );

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

  if (status === "succeeded" && heroSectionMovies.length === 0) {
    return <p>No movies found.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <Slider {...settings}>
        {heroSectionMovies.map((movie) => (
          <div key={movie.id}>
            <img
              src={movie.posterUrl}
              alt={movie.name}
              className="w-full h-96 object-cover rounded"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSection;
