import React,{useState,useEffect} from 'react'
import axios from "./axios";
import request from "./requests";
import "./banner.css"

function Banner() {
    const [movie,setMovie] = useState([]);

    useEffect(()=>{
        async function fetchData() {
            const movies = await axios.get(request.fetchNetflixOriginals);
            setMovie(
                movies.data.results[Math.round(Math.random()*movies.data.results.length-1)]
            );
            return movies;
        }
        fetchData();
    },[]);
  return (
    <header className="Banner" style={{
        backgroundSize:"cover",
        backgroundImage:`url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backgroundPosition:"center center"
    }}>
        <div className="banner-container">
            <h1 className="banner-title">{movie?.title || movie?.name || movie?.original_name}</h1>
            <div className="banner-btn">
                <button className="btn">Play</button>
                <button className="btn">My List</button>
            </div>
            <h3 className="banner-overview">
                {movie?.overview}
            </h3>
        </div>
        <div className='banner-fadebottom'/>
    </header>
  )
}

export default Banner;