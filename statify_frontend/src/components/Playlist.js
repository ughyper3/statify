import React, { Component } from "react";
import {Avatar, Card, CardContent, Grid, Typography} from "@material-ui/core";


export default class Playlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlist: []
        }
        this.getPlaylists = this.getPlaylists.bind(this);
        this.getPlaylists();
    }

    getPlaylists(){
        fetch('/spotify/playlist/')
            .then((response) => {
                if(!response.ok){
                    return {};
                }
                else {
                    return response.json();
                }
            })
            .then((data) => {
                this.setState({playlist: data});
            });
    }

    render() {
        const body = {
            backgroundColor: '#343A40'
        }
        const imageStyle = {
            width: 250,
            height: 150
        }
        const secondaryTextStyle = {
            fontFamily: 'Montserrat',
            fontSize: 16,
            fontWeight: 500,
            color: 'white'
        }
        return (
            <>
                <Card style={body}>
                    <CardContent>
                        <Grid container spacing={2}>
                            {this.state.playlist.map((playlist, index) => (
                                <Grid item md={4} key={playlist.link}>
                                    <a href={playlist.link}>
                                        <Avatar style={imageStyle} src={playlist.image} variant="square"/>
                                    </a>
                                    <Typography style={secondaryTextStyle}>
                                        {playlist.name}
                                    </Typography>
                                </Grid>
                                ))}
                        </Grid>
                    </CardContent>
                </Card>
            </>
        );
    }
}