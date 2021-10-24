import React from "react";
import Axios from "axios";
import {Redirect} from 'react-router-dom';

class CreateProduct extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            product:{
                name:'',
                image:'',
                price:'',
                qty:'',
                info:''
            },
            isSubmitted:false,
            errorMessage:''
        }
    }

    //updateInput
    updateInput=(event)=>{
         this.setState({
             product:{
                ...this.state.product,
                 [event.target.name]:event.target.value
           }
         });
    };
    //update image
    updateImage=async (event)=>{
       let imageFile=event.target.files[0];
       let base64Image=await this.convertBase64String(imageFile);
       this.setState({
         product:{
              ...this.state.product,
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
      let dataURL='http://127.0.0.1:5000/api/products';
      Axios.post(dataURL,this.state.product).then((response)=>{
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
                         <div className="col animated jello">
                             <p className="h3 text-success">Create a Product</p>
                             <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusamus ad culpa earum itaque neque reprehenderit repudiandae tempora! Commodi corporis debitis harum hic iure molestias praesentium unde velit? Atque, itaque!</p>
                         </div>
                     </div>
                         <div className="row mt-3">
                             <div className="col-md-5">
                                 <div className="card">
                                     <div className="card-header bg-success text-white">
                                       <p className="h4">Create New</p>
                                     </div>
                                     <div className="card-body rgba-green-light">
                                         <form onSubmit={ this.submitProduct}>
                                              <div className="form-group">
                                                  <input
                                                      name="name"
                                                      value={this.state.product.name}
                                                      onChange={this.updateInput}
                                                       required type="text" className="form-control" placeholder=" Name:"/>
                                              </div>
                                             <div className="form-group">
                                                 <div className="custom-file">
                                                     <input
                                                         onChange={this.updateImage}
                                                         required type="file" className="custom-file-input" id="customFile"/>
                                                         <label className="custom-file-label" htmlFor="customFile">
                                                             {
                                                                 this.state.product.image !== '' ?
                                                                     <img src={this.state.product.image} alt="" width="25" height="25"/>:
                                                                     <span>Product Image</span>
                                                             }
                                                             </label>
                                                 </div>
                                             </div>
                                             <div className="form-group">
                                                 <input
                                                     name="price"
                                                     value={this.state.product.price}
                                                     onChange={this.updateInput}
                                                     required type="number" className="form-control" placeholder=" Price"/>
                                             </div>
                                             <div className="form-group">
                                                 <input
                                                     name="qty"
                                                     value={this.state.product.qty}
                                                     onChange={this.updateInput}
                                                     required type="number" className="form-control" placeholder="Available Qty"/>
                                             </div>
                                             <div className="form-group">
                                                 <textarea
                                                     name="info"
                                                     value={this.state.product.info}
                                                     onChange={this.updateInput}
                                                     required className="form-control" rows="2" placeholder=" Product Info"/>
                                             </div>
                                             <div className="form-group">
                                                 <input required type="submit" className="btn btn-sm btn-success" value="Create"/>
                                             </div>
                                         </form>
                                     </div>
                                 </div>
                             </div>
                         </div>
                 </div>

                }
                <div style={{marginBottom:'150px'}}/>
            </React.Fragment>
        );
    }

}

export default CreateProduct;