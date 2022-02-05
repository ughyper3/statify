import React, { Component } from "react";
import Profile from "./Profile";
import RecentlyListenedSong from "./RecentlyListenedSong";
import CurrentlyPlayedSong from "./CurrentlyPlayed";
import '@material-ui/core';


export default class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            spotifyAuthenticated: false,
            songs: [],
            profile:{},
            currentlyPlayed:{}
        };
        this.authenticateSpotify = this.authenticateSpotify.bind(this);
        this.authenticateSpotify();
        this.getListenedSongs = this.getListenedSongs.bind(this);
        this.getListenedSongs();
        this.getProfile = this.getProfile.bind(this);
        this.getProfile();
        this.CurrentlyPlayedSong = this.CurrentlyPlayedSong.bind(this);
        this.CurrentlyPlayedSong();
    }

    componentDidMount() {
        this.interval = setInterval(this.getListenedSongs, 10000);
        this.interv = setInterval(this.CurrentlyPlayedSong, 1000);
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

    getListenedSongs(){
        fetch('/spotify/recently-played-songs/')
            .then((response) => {
                if(!response.ok){
                    return {};
                }
                else {
                    return response.json();
                }
            })
            .then((data) => {
                this.setState({songs: data});
            });
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

    CurrentlyPlayedSong(){
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

    render() {
        return (
            <div>
                <Profile profile={this.state.profile}/>
            </div>
        )
    }
}