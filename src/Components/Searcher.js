//Import the React module, and Component class (named import) from the react package
import React, { Component } from "react";
//Import with Router method from react-router-dom module
//allows the form to redirect to a specific route
//https://reacttraining.com/react-router/core/api/withRouter
import { withRouter } from "react-router-dom";

class Searcher extends Component {
    constructor(props) {
        //execute default constructor - https://www.youtube.com/watch?v=wdXEtKtHFdw
        super(props);
    
        //initial value for state: set searchTerm to empty string
        this.state = { searchTerm: '' };

        //bind these two event methods to current state of 'this'
        //prevents executing the methods on a null 'this'
        this.updateSearchString = this.updateSearchString.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
    //constantly listen to the textbox value, store in state.searchTerm
    updateSearchString (e) {
        this.setState({searchTerm: e.target.value});
    }

    handleSubmit (e) {
      //do not execute typical actions of the button
      e.preventDefault();
      //the text that I enter gets rendered as a search = go to /gallery/(searchstring)
      this.props.history.push(`/gallery/${this.state.searchTerm}`);
      //reset button state to normal
      e.currentTarget.reset();
  }

    render() {
        return (
          //render a search form, with a button and input
          //content is from base HTML page provided from Treehouse
          <form className="search-form" onSubmit={this.handleSubmit}>
            <input type="search" name="search" placeholder="Search" required onChange={this.updateSearchString} className="input" />
            <button className="searchbutton" type="submit">
              <svg fill="#fff" height="24" viewBox="0 0 23 23" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
            </button>
          </form>
        );
    }
}

//withRouter - bind action of the form to the router
export default withRouter(Searcher);