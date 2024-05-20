import React, {useEffect, useState} from "react"
import axios from 'axios'

const Search = () => {
  const OMDB_API_KEY = '7035c60c'
  const [movieData, setMovieData] = useState()

  const getMovieData = async () => {
    //const response = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`);
    const response = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=jobs`);
    setMovieData(response);
    console.log(response);
  }
  useEffect(() => {
    if(!movieData){
      getMovieData();
    }
  }, [movieData]);

  return  (
    <div>
      <p>Search</p>
      <p>Search</p>
      <p>Search</p>
      <p>Search</p>
      <p>Search</p>
    </div>
  )
}

export default Search
