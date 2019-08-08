import React, { Component } from 'react';
import items from './data';
// This is to use the Context API in React
// Access to Provider and Consumer
const RoomContext = React.createContext();
// <RoomContewxt.Provider value={}

class RoomProvider extends Component {
    state = {
        // This was dummy data to test
        // greeting: 'Hello',
        // name: 'John'
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true
    }

    // getData

    componentDidMount() {
        // this.getData
        let rooms = this.formatData(items);
        // console.log(rooms)
        let featuredRooms = rooms.filter(room => room.featured === true);
        // console.log(featuredRooms)
        this.setState({
            rooms, featuredRooms, sortedRooms: rooms, loading: false
        })
    }

    formatData(items) {
        let tempItems = items.map(item => {
          let id = item.sys.id;
          let images = item.fields.images.map(image => image.fields.file.url);

          let room = {...item.fields, images, id };
          return room;
        })
        return tempItems;
    }

    getRoom = slug => {
        // Use the spread operator to get everything in the array of rooms
        let tempRooms = [...this.state.rooms]
        // Find, finds the first match and is an Object, whereas filter finds all matches and returns an array
        const room = tempRooms.find((room) => room.slug === slug)
        return room;
    }

    render() {
        return (
            // Use Two sets of curly braces to pass an Object
            // {{...this.state}} is using the spread operator to access all the properties on the object
            <RoomContext.Provider value={{
                    ...this.state,
                    getRoom: this.getRoom
                }}>
                {this.props.children}
            </RoomContext.Provider>
                
            
        )
    }
}

const RoomConsumer = RoomContext.Consumer

// RoomProvider is being exported to index.js to wrap <Router> and <App>
export{ RoomProvider, RoomConsumer, RoomContext };

// Higher Order Component: functino within a function
export function withRoomConsumer(Component) {
    return function ConsumerWrapper(props) {
        return <RoomConsumer>
            {value => <Component {...props} context={value}/>}
        </RoomConsumer>
    }
}
