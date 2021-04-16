import React, { Component } from 'react';

class Pagination extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			 page: 0,
    		 maxPage: 29,
    		 currentGroup: 0
		}
		this.next = this.next.bind(this);
    	this.prev = this.prev.bind(this);
	}

	next() {
    	this.props.next();
  	}

  	prev() {
    	this.props.prev();
  	}

	 render(){
	 	return(
	 	<div className = "row">
          <div className = "col-12">
            <nav aria-label="Page navigation example" >
              <ul className="pagination justify-content-center">
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true" onClick={this.prev}>&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </a>
                </li>
                <li className="page-item"><a className="page-link page-link-none" href="#"></a></li>
                <li className="page-item"><a className="page-link" href="#">{this.props.page + 1}</a></li>
                <li className="page-item"><a className="page-link page-link-none" href="#"></a></li>
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true" onClick={this.next}>&raquo;</span>
                    <span className="sr-only">Next</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
	 	)
	 }
}

export default Pagination;