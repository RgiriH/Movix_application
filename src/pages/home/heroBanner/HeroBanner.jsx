import React , {useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import  './style.scss'
import ContentWrapper from '../../../components/contentWraper/ContentWraper';
import Img from '../../../components/lazyLoadingImage/img';
const HeroBanner = () => {
    const [background,setBackground] = useState("");
    const [query,setQuery] = useState("");
    const navigate = useNavigate()
    const {data,loading} = useFetch("/movie/upcoming")
    const {backdrop} = useSelector(state => state.home.url)
     
    
   useEffect(() => {
     const bg = backdrop + data?.results[Math.floor(Math.random() *19)].backdrop_path
      setBackground(bg)
   },[data])


    
    const searchQueryHandler = (event) => {

        if(event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`)
        }

    }

    return (
       <div className="heroBanner">
        {!loading && <div className="backdrop-img">
            <Img src = {background}/>
        </div>}
        <div className="opacity-layer"></div>
          <ContentWrapper>
            <div className="heroBannerContent">
               <span className="title">Welcome</span>
               <span className="title2">
                Millions of movies , TV shows and People to discover
                <br/>
                <br/>
                Explore now.
                </span> 
               <div className="SearchInput">
                <input 
                   id = "hero"
                    type="text" 
                    placeholder='search for movies and showes'
                    onKeyUp={searchQueryHandler}
                    onChange={(e) => setQuery(e.target.value) }
                    />
                    <button>
                        search
                    </button>
               </div>
            </div>
        </ContentWrapper>
        </div>
    );
};

export default HeroBanner