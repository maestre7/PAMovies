import React ,{useState} from 'react';
import { useNavigate } from "react-router-dom";
import ListGenres from '../ListGenres/listGenres';


function GenreType(props) {
    const [myID, setMyId] = useState(
        {id : props.id, 
        title: props.title}
        )  
    const navigate = useNavigate();
   
    function handleChange (){
    setMyId (myID.id)
    }
    
    let newid = myID.id
    let newtitle = myID.title

      return (
       
        <div className='type-container'
        newid={myID.id}
        newtitle ={myID.title}
        onClick={handleChange} 
        onClick={() => {
            {console.log(newid)} 
            {console.log(newtitle)}       
            navigate(`/Genres/${newtitle}/${newid}/`);
          }} 
        key={newid}>
         
            <img src={props.theme}
                className='image-film'
                width={'125px'} 
                height={'200px'}
                alt="film" />
            <div>
                <p className='centerGender'>{props.title}</p>
            </div>
        </div>
    )
}
export default GenreType;
