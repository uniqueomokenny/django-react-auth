import React, { Component } from 'react';
import {connect} from "react-redux";


class Dashbord extends Component {
    render() {
        return (
            <div className="text-muted text-center p-5">
                <h1 className='text-muted'>Dashboard</h1>
                <h3 className='text-muted'>Welcome {this.props.auth.user.username}</h3>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    auth: state.auth
})


export default connect(mapStateToProps)(Dashbord);
