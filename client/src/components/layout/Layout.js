import React, {Component} from 'react';
import Navbar from "./Navbar";
import Hoc from "../../utils/Hoc";

class Layout extends Component {
    render() {
        return (
            <Hoc>
                <Navbar />
                { this.props.children }
            </Hoc>
        );
    }
}

export default Layout;