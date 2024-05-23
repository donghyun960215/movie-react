import React from "react"
import { useNavigate } from "react-router-dom";

const Movielist = ({movies}) => {
  const navigate = useNavigate();

  const goToDetail = (imdbID) => {
    navigate(`/detail?id=${imdbID}`);
  }


  return(
    <div>
      {movies && movies?.map((item, i) => (
        <>
          <img src={item.Poster}
               alt="poster"
               width={100}
               height={150}
               key={item.imdbID}
               onClick={() => goToDetail(item.imdbID)}
          />
          <p>{item.Title}</p>
          <p>{item.Year}</p>
        </>
      ))}
    </div>
  )
}

export default Movielist