import React, {useEffect, useState} from "react"
import axios, {patch} from 'axios'
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState();
  const [fetching,setFetching] = useState(true)
  const [page, setPage] = useState(2);
  const [title, setTitle] = useState();
  const [type, setType] = useState();
  const [selectedYear, setSelectedYear] = useState("All year")

  const thisYear = new Date().getFullYear() + 1;
  const yearSelectData = Array.from({ length: 40 }, (_, i) => i === 0 ? "All year" : thisYear - i);

  const goToDetail = (imdbID) => {
    navigate(`/detail?id=${imdbID}`);
  }

  const onsubmit = async (e) => {
    e.preventDefault();
    const current = e.target;
    if(current.title.value){
      setTitle(current.title.value);
      setType(current.type.value);
      setSelectedYear(current.yearList.value);
      const response = await axios.get(`https://www.omdbapi.com/?apikey=7035c60c&s=${title}&type=${type}&y=${selectedYear}&page=1`);
      setMovieData(response.data.Search);
      setFetching(false)
    }
  };

  const handleScroll = async() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && fetching === false) {
      setPage(page+1);
      const response = await axios.get(`https://www.omdbapi.com/?apikey=7035c60c&s=${title}&type=${type}&y=${selectedYear}&page=${page}`);
      setMovieData(movieData.concat(response.data.Search));
      setFetching(true);
    }
    setFetching(false);
    };

  useEffect(() => {
    // scroll event listener 등록
    window.addEventListener("scroll", handleScroll);
    return () => {
      // scroll event listener 해제
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return  (
    <>
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
        <select id={"yearList"} onChange={(e) => setSelectedYear(e.target.value)}>
        {yearSelectData.map((item, i) => (
          <option defaultValue={"All year"} value={item} key={i}>{item}</option>
        ))}
        </select>
      </div>
      <div>
        <button type={"submit"}>등록</button>
      </div>
    </form>
      {movieData && movieData?.map((item, i) => (
        <>
          <img src={item.Poster}
               alt="poster"
               width={100}
               height={150}
               key={item.imdbID}
               onClick={() => goToDetail(item.imdbID)}
          />
          <p> {item.Title}</p>
          <p>{item.Year}</p>
        </>
      ))}
    </>
  )
}

export default Search
