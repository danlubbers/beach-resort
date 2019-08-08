import React, { Component } from 'react';
import defaultBcg from '../images/room-1.jpeg';
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import { Link } from 'react-router-dom'
import { RoomContext } from '../context'
import StyledHero from '../components/StyledHero'
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
        // Destructuring to grab images out of the array with rest operator to get all the rest of the images in the array
        const [mainImg, ...defaultImg] = images;
        console.log(defaultImg);
        
        return (
          <>

           <StyledHero img={mainImg || this.state.defaultBcg}>
               <Banner title={`${name} room`}>
                   <Link to="/rooms" className="btn-primary">
                       Back to Rooms
                   </Link>
               </Banner>
           </StyledHero>
            <section className="single-room">
                <div className="single-room-images">

                {defaultImg.map((e, i) => {
                    return <img key={i} src={e} alt={name} />
                })}
                </div>
                <div className="single-room-info">
                    <article className="desc">
                        <h3>Details</h3>
                        <p>{description}</p>
                    </article>
                    <article className="info">
                        <h3>Info</h3>
                        <h6>Price: ${price}</h6>
                        <h6>Size: {size} SQFT</h6>
                        <h6>
                            Max Capacity: {
                                capacity > 1 ? `${capacity} people` :
                                `${capacity } person`
                            }
                        </h6>
                        <h6>{pets ? 'Pets Allowed' : 'No Pets Allowed'}</h6>
                        {/* The && operator checks if there is breakfast and if true it will display, if false, nothing will be displayed */}
                        <h6>{breakfast && 'Free Breakfast Included'}</h6>
                    </article>
                </div>
            </section>
            <section className="room-extras">
                <h6>Extras</h6>
                <ul className="extras">
                    {extras.map((e, i) => {
                        return <li key={i}>
                            - {e}
                        </li>
                    })}
                </ul>
            </section>
          </>
        )
    }
}
