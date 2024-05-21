import React, {useEffect, useState} from "react"
import axios from 'axios'




const Search = () => {
  const OMDB_API_KEY = '7035c60c'
  const [movieData, setMovieData] = useState()

  const thisYear = new Date().getFullYear()+1
  const yearList2 = Array.from({ length: 40 }, (_, i) => i === 0 ? "All year" : thisYear - 1 );

  const onsubmit = async (e) => {
    e.preventDefault();
    const current = e.target;
    if(current.title.value){
      const title = current.title.value;
      const type = current.type.value;
      let year = current.year.value;
      if(year === 'All year'){
        year = "";
      }
      const response = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=2`);
      console.log(response.data.Search);
      setMovieData(response.data.Search)
    }
  };

  return  (
    <form onSubmit={onsubmit}>
      <div>
        <input
          className="text"
          type={"text"}
          id={"title"}
        />
      </div>
      <div>
        <select id={"type"}>
          <option key="movie" value="movie">movie</option>
          <option key="series" value="series">series</option>
          <option key="episode" value="episode">episode</option>
        </select>
      </div>
      <div>
        <select id={"year"}>
        {yearList2.map((item, i) => (
          <option defaultValue={""} value={item} key={i}>{item}</option>
        ))}
        </select>
      </div>
      <div>
        <button type={"submit"}>등록</button>
      </div>
    </form>
  )
}

export default Search
