import { useState, useEffect} from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {fecthDataFromApi} from './utils/api.js';
import {useSelector,useDispatch} from 'react-redux';
import { getApiConfiguration, getGenres } from "./store/homeSlice";
import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer.jsx';
import Home from './pages/home/Home.jsx';
import Details from './pages/details/Details.jsx';
import Explore from './pages/explore/Explore.jsx';
import PageNotFound from './pages/404/PageNotFound.jsx';
import SearchResult from './pages/searchResult/SearchResult.jsx';
import useFetch from './hooks/useFetch.jsx';

function App() {
  
  useEffect(() =>{fetchCofiguration()
    generasCall()},[])
  const dispatch = useDispatch()

  const url = useSelector((state) => state.home.url)
  
 const fetchCofiguration = () => {
   fecthDataFromApi("/configuration")
   .then((res) => {
    
    const url = {
       backdrop : res.images?.secure_base_url + "original",
       poster   : res.images?.secure_base_url + "original",
       profile  : res.images?.secure_base_url + "original",
    }
    dispatch(getApiConfiguration(url))
   
   })
 }
  const generasCall = async() =>{
    let promises = []
    let endPoint = ["tv","movie"]
    let allGenres = {}
    endPoint.forEach((url) => {
      promises.push(fecthDataFromApi(`/genre/${url}/list`))
    })
    
    const  data = await Promise.all(promises)
    console.log(data)
    data.map(({genres}) => 
        genres.map((item) => (allGenres[item.id] = item))
      
    )
    
    dispatch(getGenres(allGenres))
  }
  
  return (
   < BrowserRouter>
     <Header/>
      <Routes>
         <Route path="/" element = {<Home/>}/>
         <Route path= "/:mediaType/:id" element = {<Details/>}/>
         <Route path="/search/:query" element = {<SearchResult/>}/>
         <Route path="/explore/:mediaType" element = {<Explore/>}/>
         <Route path="*" element = {<PageNotFound/>}/>
      </Routes>
      <Footer/>
   </BrowserRouter>
  )
}

export default App
