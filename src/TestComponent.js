import React, { Component } from 'react';
class TestComponent extends Component  {
    //  eslint-disable-next-line
//    constructor (props) {
//        super (props);
//    }
    render () {
        return (<p>Hello {this.props.name}!</p>)
    }
}

export default TestComponent