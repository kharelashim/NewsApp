import React, { Component } from 'react';
import {Link} from "react-router-dom";

export class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{padding: '40px 1px 10px 200px'}}>
          <div className="container-fluid" >
            <Link className="navbar-brand" to="/" style={{fontSize: '45px'}}>NewsPortal </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button> 
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                 <li className="nav-item"><Link className="nav-link" to="/business" style={{fontSize: '25px'}}>Business News</Link></li>
                 <li className="nav-item"><Link className="nav-link" to="/entertainment" style={{fontSize: '25px'}} >Entertainment News</Link></li>
                 <li className="nav-item"><Link className="nav-link" to="/health" style={{fontSize: '25px'}} >Health News</Link></li>
                 <li className="nav-item"><Link className="nav-link" to="/science" style={{fontSize: '25px'}} >Science News</Link></li>
                 <li className="nav-item"><Link className="nav-link" to="/sports" style={{fontSize: '25px'}} >Sports News</Link></li>
                 <li ><Link className="nav-link" to="/technology" style={{fontSize: '25px'}}>Technology News</Link></li>

              </ul>

            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default Navbar

