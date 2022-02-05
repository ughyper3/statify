import React, { Component } from "react";


export default class CurrentlyPlayed extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return(
            <div>
                <p>{this.props.currentSong.progress_ms / 1000}</p>
            </div>
        )
    }
}