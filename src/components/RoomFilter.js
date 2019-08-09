import React from 'react'
// useContext is a new React hook
import { useContext } from 'react';
import { RoomContext } from '../context';
import Title from '../components/Title';
// get all unique values
const getUnique = (items, value) => {
    return [...new Set(items.map(item => item[value]))]
}

export default function RoomFilter({rooms}) {
    const context = useContext(RoomContext);
    console.log(context);
    // destructure the variables
    const {
        handleChange, 
        type, 
        capacity, 
        price, 
        minPrice, 
        maxPrice, 
        minSize, 
        maxSize, 
        breakfast, 
        pets
    } = context;

    // get unique types
    let types = getUnique(rooms, 'type');
    // add all using spread operator
    types = ['all', ...types]
    // map to jsx
    types = types.map((item, i) => {
        return <option value={item} key={i}>{item}</option>
    })

    let people = getUnique(rooms, 'capacity');
    people = people.map((item, i) => {
        return <option value={item} key={i}>{item}</option>
    })
    return (
        <section className="filter-container">
            <Title title="search rooms" />
            <form className="filter-form">
                {/* select type */}
                <div className="form-group">
                    <label htmlFor="type">room type</label>
                    <select name="type" id="type" value={type} className="form-control" onChange={handleChange}>
                    {types}
                    </select>
                </div>
                {/* end select type */}
                  {/* guest */}
                  <div className="form-group">
                    <label htmlFor="capacity">Guests</label>
                    <select name="capacity" id="capacity" value={capacity} className="form-control" onChange={handleChange}>
                    {people}
                    </select>
                </div>
                {/* end guest */}
                {/* Start Room Price */}
                <div className="form-croup">
                    <label htmlFor="price">
                        room price ${price}
                    </label>
                    <input type="range" name="price" min={minPrice} max={maxPrice} id="price" value={price} onChange={handleChange} className="form-control" />
                </div>
                {/* End Room Price */}
                {/* Start Room Size */}
                <div className="form-group">
                    <label htmlFor="size">Room Size</label>
                    <div className="size-inputs">
                        <input type="number" name="minSize" id="size" value={minSize} onChange={handleChange} className="size-input"/>
                        <input type="number" name="maxSize" id="size" value={maxSize} onChange={handleChange} className="size-input"/>
                    </div>
                </div>
                {/* End Room Size */}
                {/* Start of Checkboxe */}
                <div className="form-group">
                    <div className="single-extra">
                        <input type="checkbox" name="breakfast" id="breakfast" checked={breakfast} onChange={handleChange}/>
                        <label htmlFor="breakfast">breakfast</label>
                    </div>
                </div>
                <div className="form-group">
                    <div className="single-extra">
                        <input type="checkbox" name="pets" id="pets" checked={pets} onChange={handleChange}/>
                        <label htmlFor="pets">Pets</label>
                    </div>
                </div>
                {/* End of Checkboxes */}
            </form>
        </section>
    )
}
