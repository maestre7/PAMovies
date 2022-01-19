import { useState, useEffect } from "react";
import Divisor from "../Divisor/Divisor";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import NavBox from "../NavBox/NavBox";

const DetailTrailer = (props) => {
    const [film, setFilm] = useState();
    const [libraryFilms, setLibraryFilms] = useState([]);
    const [index, setIndex] = useState(0);
    const [tab, setTab] = useState(0)
    const numItems = 6;

    const requestApi = async () => {
        const id = props.id;
        const ApiKey = "07e793aeac523d9f4455050b060257c7";
        const URL = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${ApiKey}&language=en-US`;

        await fetch(URL)
            .then((res) => res.json())
            .then((data) => {
                setFilm(data.results[index]);
                setLibraryFilms(data.results)
            });
    };

    const newIndex = (filmSelect) => {
        setFilm(filmSelect)
        let indice = 0;
        libraryFilms.find((element, index) => element.key === filmSelect.key ? indice = index : null)
        setIndex(indice)
    }

    const ChangeTab = (e) => {

        if (e.currentTarget.value === 'back') {
            let numMax = (libraryFilms.length / numItems) - 1

            if (index <= 0) {
                setIndex(libraryFilms.length - 1)
                setTab(numMax)
            } else {
                setIndex(index - 1)
            }

            const comp = index % numItems === 0 ? true : false;
            if (comp) {
                setTab(tab > 0 ? tab - 1 : numMax);
            }

        } else if (e.currentTarget.value === 'next') {
            const indice = index + 1;

            if (indice >= libraryFilms.length) {
                setIndex(0)
            } else {
                setIndex(index + 1)
            }

            const comp = indice % numItems === 0 || indice % numItems === 1 ? true : false;
            if (comp) {
                let aux = tab + 1
                //console.log(aux < libraryFilms.length / numItems)
                setTab(aux < libraryFilms.length / numItems ? tab + 1 : 0);
            }
        }
    }

    useEffect(() => {
        requestApi();
    }, [props])

    useEffect(() => {
        setFilm(libraryFilms[index])
    }, [index])

    useEffect(() => {

    }, [tab])

    return (
        <section className="details--main-container details--main-column">
            <Divisor title="Videos" />
            <section className='details--section'>
                <p className="details--title details--padding-title">{libraryFilms[index] !== undefined ? libraryFilms[index].name : null}</p>
                <div className="details--interior-row">

                    <div className="details--interior-row-nowrap">
                        <button className="details--scenes details--button" onClick={e => ChangeTab(e)} value={"back"}><ArrowBackIosIcon /></button>
                        <iframe className="details--frame-video" src={`https://www.youtube.com/embed/${libraryFilms[index] !== undefined ? libraryFilms[index].key : null}`}
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                        <button className="details--scenes details--button" onClick={e => ChangeTab(e)} value={'next'}><ArrowForwardIosIcon /></button>
                    </div>

                    {libraryFilms.length > 0 ?
                        <NavBox
                            libraryFilms={libraryFilms}
                            filmSelect={film}
                            index={index}
                            newIndex={newIndex}
                            newTab={tab}
                            setTab={setTab}
                        /> : null}

                </div>
            </section>
        </section>
    )
}

export default DetailTrailer