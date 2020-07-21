import React, {useState} from 'react';
import {v4 as uuidv4} from 'uuid'; 
import Axios from 'axios';
import './App.css';
import Recipe from './components/recipe';
import Alert from "./components/alert"; 

function App() {
  const [query,setQuery]=useState("");
  const [recipes,setRecipes]=useState([]);
  const [alert, setAlert] = useState("");

  const id="6e7951a3";
  const key="9e534021fdd72f75b55c473eb31f5c0b"
  const url=`https://api.edamam.com/search?q=${query}&app_id=${id}&app_key=${key}`;

  const onChange = (e) =>{
    setQuery(e.target.value);
  }

  const getData = async() =>{
    if (query !== "") {
      const result = await Axios.get(url);
      if (!result.data.more) {
        return setAlert("No food with such name");
      }
      console.log(result);
      setRecipes(result.data.hits);
      setQuery("");
      setAlert("");
    } else {
      setAlert("Please fill the form");
    }
  }
  const onSubmit = e =>{
    e.preventDefault();
    getData();
  }
  return (
    <div className="App">
      <h1>SEARCH FOOD</h1>
      <form className="search" onSubmit={onSubmit}>
        {alert !== "" && <Alert alert={alert} />}
        <input type="text" name="query" placeholder="Search Food" value={query} autoComplete="off" onChange={onChange}/>
        <input type="submit" value="Search"/>
      </form>
      <div className="recipes">
      {recipes!==[] && recipes.map(recipe => <Recipe key={uuidv4()} recipe={recipe} />)}
      </div>
    </div>
  );
}

export default App;
