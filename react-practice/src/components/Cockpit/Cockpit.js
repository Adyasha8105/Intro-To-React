import React from 'react';\
import'./Cockpit.css';

const cockpit = (props) => {

    const classes= [];
    btnClass
    if(props.persons.length <= 2 ){
      classes.push('red'); 
    }
    if(props..persons.length <= 1 ){
      classes.push('bold'); 
    }

    return(
        <div>
        <h1>Hey, React</h1>
        <h1 className = {classes.join(' ')}>This is really working</h1>
        <button className="Button" onClick={this.togglePersonsHandler}>Toggle Persons</button>
        </div>
        );
}

export default cockpit; 