import ButtonTranslations from "./buttomTranslate";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

export default function Nav() {
  const [t, i18n] = useTranslation("global");
  const navigate = useNavigate();
  const [viewModal, setViewModal] = useState(true);
  const [getFilms, setGetFilms] = useState([]);

  useEffect(() => {
    async function getInfo() {
      await axios
        .get(
          //`https://api.themoviedb.org/3/movie/upcoming?api_key=198b2f6e124efb8ffaed4dd22cc65a8c&language=en-US&page=1adult=false`
          `${process.env.REACT_APP_API1}/movie/upcoming`
        )
        .then((res) => {
          setGetFilms(res.data.results);
        });
    }
    getInfo();
  }, []);
  
  const titles = {
    premieres: `/AllPremieres`,
    genres: '/AllGenres',
    about: `/AboutUs`,
    raiz: `/`
  }

  let data = getFilms;

  useEffect(() =>{
  },[])

  const decision = () => {

    if(url === titles.genres){
      navigate(url, 
      {state: {modal: viewModal, msg:'/'+url, toPage: titles.genres}})

    }else if(url === titles.premieres){
      navigate(url, 
      {state: {modal: viewModal, auxiliarKeys: data, msg:'/'+url, toPage: titles.premieres }})

    }else if(url === titles.about){
      navigate(url, 
      {state: {modal: viewModal, auxiliarKeys: null, msg:'/'+url, toPage: titles.about}})

    }else if(!Object.values(titles).includes(url)){
      navigate(url, 
      {state: {modal: viewModal, auxiliarKeys: null, msg:'/'+url === titles.genres, toPage: "Raiz"}})

    }else{
      navigate(titles.raiz, 
      { state: {modal: viewModal}});
    }

    setViewModal(!viewModal)
  }
  
  //Debe reemplazarse con la direccion base de PamVideos
  //https://pam-movies.vercel.app
  const takeURL = (value) => {
    return value.replace("https://pam-movies.vercel.app", "")
  }

  const url = takeURL(window.location.href)

  return (
    <>
      <nav className="nav">
        <p 
        className="views-nav"
        onClick={() => {decision()}}
        >
          Randomize
        </p>
        <p
          className="views-nav"
          onClick={() => {
            navigate(titles.premieres, { state: {modal: !viewModal, auxiliarKeys: data} });
          }}
        >
          {t("dividers.premieres")}
        </p>
        <p
          className="views-nav"
          onClick={() => {
            navigate(titles.genres, { state: {modal: !viewModal} });
          }}
        >
          {t("dividers.categories")}
        </p>
        <p
          className="views-nav"
          onClick={() => {
            navigate(titles.about, {modal: !viewModal});
          }}
        >
          {t("aboutUs")}
        </p>
        <ButtonTranslations></ButtonTranslations>
      </nav>
    </>
  );
}
