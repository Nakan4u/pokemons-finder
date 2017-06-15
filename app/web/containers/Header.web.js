import React, { Component } from 'react';
import { Link } from 'react-router-native';

import { responsiveStyles } from '../../native/containers/Header.css.js';
require('./Header.css');

export default class Header extends React.Component {
    render () {
        return (
            <div className="header">
                <Link to="/" className="navItem">
                <span>Go to web Home</span>
                </Link>
            </div>
        );
    }
}
