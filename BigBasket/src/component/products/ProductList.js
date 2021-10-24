import React from "react";
import image1 from '../../assets/img/products/apple.jpg';
import Axios from "axios";
class ProductList extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            products:[],
            errorMessage:''
        }

    }

    componentDidMount() {
        this.getAllProducts();
    }

    //get All Products
    getAllProducts=()=>{
        let dataURL='http://127.0.0.1:5000/api/products';
        Axios.get(dataURL).then((response)=>{
            this.setState({
                ...this.state,
                products:response.data
            });
        }).catch((error)=>{
            this.setState({
                ...this.state,
                errorMessage:error
            });
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-success">Product List</p>
                            <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda autem, blanditiis cum deleniti dolore eius, excepturi hic labore magnam maxime nemo nihil quia, sunt tempora vero! Consectetur mollitia qui reprehenderit.</p>
                        </div>
                    </div>
                    <div className="row">
                        {
                            this.state.products.length>0?
                                <React.Fragment>
                                    {
                                        this.state.products.map((product)=>{
                                            return(
                                                <div className="col-md-3">
                                                    <div className="card">
                                                        <div className="card-header text-center bg-white">
                                                            <img src={product.image} alt="" width="100" height="100" />
                                                        </div>
                                                        <div className="card-body">
                                                            <ul className="list-group">
                                                                <li className="list-group-item">
                                                                    NAME : {product.name}
                                                                </li>
                                                                <li className="list-group-item">
                                                                    Price : &#8377;{product.price.toFixed(2)}
                                                                </li>
                                                                <li className="list-group-item">
                                                                    Quantity : {product.qty}kgs.
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </React.Fragment>:
                                <React.Fragment>
                                       <p className="text-danger font-weight-bold">
                                           -------NO Product Found----------
                                       </p>
                                </React.Fragment>
                        }
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

export default ProductList;