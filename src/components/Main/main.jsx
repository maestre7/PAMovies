import React, { useState, useEffect } from "react";
import axios from "axios";
import { genres } from "./data-main";
import Genres from "./Genres";
import NewFilms from "./NewFilms";
import Divisor from "../Divisor/Divisor";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import Randomizer from "../Randomizer/Randomizer";
import { useLocalStorage } from "../Randomizer/CustomStorageAux";

export default function Main() {
  const [keys, setKeys] = useState(undefined);
  const location = useLocation().state;
  const [modal, setModal] = useState(location !== undefined && location !== null ? !location.modal : true);
  const [auxLocal, setAuxLocal] = useLocalStorage('auxiliarRandom', keys !== undefined ? keys : undefined)
  const [getFilms, setGetFilms] = useState([]);
  const [t] = useTranslation("global");
  useEffect(() => {
    //obtenemos los datos de peliculas de estrenos
    async function getInfo() {
      //`https://api.themoviedb.org/3/movie/upcoming?api_key=198b2f6e124efb8ffaed4dd22cc65a8c&language=en-US&page=1adult=false`
      await axios
        .get(
          `${process.env.REACT_APP_API1}/movie/upcoming`
        )
        .then((res) => {
          setGetFilms(res.data.results);
          const ids = res.data.results.map(element => element.id)
          setKeys(ids)
          setAuxLocal(ids)
        });
    }
    getInfo();
  }, []);

  let data = getFilms;

  return (
    <>
    {
    (location !== undefined && location !== null)
      ? location.modal === modal
      ? <Randomizer modal={modal} setModal={setModal} keys={keys} /> 
      : null 
      : null
    } 

      <div className="container">
        <Divisor title={t("dividers.premieres")}></Divisor>
        <div className="main-container background-color">
          <NewFilms data={data} />
        </div>
      </div>
      <div className="container">
        <div>
          <Divisor title={t("dividers.categories")}></Divisor>
        </div>
      </div>
      <div className="container-genres">
        <Genres genres={genres} data={data} />
      </div>
    </>
  );
}
