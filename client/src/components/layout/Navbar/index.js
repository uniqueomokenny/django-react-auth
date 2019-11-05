import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { logoutUser} from "../../../redux/actions/authActions";

class Navbar extends Component {
    logoutClick(e) {
        e.preventDefault();
        this.props.logoutUser();
    }

    render() {
        const { isAuthenticated } = this.props.auth;

        return (
            <header>
                <nav class="navbar navbar-dark bg-primary">
                    <div className="container">
                        <Link to={'/'} className="navbar-brand text-uppercase"><span
                            className="h2 font-weight-bold">auth</span><span
                            className="h1">app</span>
                        </Link>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarText">
                            <ul className="navbar-nav mr-auto">                            
                            {
                                isAuthenticated ?
                                    (   <>
                                            <li className="nav-item">
                                                <span
                                                    className="nav-link text-white menu-item"
                                                    onClick={this.logoutClick.bind(this)}
                                                >
                                                    Logout
                                                </span>
                                            </li>
                                        </>
                                    )

                                    : (
                                        <>
                                            <li className="nav-item">
                                                <Link to={"/login"} className="nav-link m-2 menu-item">Login</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to={"/"} className="nav-link m-2 menu-item">Sign up</Link>
                                            </li>
                                        </>
                                    )
                            }
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(Navbar);