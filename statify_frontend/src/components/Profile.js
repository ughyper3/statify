import React, { Component } from "react";
import '@material-ui/core';
import {AppBar, Container, CssBaseline, Toolbar, Typography} from "@material-ui/core";
import {PhotoCamera} from "@material-ui/icons";


export default class Profile extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return(
            <>
                <CssBaseline>
                    <AppBar position="static" color="primary">
                        <Toolbar>
                            <Typography variant="h6">
                                Statify
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <main>
                        <div>
                            <Container maxWidth="sm">
                                <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
                                    Statify
                                </Typography>
                            </Container>
                        </div>
                    </main>
                </CssBaseline>
            </>
        )
    }
}