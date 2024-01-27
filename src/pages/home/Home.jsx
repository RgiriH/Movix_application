import React from 'react'
import  './style.scss'
import HeroBanner from './heroBanner/HeroBanner'
import Trending from './trending/trending'
import Popular from './popular/Popular'
import Toprated from './toprated/Toprated'
const Home = () => {
    return (
        <div className="homePage">
            <HeroBanner/>
            <Trending/>
            <Popular/>
            <Toprated/>
        </div>
    )
}

export default Home