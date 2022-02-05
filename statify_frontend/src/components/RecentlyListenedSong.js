import React, { Component } from "react";


export default class RecentlyListenedSong extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                {this.props.songs.map((song, index) => (
                <li key={song.played_at}>{song.song_name} {song.artist} {song.played_at}</li>
        ))}
    </div>);
}
}