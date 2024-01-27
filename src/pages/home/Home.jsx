import React from 'react'
import  './style.scss'
import HeroBanner from './heroBanner/HeroBanner.jsx'
import Trending from './trending/Trending'
import Popular from './popular/Popular.jsx'
import Toprated from './toprated/Toprated.jsx'
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