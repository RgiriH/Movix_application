import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWraper/ContentWraper"
import PosterFallback from "../../assets/no-poster.png";
import Img from '../lazyLoadingImage/img.jsx'
import CircleRating from "../circleRating/CircleRating";

import "./style.scss";
import Genres from "../genres/Genres";

const Carousal = ({data,loading,endpoint}) => {
    const carosalContainer = useRef();
    const {url} = useSelector((state) => (state.home))
    const navigate = useNavigate()
    const Navigation = (direction) => {
         const container = carosalContainer.current
         const scrollAmount = 
         direction === "left" ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20)
         container.scrollTo({left : scrollAmount,behavior : "smooth"})
    }
    const skItem = () => {
        return(
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="carousel">
            <ContentWrapper>
               <BsFillArrowLeftCircleFill
               className="carouselLeftNav arrow"
               onClick={() => Navigation("left")}/> 
               <BsFillArrowRightCircleFill
               className="carouselRighttNav arrow"
               onClick={() => Navigation("right")}/> 
               {!loading ? (
                    <div className="carouselItems"
                    ref = {carosalContainer}>
                       {data?.map((tab) => {
                            const posterPath = tab?.poster_path ? url?.poster + tab?.poster_path : PosterFallback
                            
                            return(<div key = {tab.id} 
                                onClick={() => endpoint ? (navigate(`/${endpoint}/${tab.id}`)):(navigate(`/${tab.media_type}/${tab.id}`))}
                                className="carouselItem">
                                <div className="posterBlock">
                                     <Img src ={posterPath}/>
                                     <CircleRating rating = {tab.vote_average.toFixed(1)}/>
                                     <Genres data = {tab.genre_ids.slice(0,2)}/>
                                </div>
                                <div className="textBlock">
                                    <span className="title">{tab.title || tab.name}</span>
                                
                                <span className="data">
                                    {
                                        dayjs(tab?.release_Date).format("MMM D, YYYY")
                                    }
                                </span>
                                </div>
                                </div>)
                        })} 
                       
                    </div>
                ):(
                  <div className="loadingSkeleton">
                    {skItem()}
                    {skItem()}
                    {skItem()}
                    {skItem()}
                    {skItem()}
                  </div>
                )}
                

            </ContentWrapper>
        </div>
    )
}

export default Carousal