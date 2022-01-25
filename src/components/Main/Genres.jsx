import React, { useState, useEffect } from "react";
import GenreType from "./GenreType";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";

export function SampleNextArrow(props) {
  const { className, style, onClick } = props;

  return (
    <div className="arrows arrow-2">
      <ArrowForwardIosIcon
        className={className}
        style={{ ...style, fontSize: "35px", color: "white", right: "-25px" }}
        onClick={onClick}
      />
    </div>
  );
}

export function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className="arrows arrow-1">
      <ArrowBackIosNewIcon
        className={className}
        style={{ ...style, fontSize: "35px", color: "white", left: "-15%" }}
        onClick={onClick}
      />
    </div>
  );
}

export default function Genres(props) {
  const navigate = useNavigate();
  const [t, i18n] = useTranslation("global");

  const [getGenresFilms, setGetGenresFilms] = useState([]);

  useEffect(() => {
    async function getData() {
      await axios
        .get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=198b2f6e124efb8ffaed4dd22cc65a8c&language=en-US`
        )
        .then((res) => {
          setGetGenresFilms(res.data.genres);
        });
    }
    getData();
  }, []);

  let dataGenres = getGenresFilms;

  let settings = {
    dots: true,
    speed: 2000,
    slidesToShow: 4,
    slidesToScroll: 3,
    initialSlide: 3,
    arrows: true,
    className: "container-slider-genres",
    focusOnSelect: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1441,
        settings: {
          slidesToShow: 3,
          centerMode: true,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          centerMode: true,
          centerPadding: "60px",
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "10px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "75px",
        },
      },
    ],
  };

  return (
    <>
      <Button
        className="buttonAll"
        onClick={() => {
          navigate(`/AllGenres`, { state: dataGenres });
        }}
      >
        {t("categories.allCategories")}
      </Button>

      <Slider {...settings}>
        {dataGenres.map((item) => (
          <div className="type-container" key={item.id}>
            <GenreType
              title={item.name}
              id={item.id}
              theme={props.genres.src}
            />
          </div>
        ))}
      </Slider>
    </>
  );
}
