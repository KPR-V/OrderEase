import { useEffect,useState } from "react";
import axios from "axios";
const useaxiosfetch = (dataurl) => {
const [data,setdata]=useState([])
const [fetcherror,setfetcherror]=useState(null)
const [isloading,setisloading]=useState(false)
useEffect(()=>{
let ismounted= true
const source = new AbortController()
const fetchdata= async (url)=>{
setisloading(true)
try {
    const response = await axios.get(url,{
        signal:source.signal
    })
    if (ismounted){
        setdata(response.data)
        setfetcherror(null)
    }
} catch (error) {
    if(ismounted){
        setfetcherror(error.message)
        setdata([])
    }
    
}finally{
    ismounted && setisloading(false)
}
}

fetchdata(dataurl)
const cleanup=()=>{
    ismounted= false
    source.abort();
}
return cleanup
},[dataurl])

return {data, isloading , fetcherror}
}
export default useaxiosfetch