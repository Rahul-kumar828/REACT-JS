import React from "react";
import Axios from "axios";
import {Redirect} from "react-router-dom";

class UpdateProduct extends React.Component{
    constructor(props) {
        super(props);
        this.state={
           selectedProduct:{
               name:'',
               image:'',
               price:'',
               qty:'',
               info:''
           },
            errorMessage:'',
            isSubmitted:false
        }
    }
    componentDidMount() {
        let productId=this.props.match.params.id;
        let dataUrl=`http://127.0.0.1:5000/api/products/${productId}`;
         Axios.get(dataUrl).then((response)=>{
              this.setState({
                  ...this.state,
                  selectedProduct :response.data
              });
         }).catch((error)=>{
             console.log(error);
            this.setState({
                ...this.state,
                errorMessage:error.message
            });
         });
    }

    //updateInput
    updateInput=(event)=>{
        this.setState({
            selectedProduct:{
                ...this.state.selectedProduct,
                [event.target.name]:event.target.value
            }
        });
    };
    //update image
    updateImage=async (event)=>{
        let imageFile=event.target.files[0];
        let base64Image=await this.convertBase64String(imageFile);
        this.setState({
            selectedProduct:{
                ...this.state.selectedProduct,
                image:base64Image
            }
        });
    };

    convertBase64String=(imageFile)=>{
        return new Promise((resolve,reject)=>{
            let fileReader=new FileReader();
            fileReader.readAsDataURL(imageFile);
            fileReader.addEventListener('load',()=>{
                if(fileReader.result){
                    resolve(fileReader.result)
                }
                else{
                    reject('Error Occurred');
                }
            })
        });
    };
    //submitProduct
    submitProduct=(event)=>{
     event.preventDefault();
     let dataURL=`http://127.0.0.1:5000/api/products/${this.state.selectedProduct._id}`;
    Axios.put(dataURL,this.state.selectedProduct).then((response)=>{
        this.setState({
            ...this.state,
            isSubmitted:true

        });
    }).catch((error)=>{
        console.log(error);
    });

    };

    render() {
        return (
            <React.Fragment>
                {
                    this.state.isSubmitted ? <Redirect to="/products/admin"/>:
                        <div className="container mt-3">
                            <div className="row">
                                <div className="col animated zoomIn">
                                    <p className="h3 text-secondary">Update a Product</p>
                                    <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusamus ad culpa earum itaque neque reprehenderit repudiandae tempora! Commodi corporis debitis harum hic iure molestias praesentium unde velit? Atque, itaque!</p>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-5 animated jello">
                                    <div className="card">
                                        <div className="card-header bg-secondary text-white">
                                            <p className="h4">Update Product</p>
                                        </div>
                                        <div className="card-body rgba-pink-light">
                                            <form onSubmit={ this.submitProduct}>
                                                <div className="form-group">
                                                    <input
                                                        name="name"
                                                        value={this.state.selectedProduct.name}
                                                        onChange={this.updateInput}
                                                        required type="text" className="form-control" placeholder=" Name:"/>
                                                </div>
                                                <div className="form-group">
                                                    <div className="custom-file">
                                                        <input
                                                            onChange={this.updateImage}
                                                             type="file" className="custom-file-input" id="customFile"/>
                                                        <label className="custom-file-label" htmlFor="customFile">
                                                            {
                                                                this.state.selectedProduct.image !== '' ?
                                                                    <img src={this.state.selectedProduct.image} alt="" width="25" height="25"/>:
                                                                    <span>Product Image</span>
                                                            }
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        name="price"
                                                        value={this.state.selectedProduct.price}
                                                        onChange={this.updateInput}
                                                        required type="number" className="form-control" placeholder=" Price"/>
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        name="qty"
                                                        value={this.state.selectedProduct.qty}
                                                        onChange={this.updateInput}
                                                        required type="number" className="form-control" placeholder="Available Qty"/>
                                                </div>
                                                <div className="form-group">
                                                 <textarea
                                                     name="info"
                                                     value={this.state.selectedProduct.info}
                                                     onChange={this.updateInput}
                                                     required className="form-control" rows="2" placeholder=" Product Info"/>
                                                </div>
                                                <div className="form-group">
                                                    <input required type="submit" className="btn btn-sm btn-secondary" value="Update"/>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                }
            </React.Fragment>
        );
    }

}

export default UpdateProduct;