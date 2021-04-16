import React, { Component } from 'react';
import './footer.css';

class Footer extends React.Component {
	
	render(){
		return(
            <section className = "footer">
                <div className ="container">
                    <div className = "footer-label">
                        <div className = "githubText">
                            <a href="https://github.com/marinatwice82">
                            <div className = "github-text">
                                <div className ="github"></div>
                                <div>Marina</div>
                            </div>
                            </a>
                            <a href="https://github.com/olegdrobot">
                            <div className = "github-text">
                                <div className ="github"></div>
                                <div>Oleg</div>    
                            </div>
                            </a>
                        </div>
                        <div>2021</div>
                     
                    	   <div><a href="https://rs.school/js/"><div className ="img"></div></a></div>
                      
                    </div>
			     </div>
            </section>
		);
	}
}
export default Footer;