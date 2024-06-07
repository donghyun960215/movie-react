import React, {useEffect, useState} from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const DetailPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [detailData, setDetailData] = useState();

  const getDetailData = async() => {
    const response = await axios.get(`https://www.omdbapi.com/?apikey=7035c60c&i=${id}`);
    console.log("get:::",response.data);
    setDetailData(response.data);
  }

  useEffect(() => {
    console.log(id)
    if(!detailData){
      getDetailData();
    }
  }, [detailData]);

  return(
    <div className="movie-details">
      <div className="pzoster">
        <div className="poster" style={{backgroundImage: `url(${detailData?.Poster})`}}>
        </div>
        {/*<div className="poster" style={{backgroundImage: "detailData?.Poster"}}>*/}
        {/*  <img src={detailData?.Poster} alt=""/>*/}
        {/*</div>*/}
        <div className="specs">
          <div className="title">
            {detailData?.Title}
          </div>
          <div className="labels">
            <span>{detailData?.Released}</span>
            <span>{detailData?.Runtime}</span>
            <span>{detailData?.Country}</span>
          </div>
          <div className="plot">
            {detailData?.Plot}
          </div>
          <div className="ratings">
            <h3>Ratings</h3>
            <div className="ratings-wrap">
              {
                detailData?.Ratings.map((item, i) => (
                  <div className="rating">
                  <img src={`https://raw.githubusercontent.com/ParkYoungWoong/vue3-movie-app/master/src/assets/${item.Source}.png`} alt="rating"/>
                  <p>{item.Value}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div>
          <h3>Actors</h3>
          {detailData?.Actors}
        </div>
        <div>
          <h3>Director</h3>
          {detailData?.Director}
        </div>
        <div>
          <h3>Production</h3>
          {detailData?.Production}
        </div>
        <div>
          <h3>Genre</h3>
          {detailData?.Genre}
        </div>
      </div>
    </div>
  )
}
export default DetailPage