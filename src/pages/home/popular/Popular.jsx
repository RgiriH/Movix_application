import React,{useState , useEffect} from 'react'
import '../style.scss'
import ContentWrapper from '../../../components/contentWraper/ContentWraper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch.jsx';
import Carousal from '../../../components/carousal/Carousal';
const Popular = () => {
    const [endpoint,setEndpoint] = useState("movie")
    const {data,loading} = useFetch(`/${endpoint}/popular`);
    const onTabChange = (tab) => {
       setEndpoint(tab === "Movie" ? "movie" : "tv")
    }
    return (
        <div className='carouselSection'>
            <ContentWrapper>
              <span className="carouselTitle">
                   Popular
              </span>
              <SwitchTabs data = {["Movie","TV Showes"]}
              onTabChange = {onTabChange}
              />
            </ContentWrapper>
            <Carousal data = {data?.results} loading={loading} endpoint = {endpoint}/>
        </div>
    )
}

export default Popular