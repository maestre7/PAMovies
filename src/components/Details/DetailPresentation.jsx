import { Link } from "react-router-dom"
import DetailValorations from "./DetailValorations"
import { filmDetail } from "./Data"
import { useEffect } from "react"

const DetailPresentation = (props) => {

    //Route detecta que estamos en la misma ruta, asi que creamos un objeto sustituto con una clave unica para forzarlo
    const routeLink = (id) => {
        return {
            pathname: `/details/person/${id}`,
            key: Math.random(), // we could use Math.random, but that's not guaranteed unique.
            state: {
                applied: true
            }
        }
    }

    useEffect(() => {

    }, [props])

    return (
        <section className="details--main-container">
            <div className="details--frame-photo">
                <img src={props.urlImage} alt={`Poster de ${props.item.name}`} />
            </div>

            <div className="details--interior-container">
                <p className="details--title">{props.item.name}</p>
                <div className="details--interior-row details--interior-row-extra">
                    <p>{props.item.date}</p>
                    <DetailValorations
                        puntuation={props.rating}
                        rating={filmDetail.rating}
                        selectScore={props.selectScore}
                    />
                </div>
                <div className="details--interior-row">
                    <p>Countrie:</p>
                    {props.item.countries !== undefined ? props.item.countries.map((element, index) => <p key={index} className="details--link">{element}</p>) : null}
                </div>
                <div className="details--interior-row">
                    <p>Director:</p>
                    <Link className={"details--casting"} to={routeLink(props.director.id)}>{props.director.name}</Link>
                </div>
                <div className="details--interior-row">
                    <p>Reparto:</p>
                    {props.casting.map((element, index) => index < 15 ? <Link key={index} className={"details--casting"} to={routeLink(element.id)}>{element.name}</Link> : null)}
                </div>
            </div>
        </section>
    )
}

export default DetailPresentation