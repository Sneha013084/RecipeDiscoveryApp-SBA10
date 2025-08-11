// fetch and display recipe in a category

import React from "react";
import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

//declare a functional component called category, receives a prop category name

export default function Category() {
  // url for return the recipe filtered by the given category
  //getting categoryName through useParam in react router

  const { categoryName } = useParams();
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`;

  //calling the useFetch custom hook with url - will return the objects

  const { data, loading, error } = useFetch(url);

  //if loading true , shows loading and error - shows error message(loading -prevents the data rendering before its ready)

  if (loading) return <p> Loading...</p>;
  if (error) return <p> Error : {error} </p>;

  // when data fetched- return a unordered list, by using map function iterate over the meals array and form a ordererd list for eact meal

  return (
    <div>
      <h1>{categoryName} Recipes </h1>
      <ul>
        {data.meals.map((meal) => (
          <li key={meal.idMeal}>
            <Link to={`/recipe/${meal.idMeal}`}> {meal.strMeal} </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
