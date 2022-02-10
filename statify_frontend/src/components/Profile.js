import React, { Component } from "react";
import '@material-ui/core';
import {Avatar, Card, CardContent, Grid, Typography} from "@material-ui/core";


export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {}
        }
        this.getProfile = this.getProfile.bind(this);
        this.getProfile();
    }

    getProfile(){
        fetch('/spotify/profile/')
            .then((response) => {
                if(!response.ok){
                    return {};
                }
                else {
                    return response.json();
                }
            })
            .then((data) => {
                this.setState({profile: data});
            });
    }

    render() {
        const body = {
            backgroundColor: '#343A40'
        }
        const imageStyle = {
            width: 150,
            height: 150
        }
        const mainTextStyle = {
            fontFamily: 'Montserrat',
            fontSize: 24,
            fontWeight: 500,
            color: 'white'
        }
        const secondaryTextStyle = {
            fontFamily: 'Montserrat',
            fontSize: 18,
            fontWeight: 500,
            color: 'white'
        }
        const linkStyle = {
            fontFamily: 'Montserrat',
            fontSize: 18,
            fontWeight: 500,
            color: '#0275D8',
            textDecoration: 'none'
        }
        return(
            <>
                <Card style={body}>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item md={6}>
                                <Grid container direction={"column"}>
                                    <Grid item>
                                        <Avatar src={this.state.profile.image} style={imageStyle}/>
                                    </Grid>
                                    <Grid item style={{marginTop: 15}}>
                                        <Typography style={secondaryTextStyle}>
                                            {this.state.profile.followers} abonnés
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography>
                                            <a href={this.state.profile.spotify_account} style={linkStyle}>Spotify</a>
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography>
                                            <a href='https://github.com/ughyper3' style={linkStyle}>Github</a>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={6}>
                                <Grid container direction={"column"}>
                                    <Grid item>
                                        <Typography style={mainTextStyle}>
                                            {this.state.profile.display_name}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography style={secondaryTextStyle}>
                                            {this.state.profile.country}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </>
        )
    }
}