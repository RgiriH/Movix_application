import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWraper/ContentWraper";
import logo from "./movix-logo.svg"
const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(()=> {
       window.scrollTo(0,0)
    },[location])

    const openSearch = () => {
        setMobileMenu(false)
        setShowSearch(true)
    }
    const openMobileMenu = () => {
        setMobileMenu(true)
        setShowSearch(false)
    }

    const searchQueryHandler = (event) => {

        if(event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`)
            setTimeout(() => {setShowSearch(false);},100)
        }
        

    }
    const navigationHandler = (type) =>{
        return function(){
            navigate(`explore/${type}`)
            setMobileMenu(false)
        }
    }
    const handleHeader = () => {
      if(window.scrollY > 200){
           if(lastScrollY < window.scrollY && !mobileMenu){
            setShow("hide")
           }
           else{
            setShow("show")
           }
      }else{
        setShow("top")
      }
      setLastScrollY(window.scrollY)
    }
    useEffect(() => {
        window.addEventListener("scroll",handleHeader)
        return () => {
            window.removeEventListener("scroll",handleHeader)  
        }
    },[])
    return (
        <header className={`header ${mobileMenu ?
        "mobileView fixing":""} ${show}`}>
            <ContentWrapper>
                <div className="logo">
                    <img src={logo} alt="MOVIX" />
                </div>
                <ul className="menuItems">
                        
                        <li className="menuItem"
                          onClick={navigationHandler("movie")}
                        >Movies</li>
                        <li className="menuItem"
                        onClick={navigationHandler("TV")}>TV shows</li>
                        <li className="menuItem">
                        <HiOutlineSearch
                        onClick={openSearch}/>
                        </li>     
                </ul>
                <div className="mobileMenuItems">
                     <HiOutlineSearch 
                     className="Msearch"
                     onClick={openSearch}/>
                     {mobileMenu ?
                     (<VscChromeClose
                     onClick={() => setMobileMenu(false)}/>) : (<SlMenu
                     onClick={openMobileMenu}/>)}
                </div>
            </ContentWrapper>
            {showSearch && <div className="searchBar">
               <ContentWrapper>
               <div className="searchInput">
                <input 
        
                    type="text" 
                    placeholder='search for movies and showes'
                    onKeyUp={searchQueryHandler}
                    onChange={(e) => setQuery(e.target.value) }
                    />
                   <VscChromeClose
                     onClick={() => setShowSearch(false)}/>
               </div>
               </ContentWrapper>
            </div>}
        </header>
    );
};

export default Header;