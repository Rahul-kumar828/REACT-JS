import React from "react";

class Home extends React.Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <React.Fragment>
               <div className="landing-page ">
                   <div className="wrapper">
                      <div className="d-flex flex-column justify-content-center align-items-center h-100 ">
                          <h5 className="display-4 animated zoomIn">
                              <i className="fa fa-shopping-cart"/>BigBasket</h5>
                          <p className="lead px-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci architecto aspernatur at, consectetur deleniti, dolor dolorum ducimus enim eos esse fugit ipsa libero magni maiores numquam odio optio quae, repellat.</p>
                      </div>
                   </div>
               </div>
            </React.Fragment>
        );
    }

}

export default Home;