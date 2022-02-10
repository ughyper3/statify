import React, { Component } from "react";
import {Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography} from "@material-ui/core";


export default class CurrentlyPlayed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentlyPlayed: {}
        }

        this.currentlyPlayedSong = this.currentlyPlayedSong.bind(this);
        this.getProgressMs = this.getProgressMs.bind(this);
        this.getArtistName = this.getArtistName.bind(this);
        this.getImage = this.getImage.bind(this);
        this.getSongName = this.getSongName.bind(this);
        this.msToMinute = this.msToMinute.bind(this);
    }

    componentDidMount() {
        this.interv = setInterval(this.currentlyPlayedSong, 1000);
    }

    currentlyPlayedSong(){
        fetch('/spotify/currently-played/')
            .then((response) => {
                if(!response.ok){
                    return {};
                }
                else {
                    return response.json();
                }
            })
            .then((data) => {
                this.setState({currentlyPlayed: data});
            });
    }

    getProgressMs(){
        return this.state.currentlyPlayed.progress_ms;
    }

    getSongName(){
        return this.state.currentlyPlayed.song_name;
    }

    getArtistName(){
        return this.state.currentlyPlayed.artist_name;
    }

    getImage(){
        return this.state.currentlyPlayed.image;
    }

    getPercentage(){
        return this.state.currentlyPlayed.percentage;
    }

    getDurationMs(){
        return this.state.currentlyPlayed.duration_ms;
    }

    msToMinute(millis){
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    render() {
        const body = {
            backgroundColor: '#343A40'
        }
        const imageStyle = {
            width: 250,
            height: 150
        }
        const mainTextStyle = {
            fontFamily: 'Montserrat',
            fontSize: 20,
            fontWeight: 500,
            color: 'white'
        }
        const secondaryTextStyle = {
            fontFamily: 'Montserrat',
            fontSize: 14,
            fontWeight: 400,
            color: 'white'
        }
        const progressBar = {
            color: '#0275D8'
        }

        return(
            <>
                <Card style={body}>
                    <CardContent>
                        <Grid container direction="column">
                            <Grid item xs={12}>
                                <Grid container justifyContent="center">
                                    <Avatar src={this.getImage() || 'https://issou'} style={imageStyle} variant="square"/>
                                </Grid>
                            </Grid>
                            <Grid item style={{marginTop: 15}}>
                                <Typography style={mainTextStyle}>
                                    {this.getSongName() || '-'}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography style={secondaryTextStyle}>
                                    {this.getArtistName() || '-'}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Grid container style={{marginTop: 15}}>
                                    <Box sx={{ width: '100%' }}>
                                        <LinearProgress variant="determinate" value={this.getPercentage() || 0} style={progressBar}/>
                                    </Box>
                                </Grid>
                                <Grid container direction={"row"} justifyContent={"space-between"}>
                                    <Grid item>
                                        <Typography style={secondaryTextStyle}>
                                            {this.msToMinute(this.getProgressMs()) || '-'}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography style={secondaryTextStyle}>
                                            {this.msToMinute(this.getDurationMs()) || '-'}
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