
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWraper/ContentWraper.jsx";
import useFetch from "../../../hooks/useFetch.jsx";
import Genres from "../../../components/genres/Genres.jsx";
import CircleRating from "../../../components/circleRating/CircleRating.jsx";
import Img from "../../../components/lazyLoadingImage/img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "./playbtn";
const DetailsBanner = ({ video, crew }) => {
  const {mediaType,id} = useParams()
    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };
    const {url} = useSelector((State) => State.home)
    const {data , loading} = useFetch(`/${mediaType}/${id}`)
    const getGenerId = (obj) => {

       let gener = obj?.map((pre) => {
            return pre.id
        })
        return gener
    }
    const director = crew?.filter((g) => g.job === "Director")
    const writer = crew?.filter((g) => g.job === "Screenplay" || g.job === "Story" || g.job === "Writer")
    console.log(director)
    return (
        <div className="detailsBanner">
            {!loading ? (
                <div>
                    <div className="backdrop-img">
                        <Img src = {url.backdrop + data?.backdrop_path}/>
                    </div>
                    <div className="opacity-layer"></div>
                    <ContentWrapper>
                        <div className="content">
                            <div className="left">
                               {data?.poster_path ? (
                                <Img 
                                className={"posterImg"}
                                src = {url.backdrop + data?.backdrop_path}/>
                               ) : (<Img 
                                className={"posterImg"}
                                src = {PosterFallback}/>)} 
                            </div>
                            <div className="right">
                                  <div className="title">
                                    {data?.title || data?.name } (
                                        {dayjs(data?.release_date).format("YYYY")}
                                    )
                                  </div>
                                  <div className="subtitle">
                                    {data?.tagline}
                                  </div>
                                  
                                    <Genres data = {getGenerId(data?.genres)}/>
                                <div className="row">
                                   <CircleRating rating = {data?.vote_average
                                      .toFixed(1)} /> 
                                      <div className="playbtn">
                                       <PlayIcon/> 
                                       <div className="text">
                                        watch trailer
                                       </div>
                                      </div> 
                                </div>
                                <div className="overview">
                                   <div className="heading">
                                     overview
                                   </div>
                                   <div className="description">
                                    {data?.overview}
                                   </div>
                                   <div className="info">
                                   {data?.status && (
                                    <div className="infoItem">
                                        <span className="text bold">
                                            status : {" "}
                                        </span>
                                        <span className="text">
                                            {data?.status}
                                        </span>
                                    </div>
                                   )}
                                   {data?.release_date && (
                                    <div className="infoItem">
                                        <span className="text bold">
                                           Released Date : {" "}
                                        </span>
                                        <span className="text">
                                            {dayjs(data?.release_date).format("MMMM DD YYYY")}
                                        </span>
                                    </div>
                                   )}
                                   {data?.runtime && (
                                    <div className="infoItem">
                                        <span className="text bold">
                                           Duration : {" "}
                                        </span>
                                        <span className="text">
                                            {toHoursAndMinutes(data?.runtime)}
                                        </span>
                                    </div>
                                   )}
                                   </div>
                                 </div>
                                  {director?.length > 0 &&
                                  <div className="info">
                                    <span className="text bold">
                                        director : {" "}
                                    </span>
                                       <span className="text">
                                        {director.map((d ,i) => (
                                           <span className="" key={i}>
                                           {d?.name}
                                           {director?.length - 1 !== i && ','} 
                                           </span>
                                        ))
                                        }
                                         </span>
                                  </div>} 
                                  {writer?.length > 0 &&
                                  <div className="info">
                                    <span className="text bold">
                                        Writer : {" "}
                                    </span>
                                       <span className="text">
                                        {writer.map((d ,i) => (
                                           <span className="" key={i}>
                                           {d?.name}
                                           {writer?.length - 1 !== i && ', '} 
                                           </span>
                                        ))
                                        }
                                         </span>
                                  </div>} 
                                  {data?.created_by?.length > 0 &&
                                  <div className="info">
                                    <span className="text bold">
                                        Writer : {" "}
                                    </span>
                                       <span className="text">
                                        {data?.created_by?.map((d ,i) => (
                                           <span className="" key={i}>
                                           {d?.name}
                                           {data?.created_by?.length - 1 !== i && ', '} 
                                           </span>
                                        ))
                                        }
                                         </span>
                                  </div>}     
                            </div>
                            
                        </div>
                       
                    </ContentWrapper>
                </div>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};


export default DetailsBanner