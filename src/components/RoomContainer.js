import React from 'react'
import RoomFilter from './RoomFilter.js'
import RoomList from './RoomList.js'
import { withRoomConsumer } from '../context'
import Loading from '../components/Loading'

function RoomContainer({context}) {
   const {loading, sortedRooms, rooms} = context;

    if(loading) {
      return <Loading />;
    }
      return (
        <>
          <RoomFilter rooms={rooms}/>
          <RoomList rooms={sortedRooms}/>
        </>
      )
}

// This is how you wrap the RoomContainer with the withRoomConsumer
export default withRoomConsumer(RoomContainer)

// This is for reference 
// import React from 'react'
// import RoomFilter from './RoomFilter.js'
// import RoomList from './RoomList.js'
// import { RoomConsumer } from '../context'
// import Loading from '../components/Loading'

// export default function RoomContainer() {
//     return (
//         <RoomConsumer>
//             {value => {
//                 //   console.log(value);
//                 const {loading, sortedRooms, rooms} = value;
//                   if(loading) {
//                     return <Loading />;
//                   }
//                   return (
//                     <div>
//                         RoomContainer
//                         <RoomFilter rooms={rooms}/>
//                         <RoomList rooms={sortedRooms}/>
//                     </div>
//                   )
//             }}
//         </RoomConsumer>    
//     )
// }
