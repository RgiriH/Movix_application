import React,{useState , useEffect} from 'react'
import '../style.scss'
import ContentWrapper from '../../../components/contentWraper/ContentWraper.jsx'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs.jsx'
import useFetch from '../../../hooks/useFetch.jsx';
import Carousal from '../../../components/carousal/Carousal.jsx';
const Toprated= () => {
    const [endpoint,setEndpoint] = useState("movie")
    const {data,loading} = useFetch(`/${endpoint}/top_rated`);
    const onTabChange = (tab) => {
       setEndpoint(tab === "Movie" ? "movie" : "tv")
    }
    return (
        <div className='carouselSection'>
            <ContentWrapper>
              <span className="carouselTitle">
                   Top Rated
              </span>
              <SwitchTabs data = {["Movie","TV Showes"]}
              onTabChange = {onTabChange}
              />
            </ContentWrapper>
            <Carousal data = {data?.results} loading={loading} endpoint = {endpoint}/>
        </div>
    )
}

export default Toprated