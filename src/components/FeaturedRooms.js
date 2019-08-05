import React, { Component } from 'react';
import { RoomContext } from '../context';

export default class FeaturedRooms extends Component {

    static contextType = RoomContext;

    render() {
        // Destructure off the context to get the object off state in context.js
        const {name, greeting} = this.context;
    
        return (
            <div>
                Featured Rooms {greeting} {name}
            </div>
        )
    }
}
