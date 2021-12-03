import React, { useState, useEffect } from "react";
import Movie from "./components/Movie";

const FEATURED_API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm , setSearchTerm] = useState('') ; 
  const fetchMovies = async(api) => {
    const response = await fetch(api) ; 
    const data = await response.json() ;
    const movieResults = await data.results ; 
    setMovies(movieResults) ; 
  }

  useEffect(() => {
    fetchMovies(FEATURED_API) ;
  }, []);


  const submitHandler = (event) => {
    event.preventDefault() ; 
    if(searchTerm.trim()) {
      fetchMovies(SEARCH_API + searchTerm) ; 
      setSearchTerm("") ; 
    }
  }

  const changeHandler = (event) => {
    setSearchTerm(event.target.value) ; 
  }


  return (
    <div className = "root" >
      <header>
        <form onSubmit = {submitHandler}>
          <input 
            className = "search" 
            placeholder = "Search... " 
            type = "search" 
            onChange = {changeHandler}
          />
        </form>
      </header>
      <div className = "movie-container">
        {movies.map((movie) => {
          return <Movie key={movie.id} {...movie} />;
        })}
      </div>

    </div>
  );
}

export default App;
