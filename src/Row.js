import React, {useState,useEffect} from 'react'
import axios from "./axios";
import './row.css';
import Youtube from "react-youtube";
import movieTrialer from "movie-trailer";

const baseURL = "https://images.tmdb.org/t/p/original";

function Row(props) {
    const[movies,setMovies] = useState([]);
    const [trailerUrl,settrailerUrl] = useState("");

    const handleClick=(movie)=>{
        if(trailerUrl){
            settrailerUrl("");
        }
        else{
            movieTrialer(movie?.name|| movie.title || "").then(url=>{
                const urlParams=new URLSearchParams(new URL(url).search);
                settrailerUrl(urlParams.get("v"));
            }).catch((err)=>console.log(err))
        }
    }

    useEffect(()=>{
        async function getAllMovies(){
            const movies = await axios.get(props.fetchURL);
            setMovies(movies.data.results);
            return movies;
        }
        getAllMovies();
    },[props.fetchURL])

    const opts = {
height: "390",
width:"100%",
playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    }

  return (
    <div className="row">
        <h2>{props.title}</h2>
        <div className="row_shows">
            {movies.map(show=>(
                //console.table(`${baseURL}${show.poster_path}`);
                <img key={show.id} onClick={()=>handleClick(show)} className={`img_show  ${props.isLargeRow && "larger-row"}`}src={`${baseURL}${props.isLargeRow?show.poster_path:show.backdrop_path}`} alt="img" />
            ))}
        </div>
        {trailerUrl &&<Youtube videoId={trailerUrl}  opts={opts} />
}</div>
  )
}

export default Row;