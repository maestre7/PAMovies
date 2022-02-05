import axios from "axios";
import React, { useEffect, useState } from "react";
import Cast from "../cast/Cast";
import { useTranslation } from "react-i18next";

const BirthdayPeople = () => {
  const [data, setData] = useState([]);
  const [item, setItem] = useState([]);
  const [t, i18n] = useTranslation("global");

  let link = "https://image.tmdb.org/t/p/w500";
  /* var options = {
    method: "GET",
    url: "https://celebrity-bucks.p.rapidapi.com/birthdays/JSON",
    headers: {
      "x-rapidapi-host": "celebrity-bucks.p.rapidapi.com",
      "x-rapidapi-key": "7f4aee9aedmsh157cb8d21c481acp1acd25jsnd51dd7c23532",
    },
  }; */
  useEffect(() => {
    const axiosData = async () => {
      /* const getData = await axios.request(options); */
      const getData = await axios.get('http://localhost:3001/birthday');

      setData(getData.data.Birthdays);
    };

    axiosData();
  }, []);
  let itemData = [];
  useEffect(() => {
    data?.map((element, key) => {
      const axiosData = async () => {
        const getData = await axios.get(
          /* `https://api.themoviedb.org/3/search/person?api_key=fb1999e69926d1387eb44c3abee6e7c5&language=en-US&query=${element.name}&page=1&include_adult=false` */
          `http://localhost:3001/search/person?${element.name}`
        );

        itemData.push({
          id: getData.data.results[0].id,
          picture: link + getData.data.results[0].profile_path,
          item: element.dob,
          name: getData.data.results[0].name,
        });
        if (key === data.length - 1) {
          return setItem(itemData);
        }
      };

      return axiosData();
    });
  }, [data]);

  return (
    <>
      <Cast element={item} title={t("dividers.birthday")}></Cast>
    </>
  );
};

export default BirthdayPeople;
