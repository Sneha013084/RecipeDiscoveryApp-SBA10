

// 1: Hook that accept the url; hooks to manage the state
import  { useState, useEffect} from 'react';

//useFetch takes a URL string as its parameter — the API endpoint to fetch data from.
// Data - hold fetched dat , loading is a boolean indicates the fetching response, error  message for fetch failing


export default function useFetch (url){

  const [ data, setData]  = useState(null);
  const[loading , setLoading] = useState(true);
  const[error, setError] = useState(null);

// this will run whenever url changes, no changes return


useEffect(() => {
     if(!url) return;

//before fetch , loading is true, no error


     setLoading(true);
     setError(null);


     //2 conditions:resp-not okay:throw an error /if okay : return with json pasrse response

     fetch(url) 
     .then (res => {
        if(!res.ok) throw new Error ('Response was not correct')
            return res.json()
     })


     // 1.okay resp- json- data}for successful parsing

     .then (json => {
        setData(json);
        setLoading(false);
     })

     //2. error: bad response or fail=> store the error message in the state amnd stops the loading

     .catch(err =>{
        setError(err.message);
        setLoading(false);
     });

}, [url]);

// dependency array : whenever url changes the useEffect will run again

return{data, loading, error };
}


// this hook will return an object wit = current data, loading  and error states : component can use this