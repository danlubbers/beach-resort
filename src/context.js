import React, { Component } from 'react';
// import items from './data';
import Client from './contentful';

// Client.getEntries({
//     // content_type comes from contentful under Content Model and then Content Type ID
//     content_type: "beachResortRoom"
// })
// .then((response) => console.log(response.items))
// .catch(console.error)

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
        loading: true,
        type: 'all',
        capacity: 1, 
        price: 0,
        minPrice: 0,
        maxPrice: 0, 
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false
    }

    // getData
    getData = async () => {
        try {
            let response = await Client.getEntries({
                content_type: "beachResortRoom",
                // This helps order from contentful
                // order: "sys.createdAt"
                // Order by price
                order: 'fields.price'
            });
            let rooms = this.formatData(response.items);
            // console.log(rooms)
            let featuredRooms = rooms.filter(room => room.featured === true);
            // console.log(featuredRooms)
            let maxPrice = Math.max(...rooms.map(item => item.price));
            let maxSize = Math.max(...rooms.map(item => item.size));
    
            this.setState({
                rooms, 
                featuredRooms, 
                sortedRooms: rooms, 
                loading: false,
                price: maxPrice,
                maxPrice,
                maxSize
            })

        } catch (error) {
            console.log(error);
            
        }
    }


    componentDidMount() {
        this.getData()
        // let rooms = this.formatData(items);
        // // console.log(rooms)
        // let featuredRooms = rooms.filter(room => room.featured === true);
        // // console.log(featuredRooms)
        // let maxPrice = Math.max(...rooms.map(item => item.price));
        // let maxSize = Math.max(...rooms.map(item => item.size));

        // this.setState({
        //     rooms, 
        //     featuredRooms, 
        //     sortedRooms: rooms, 
        //     loading: false,
        //     price: maxPrice,
        //     maxPrice,
        //     maxSize
        // })
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

    handleChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        }, this.filterRooms) // <----- this is a callback function 
        // const type = event.target.type
        // const name = event.target.name
        // const value = event.target.value

        // console.log(`this is type: ${type}, this is name: ${name}, this is value: ${value}`);
        
    }

    filterRooms = () => {
        let {
            rooms, type, capacity, price, minSize, maxSize, breakfast, pets
        } = this.state;
        
// all the rooms
        let tempRooms = [...rooms];
// transfrom values
        capacity = parseInt(capacity);
        price = parseInt(price);

// Filter by type
        if(type !== 'all') {
            tempRooms = tempRooms.filter(room => room.type === type)
        }
        this.setState({
            sortedRooms: tempRooms
        })

// Filter by Capacity
    if(capacity !== 1) {
        tempRooms = tempRooms.filter(room => room.capacity >= capacity)
    }

// Filter by Price
    tempRooms = tempRooms.filter(room => room.price < price)

// Filter by Size
    tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize)

// Filter by Breakfast
    if(breakfast) { 
        tempRooms = tempRooms.filter(room => room.breakfast === true)
    }  
    
    // Filter by Pets
    if(pets) { 
        tempRooms = tempRooms.filter(room => room.pets === true)
    }  

    // Change State
    this.setState({sortedRooms: tempRooms})
}

    render() {
        return (
            // Use Two sets of curly braces to pass an Object
            // {{...this.state}} is using the spread operator to access all the properties on the object
            <RoomContext.Provider value={{
                    ...this.state,
                    getRoom: this.getRoom,
                    handleChange: this.handleChange
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
