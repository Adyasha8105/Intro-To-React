
import React from 'react'
import './Person.css';
// import styled from 'styled-components'
// import Radium from "radium";

// const StyledDiv = styled.div`   
//  width:60%;
// margin:16px auto; 
// border: 1px solid #eee;
// box-shadow: 0 2px 3px #ccc;
// padding: 16px;
// text-align: center;

// '@media (min-width: 500px)':{
//     width: '450px'
//  }
// `;
const person = (props) => {
    // return <p>I'm a Person and I am {Math.floor(Math.random() * 30)}</p>
    // const style = {
    //     '@media (min-width: 500px)':{
    //        width: '450px'
    //     }
    // }
    return(
        <div className= "Person">
            <h1 onClick= {props.click}>hey! My name is {props.name} and my age is {props.age}</h1>
            <p>{props.children}</p> 
            <input type="text" onChange={props.changed}/>
        </div>
    );
}

export default person