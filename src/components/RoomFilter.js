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
            </form>
        </section>
    )
}
