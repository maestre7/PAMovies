import React, {useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { genres } from "../Main/data-main";
import Divisor from "../Divisor/Divisor";
import Randomizer from "../Randomizer/Randomizer";
import { useLocalStorage } from "../Randomizer/CustomStorageAux";
import axios from "axios";

export default function AllGenres() {
  const location = useLocation().state
  const navigate = useNavigate();
  const [modal, setModal] = useState(location !== undefined && location !== null ? !location.modal : false);
  // eslint-disable-next-line no-unused-vars
  const [auxLocal, setAuxLocal] = useLocalStorage('auxiliarRandom', "")
  const [getGenresFilms, setGetGenresFilms] = useState([]);
  //Obtenemos un listado de todas las categorías disponibles para poder mostrarlas a la vez y mandar el id correspondiente a cada una de ellas.
  useEffect(() => {
    async function getData() {
      await axios
        .get(
          /* `https://api.themoviedb.org/3/genre/movie/list?api_key=198b2f6e124efb8ffaed4dd22cc65a8c&language=en-US` */
          `${process.env.REACT_APP_API1}/genre/movie/list`
        )
        .then((res) => {
          setGetGenresFilms(res.data.genres);
        });
    }
    getData();
  }, []);

  return (
    <>
        {
    (location !== undefined && location !== null)
      ? location.modal === modal
      ? <Randomizer modal={modal} setModal={setModal} keys={auxLocal} /> 
      : null 
      : null
    } 

    {getGenresFilms !== undefined && getGenresFilms !== null 
    ? <div className="container">
    <Divisor title="ALL CATEGORIES"></Divisor>
    <div className="containerGenres ">
      {getGenresFilms.map((element) => (
        <div
          className="type-container"
          key={element.id}
          onClick={() => {
            navigate(`/Genres/${element.name}/${element.id}`);
          }}
        >
          <img
            src={genres.src}
            height={240}
            width={150}
            alt="genre"
            className="image-genres"
          />
          <p className="centerGender big">{element.name}</p>
        </div>
      ))}
    </div>
  </div> : null}
    </>
  );
}
