import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, NavLink, Switch } from "react-router-dom";
import axios from "axios";

import Home from "./components/Home";
import ItemsList from "./components/ItemsList";
import Item from "./components/Item";
import ItemForm from "./components/ItemForm";
import UpdateForm from "./components/UpdateForm";
import "./styles.css";

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getItems = () => {
      axios
        .get("http://localhost:3333/items")
        .then(res => {
          setItems(res.data);
        })
        .catch(error => console.log(error));
    };

    getItems();
  }, []);

  return (
    <div className="App">
      <nav>
        <h1 className="store-header">Dustin's Trinkets</h1>
        <div className="nav-links">
          <NavLink exact to="/item-form">
            Add Item
          </NavLink>
          <NavLink exact to="/">
            Home
          </NavLink>
          <NavLink to="/item-list">Shop</NavLink>
        </div>
      </nav>

      
        <Route path="/item-update/:id" render={(props)=>{
          return(<UpdateForm {...props} setItems={setItems}/>);
        }} />          

        <Route
          path="/item-list/:id"
          render={props => <Item {...props} setItems={setItems} />}
        />

        <Route
          path="/item-list"
          render={props => <ItemsList {...props} items={items} />}
        />

        
        <Route path="/item-form" component={ItemForm} />

        

        <Route path="/" component={Home} />
    

      {/* <Route path="/item-form">
        <UpdateForm setItems={setItems}/>
      </Route> */}

    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  rootElement
);
