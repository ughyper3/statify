import React, { Component } from "react";
import {
    Avatar,
    Card,
    CardContent,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead, TableRow,
    Typography
} from "@material-ui/core";


export default class RecentlyListenedSong extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: []
        }
        this.getListenedSongs = this.getListenedSongs.bind(this);
        this.getListenedSongs();
    }

    componentDidMount() {
        this.interval = setInterval(this.getListenedSongs, 10000);
    }

    getListenedSongs(){
        fetch('/spotify/recently-played-songs/')
            .then((response) => {
                if(!response.ok || response.i){
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

    render() {
        const imageStyle = {
            width: 50,
            height: 50
        }
        const body = {
            backgroundColor: '#343A40'
        }
        const secondaryTextStyle = {
            fontFamily: 'Montserrat',
            fontSize: 10,
            fontWeight: 500,
            color: 'white',
            borderBottom: 'none'
        }
        const tableStyle = {
            borderBottom: 'none'
        }

        return (
            <>
                <Card style={body}>
                    <CardContent>
                        <Grid>
                            <TableContainer>
                                <Table>
                                    <TableBody>
                                        {this.state.songs.map((song, index) => (
                                            <TableRow key={song.played_at}>
                                                <TableCell style={tableStyle}>
                                                    <Avatar style={imageStyle} src={song.image}/>
                                                </TableCell>
                                                <TableCell style={secondaryTextStyle}>{song.song_name} <br/> {song.artist}</TableCell>
                                                <TableCell style={secondaryTextStyle}>{song.format_date}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </CardContent>
                </Card>
            </>
        );
    }
}