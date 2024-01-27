import React from 'react'
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import  './style.scss'
import DetailsBanner from './detailsBanner/DetailsBanner'
const Details = () => {
    const {mediaType , id} = useParams()
    const {data,loading} = useFetch(`/${mediaType}/${id}/videos`)
    const {data : credits,loading : creditsLoading} = useFetch(`/${mediaType}/${id}/credits`)


 
    return (
        
        <DetailsBanner vedio = {data?.result?.[0]} crew = {credits?.crew}/>
    )
}

export default Details