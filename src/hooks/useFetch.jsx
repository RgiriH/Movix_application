import React,{ useState,useEffect } from "react";
import {fecthDataFromApi} from '../utils/api.js';

const useFetch = (url) => {
    const [loading,setLoading] = useState(null)
    const [data,setData] = useState(null)
    const [error,setError] = useState(null)
    useEffect(()=>{
        setLoading("loading...")
        fecthDataFromApi(url)
        .then((res) => {
           setLoading(false)
           setData(res)
        })
        .catch((error) => {
            setLoading(false)
            setError("somthing went wrong...")
        })
    },[url])
    return {loading,data,error}
};
export default useFetch