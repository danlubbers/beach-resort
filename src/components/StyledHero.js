import styled from 'styled-components';
import defaultImage from '../images/room-1.jpeg';


const StyledHero = styled.header`
    min-height: 60vh;
    // Using Ternary Operator so if Image is found use it, otherwise if not image is found use the defaultImage
    background: url(${props => props.img ? props.img : defaultImage}) center/cover no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
`

export default StyledHero;