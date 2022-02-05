import axios from "axios";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Divisor from "../Divisor/Divisor";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useTranslation } from "react-i18next";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className=" ">
      <ArrowForwardIosIcon
        className={className}
        style={{
          ...style,
          right: " -50px",
          color: "white",
        }}
        onClick={onClick}
      />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className=" ">
      <ArrowBackIosNewIcon
        className={className}
        style={{
          ...style,
          zIndex: 1,
          left: " -50px",
          color: "white",
        }}
        onClick={onClick}
      />
    </div>
  );
}
export default function News() {
  const [t, i18n] = useTranslation("global");
  const [data, setData] = useState([]);
  let logo = "https://logo.clearbit.com/";

  useEffect(() => {
    async function fecthData() {
      try {
        /* let options = {
          method: "GET",
          url: "https://api.newscatcherapi.com/v2/search",
          params: {
            q: "movie",
            lang: "en",
            sort_by: "relevancy",
            page: "1",
            sources: "rottentomatoes.com,cnn.com,nytimes.com",
          },
          headers: {
            "x-api-key": "sjfM4OCbxTGAUE8yFh3WSwngU7DsBxfrdgXuDGglYaM",
          },
        };
        //const getData = await axios.request(options); */
        const getData = await axios.get('http://localhost:3001/news');

        setData(getData.data.articles);
      } catch (error) {
        console.log(error);
      }
    }
    fecthData();
  }, []);

  let settings = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    arrows: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    focusOnSelect: true,

    className: "container-news",
    responsive: [
      {
        breakpoint: 600,
        settings: {
          arrows: false,
        },
      },
    ],
  };
  return (
    <div className="container">
      {/* <button onClick={fecthData}>try</button> */}
      <Divisor title={t("dividers.news")}></Divisor>

      <Slider {...settings}>
        {data?.slice(0, 7).map((element, key) => {
          return (
            <div key={key} className="news">
              <a href={element.link} target="_blank" rel="noreferrer">
                <div className="container-content">
                  <img className="img-news" src={element.media} alt="" />
                  <div className="shadow"></div>
                  <p className="date-news">
                    {element.published_date.slice(0, 9)}
                  </p>
                  <h3 className="title-news">{`${element.title.slice(
                    0,
                    125
                  )}`}</h3>
                  <p className="sumary-news">{`${element.summary.slice(
                    0,
                    300
                  )}...`}</p>
                  <div>
                    <img
                      className="logo-news"
                      src={`${logo}${element.clean_url}`}
                      alt="logo"
                    ></img>
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
// `https://newsapi.org/v2/everything?popularity&q=movie&language=en&from=2022-01-13&to=2022-01-15&sortBy=publishedAt&apiKey=8a57f5f9c91040eda543c4c779c1512c`

// {status: 'ok', total_hits: 10000, page: 1, total_pages: 200, page_size: 50, …}
// articles: Array(50)
// 0:
// author: "Adam Ali"
// authors: []
// clean_url: "ipsnews.net"
// country: "unknown"
// excerpt: "As we all know that, the world has been moving to the future at a very fast speed only because of technology. A few years ago, the way of getting entertainment was very simple and difficult. Now at…"
// is_opinion: false
// language: "en"
// link: "https://ipsnews.net/business/2022/01/10/what-are-the-advantages-of-online-movies-youtube-alternative-2022"
// media: null
// published_date: "2022-01-10 16:21:12"
// published_date_precision: "full"
// rank: 3972
// rights: null
// summary: "As we all know that, the world has been moving to the future at a very fast speed only because of technology. A few years ago, the way of getting entertainment was very simple and difficult. Now at the present times, it becomes much easier for everyone to get entertainment. Here in this article, we will discuss about getting entertainment by watching movies.\nA few years ago, people have to go to cinemas for watching movies but at present, people can enjoy movies at their own homes on different platforms like YouTube."
// title: "What are the advantages of online movies Youtube Alternative 2022"
// topic: "news"
// twitter_account: null
// _id: "1fc64c7f99de7cfc4e21cba650230155"
// _score: 8.910929
