import React, { Component } from 'react';
import { RoomContext } from '../context';
import Loading from "./Loading";
import Room from './Room';
import Title from './Title';

export default class FeaturedRooms extends Component {

    static contextType = RoomContext;

    render() {
        // Destructure off the context to get the object off state in context.js
        // const {name, greeting} = this.context;
        let { loading, featuredRooms: rooms} = this.context;
        console.log(rooms)
        rooms = rooms.map(room => {
            return <Room key={room.id} room={room} />
        })

        return (
            <section className="featured-rooms">
                {/* Featured Rooms {greeting} {name} */}
                <Title title="Featured Rooms"/>
                <div className="featured-rooms-center">
                    {loading ? <Loading /> : rooms}
                </div>
            </section>
        )
    }
}
