import React, { Component } from 'react';
import defaultBcg from '../images/room-1.jpeg';
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import { Link } from 'react-router-dom'
import { RoomContext } from '../context'
import Room from '../components/Room';

export default class SingleRoom extends Component {
    constructor(props) {
        super(props)
        // console.log(this.props)
        this.state = {
            slug: this.props.match.params.slug,
            default: defaultBcg,
        }
    }
    static contextType = RoomContext;

    // componentDidMount() {

    // }

    render() {
        const { getRoom } = this.context;
        const room = getRoom(this.state.slug)
        // If no room is found we will display on the page what is in the return statement
        if(!room) {
            return <div className="error">
                <h3>No such room could be found...</h3>
                <Link to="/rooms" className="btn-primary">
                    Back to Rooms
                </Link>
            </div>
        }
        const {name, description, capacity, size, price, extras, breakfast, pets, images} = room;
        return (
           <Hero hero='roomsHero'>
               <Banner title={`${name} room`}>
                   <Link to="/rooms" className="btn-primary">
                       Back to Rooms
                   </Link>
               </Banner>
           </Hero>
        )
    }
}
