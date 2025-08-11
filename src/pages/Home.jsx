// fetch and display categories

import React from "react";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom"; // for client side navigation without refreshing

//this functional component will displays the recipe categories

export default function Home() {
  //call useFetch hook with url for for all recipe categories

  const url = `https://www.themealdb.com/api/json/v1/1/categories.php`;
  const { data, loading, error } = useFetch(url);

  if (loading) return <p> Loading categories...</p>;

  if (error) return <p> Error loading categories : {error} </p>;

  return (
    //<div> container for the categories list.
    // ul : data.categories is an array of category objects fetched from the API, bu map function iterates through each categories
    //list created for each category
    //React Router <Link> is created:to={/category/${category.recipeCategory}} dynamically generates a URL path based on the category name like eg :seafood

    <div>
      <h1>Recipe Categories</h1>
      <ul>
        {data.categories.map((category) => (
          <li key={category.idCategory}>
          
            <Link to={`/category/${category.strCategory}`}>
              {category.strCategory}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
