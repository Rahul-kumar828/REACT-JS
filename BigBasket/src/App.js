import React from "react";
import './App.css';
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom';
import Navbar from "./component/navbar/Navbar";
import Home from "./component/home/Home";
import ProductList from "./component/products/ProductList";
import ProductAdmin from "./component/products/ProductAdmin";
import CreateProduct from "./component/products/CreateProduct";
import UpdateProduct from "./component/products/UpdateProduct";
class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
               <Router>
                <Navbar/>
                   <Switch>
                       <Route exact path="/" component={Home} />
                       <Route exact path="/products/list" component={ProductList} />
                       <Route exact path="/products/admin" component={ProductAdmin} />
                       <Route exact path="/products/create" component={CreateProduct} />
                       <Route exact path="/products/:id" component={UpdateProduct} />
                   </Switch>
               </Router>

            </React.Fragment>
        );
    }

}

export default App;
