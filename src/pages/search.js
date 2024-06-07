import React, {useEffect, useState} from "react"
import axios, {patch} from 'axios'
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Search = () => {
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState();
  const [fetching,setFetching] = useState(true)
  const [page, setPage] = useState(2);
  const [title, setTitle] = useState();
  const [type, setType] = useState();
  const [selectedYear, setSelectedYear] = useState("All year")

  //년도 자동계산
  const thisYear = new Date().getFullYear() + 1;
  const yearSelectData = Array.from({ length: 40 }, (_, i) => i === 0 ? "All year" : thisYear - i);

  const goToDetail = (imdbID) => {
    navigate(`/detail?id=${imdbID}`);
  }

  const onsubmit = async (e) => {
    e.preventDefault();
    const current = e.target;
    if(current){
      setTitle(current?.title.value);
      setType(current?.type.value);
      setSelectedYear(current?.yearList.value);
      const response = await axios.get(`https://www.omdbapi.com/?apikey=7035c60c&s=${current.title.value}&type=${current.type.value}&y=${current.yearList.value}&page=1`);
      setMovieData(response.data.Search);
      setFetching(false)
    }
  };

  const getScrollData = async() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && fetching === false) {
      setPage(page+1);
      const response = await axios.get(`https://www.omdbapi.com/?apikey=7035c60c&s=${title}&type=${type}&y=${selectedYear}&page=${page}`);
      setMovieData(movieData.concat(response.data.Search));
      console.log(movieData);
      setFetching(true);
    }
    setFetching(false);
    };

  useEffect(() => {
    // scroll event listener 등록
    window.addEventListener("scroll", getScrollData);
    return () => {
      // scroll event listener 해제
      window.removeEventListener("scroll", getScrollData);
    };
  });

  return  (
    <>
      <div className="container">
        <h1>
          <span>OMDb API</span><br/>
          THE OPEN<br/>
          MOVIE DATABASE
        </h1>
        <p>
          The OMDb API is a RESTful web service to obtain movie information, all content and images on the site are
          contributed and maintained by our users.<br/>
          If you find this service useful, please consider making a one-time donation or become a patron.
        </p>
      </div>
      <form onSubmit={onsubmit} className="form-inline">
        <div>
          <input
            className="text"
            type={"text"}
            id={"title"}
            placeholder="Search for Movies, Series & more"
          />
        </div>
        <div className="selects">
        <div>
          <select id={"type"} className="select">
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
        </div>
        <div>
          <button type={"submit"}>검색</button>
        </div>
      </form>
      {movieData && movieData?.map((item, i) => (
        <div className="movie">
          <img src={item.Poster}
               className="poster"
               alt="poster"
               width={100}
               height={150}
               key={item.imdbID}
               onClick={() => goToDetail(item.imdbID)}
          />
          <div className="info">
            <div className="year">{item.Year}</div>
            <div className="title">{item.Title}</div>
          </div>
        </div>
      ))}
    </>
  )
}

export default Search
