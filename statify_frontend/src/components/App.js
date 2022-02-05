import React, { Component } from "react";
import { render } from "react-dom";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./Home";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Router>
                    <Routes>
                        <Route path="/home" element={<Home />}/>
                    </Routes>
                </Router>
            </div>
        );
    }
}

const appDiv = document.getElementById("app");
render(<App/>, appDiv);