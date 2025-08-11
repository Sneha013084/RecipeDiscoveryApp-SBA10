
import {useState, useEffect} from "React";

// theis localStorage hook : take two parameters 1)Key to store the value in the localstorage,2) initialValue:To use nothing in the localstorage

export default function useLocalStorage(key, initialValue){

    //declare a state for storedValue and a function to update it.
    //try to get the value from localStorage by using a key and if not return initialstate

    const[ storedValue, setStoredValue] =useStae(()=>{
     try{
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
     } catch{
        return initialValue;   
     }  
    });
  
    // whenever the key or storedValue chanhes -the useEffect will run 
    //it save the current storedValue to localStorage under the given key(json- string)

    useEffect(() => {
     try{
        window.localStorage.setItem( key,JSON.stringify(storedValue))
     }catch{}

    }, [key, initialValue]);

    //hook will return current state synnchronized with localStorage and a function to update the state

    return {storedValue, setStoredValue}
  
}