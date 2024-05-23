import React, {useEffect, useState} from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const DetailPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [detailData, setDetailData] = useState();

  const getDetailData = async() => {
    const response = await axios.get(`https://www.omdbapi.com/?apikey=7035c60c&i=${id}`);
    console.log(response.data);
    setDetailData(response.data);
  }

  useEffect(() => {
    if(!detailData){
      getDetailData();
    }
  }, [detailData]);

  return(
    <div>{id}</div>
  )
}
export default DetailPage