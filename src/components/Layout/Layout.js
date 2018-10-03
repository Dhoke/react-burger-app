import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDraw from '../Navigation/SideDraw/SideDraw';

class Layout extends Component {

    state = {
        showSideDraw: false
    }

    sideDrawClosedHandler = () => {
        this.setState({showSideDraw:false});
    }

    sideDrawOpenHandler = () => {
        this.setState({showSideDraw:true});
    }

    sideDrawerToggleHandler = () => {

        this.setState((prevState) => {
            return {showSideDraw:!prevState.showSideDraw};
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar toggle={this.sideDrawerToggleHandler}/>
                <SideDraw 
                 closed={this.sideDrawClosedHandler}
                 isOpen={this.state.showSideDraw}
                 />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;