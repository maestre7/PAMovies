import Description from "../components/Details/Description";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { filmDetail } from "../components/Details/Data";
import Presentation from "../components/Details/Presentation";
import { Normalizer } from './../components/Details/Normalizer'
import DetailTrailer from "../components/Details/DetailTrailer";
import Cast from "../components/cast/Cast";
const Details = ({ state }) => {
  const [rating, setRating] = useState(0); //Rating para las estrellas
  const [casting, setCasting] = useState([]) //Reparto de la pelicula
  const [director, setDirector] = useState("");
  const [item, setItem] = useState(filmDetail); //Pasara a ser o bien una llamada a la Api o el objeto que reciba por prop
  const params = useParams(); //Parametros de la URL

  //Url necesaria para las imagenes
  const urlForImages = "https://image.tmdb.org/t/p/w500/";

  //Llamada a la api

  useEffect(() => {
    const requestApi = async () => {
      const id = params.id;
      const type = params.type;
      const ApiKey = "07e793aeac523d9f4455050b060257c7";

      //Esta url serviria para cualquiera de las 3 busquedas
      const URLPrincipal = `https://api.themoviedb.org/3/${type}/${id}?api_key=${ApiKey}&language=en-US`;
      await fetch(URLPrincipal)
        .then((res) => res.json())
        .then((data) => {
          setItem(Normalizer(data, type));
        });
      if (type === "movie") {
        const URLReparto = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${ApiKey}&language=en-US`;
        await fetch(URLReparto)
          .then((res) => res.json())
          .then((data) => {
            setCasting(Object.values(data.cast))
            setDirector(data.crew[0])
          })
      }
    };
    requestApi();
  }, [params]);

  const selectScore = (value) => {
    setRating(value);
  };

  //Controlando renders innecesarios
  console.log("Renderizado en details");

  return (
    <>
      <div className="container">
        <Presentation
          urlImage={urlForImages + item.photo_principal} // 2 strings
          item={item} //Objeto con datos de la api
          rating={rating} //Rating obtenido de mockeo en filmdetail
          selectScore={selectScore} //Funcion para interactuar con el rating
          casting={casting} //Array de Objetos
          director={director} //Array de Objetos (proximamente)
        />

        <Description
          item={item} //Objeto con datos de la api
        />

        {item.video !== null ? <DetailTrailer id={params.id} /> : null} {/* Int */}


      </div>
      {item.video !== null ? <Cast id={params.id}></Cast> : null} {/* Int */}
    </>
  );
};

export default Details;
