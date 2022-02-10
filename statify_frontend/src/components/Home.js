import React, { Component } from "react";
import Profile from "./Profile";
import RecentlyListenedSong from "./RecentlyListenedSong";
import CurrentlyPlayedSong from "./CurrentlyPlayed";
import '@material-ui/core';
import {AppBar, Avatar, Box, Container, CssBaseline, Grid, Toolbar, Typography} from "@material-ui/core";
import Playlist from "./Playlist";


export default class Home extends Component{
    constructor(props) {
        super(props);

        this.authenticateSpotify = this.authenticateSpotify.bind(this);
        this.authenticateSpotify();
    }

    authenticateSpotify(){
        fetch('/spotify/is-authenticated/')
            .then((response) => response.json())
            .then((data) => {
                this.setState({spotifyAuthenticated: data.status});
                if (!data.status){
                    fetch('/spotify/get-auth-url/')
                        .then((response) => response.json())
                        .then((data) => {
                            window.location.replace(data.url);
                        })
                }
            })
    }

    render() {
        const body = {
            backgroundColor: '#191414'
        }
        const toolbar_style = {
            backgroundColor: '#1E262F'
        };
        const title_style = {
            fontSize: 40,
            fontWeight: 500,
            fontFamily: 'Montserrat'
        };
        const logo_style = {
            width: 75,
            height: 75,
            margin: 10
        }
        return (
            <div style={body}>
                <CssBaseline>
                    <AppBar position="static" color="primary">
                        <Toolbar style={toolbar_style}>
                            <Box mr={2}>
                                <img style={logo_style} alt="img statify" src="/static/img/spotify.png"/>
                            </Box>
                            <Typography style={title_style}>
                                Statify
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <main>
                        <div style={{paddingTop: 30}}>
                            <Container>
                                <Grid container spacing={4}>
                                    <Grid item md={8}>
                                        <Grid container spacing={4}>
                                            <Grid item md={6}>
                                                <Profile/>
                                            </Grid>
                                            <Grid item md={6}>
                                                <CurrentlyPlayedSong/>
                                            </Grid>
                                            <Grid item md={12}>
                                                <Playlist/>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item md={4}>
                                        <Grid container>
                                            <RecentlyListenedSong/>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Container>
                        </div>
                    </main>
                </CssBaseline>
            </div>
        )
    }
}