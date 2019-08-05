import React, { Component } from 'react';

// This is to use the Context API in React
// Access to Provider and Consumer
const RoomContext = React.createContext();
// <RoomContewxt.Provider value={}

class RoomProvider extends Component {
    state = {
        greeting: 'Hello',
        name: 'John'
    }

    render() {
        return (
            // Use Two sets of curly braces to pass an Object
            // {{...this.state}} is using the spread operator to access all the properties on the object
            <RoomContext.Provider value={{...this.state}}>
                {this.props.children}
            </RoomContext.Provider>
                
            
        )
    }
}

const RoomConsumer = RoomContext.Consumer
// RoomProvider is being exported to index.js to wrap <Router> and <App>
export{ RoomProvider, RoomConsumer, RoomContext };