// by using this favorite context hook : any child can use its value without props drilling
import { createContext , useContext} from 'react';
import useLocalStorage  from "../hook/useLocalStorage";

//create a context like a global state (initially undefined)

const FavoritesContext = createContext();


//Provider will wrap whole app and provide the favorites state & functions to all child components.
export default function FavoritesProvider({children}) {


//hook syncs the favorites array with the browser’s localStorage under the key "favoriteRecipes".
//on initial load : reads saved available list or empy []
//updates to favoriteIds automatically update localStorage

    const [ favoriteIds, setFavoriteIds ] = useLocalStorage("favoriteRecipes" ,[])

    //Functions to manipulate favorites
    //1. add function: if id is not present creates a new array with the new ID and updates the state and localStorage.


  
    function addFavorite (id) {
        if(!favoriteIds.includes(id)){
            setFavoriteIds([...favoriteIds, id] )
        }
    }
    

   // 2. Remove function : by filter function create a list id not equal to the specific id (means id matched id removed)

   function removeFavorite (id) {
      setFavoriteIds (favoriteIds.filter(favoriteId => favoriteId != id))
   }


     //3. Check the specific  id :return if present

     function isFavorite(id) {
        return favoriteIds.includes(id);
     }



     // the component using this context will get = all the current state functions

     const value = { favoriteIds, addFavorite, removeFavorite, isFavorite};

  return(
        <FavoritesContext.Provider value= {value}>

             {children}

        </FavoritesContext.Provider>
    );
    

     //custom hook to use favorite context
     export function useFavorite() {
        const context =useContext (FavoritesContext) ;

            if(!context) {
                throw new Error( " UseFavorites must be used within a favoriteprovider")
            }
            return context;
        }
     }
