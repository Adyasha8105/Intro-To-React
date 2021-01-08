import React, {Component} from 'react';
// import styled from 'styled-components'
import './App.css';
// import Radium, {StyleRoot} from 'radium';
// import UserInput from './UserInput/UserInput.js';
// import UserOutput from './UserOutput/UserOutput.js';

import Persons from '../components/Persons/Persons';
import '../components/Persons/Person/Person.css';
  
// const StyledButton = styled.button`  
// background-color: green;
// font: inherit;
// border: 2px solid black;
// padding: 8px;
// cursor: pointer;
// &:hover {
//   background-color: lightgreen;
//   color: black;
//   `;

class App extends Component {
  state = {
    persons: [
       {id: 'drh12', name: 'Max', age: 28},
       {id: 'gsdg25', name: 'Manu', age: 29},
       {id: 'fgh48', name: 'Adya', age: 26},
    ],
    otherState: 'some other value',
    showPersons: false
  }

 switchNameHandler = (newName) => {
   // Don't do this  this.state.persons[0].name = 'Sandeep';
   this.setState({
    persons: [
      {name: newName, age: 28}, 
      {name: 'Manu', age: 29},
      {name: 'silu', age: 26},
   ]
   })
}

nameChangeHandler = (event, id) => {
  const personIndex = this.state.persons.findIndex(p =>{
    return p.id  === id;
  })

  const person = {...this.state.persons[personIndex]}
  person.name = event.target.value;
  const persons = [...this.state.persons];
  persons[personIndex]= person;


  this.setState({ persons: persons});
  //   persons: [
  //     {name: 'max', age: 28}, 
  //     {name: event.target.value, age: 29},
  //     {name: 'silu', age: 26},
  //  ]
  
}

deletePersonHandler = (personIndex) => {
  // const persons =  this.state.persons.slice();
  // spread operator (create a copy and update)
  const persons = [...this.state.persons];
  persons.splice(personIndex, 1);
  this.setState({persons:persons});
}


togglePersonsHandler = () => {
  const doesShow = this.state.showPersons;
  this.setState({showPersons: !doesShow});
}

render() {
  // const style = {
  //   backgroundColor: 'green',
  //   font: 'inherit',
  //   border: '2px solid black',
  //   padding: '8px',
  //   cursor: 'pointer',
  //   ':hover': {
  //     backgroundColor: 'lightgreen',
  //     color: 'black',
  //   }
  // };

  //easymethod to render the elemnts rather using conditional statement

  let persons = null;
  if (this.state.showPersons) {
    persons = (
      <div> <Persons persons={this.state.persons}
              clicked={this.deletePersonHandler}
              changed={this.nameChangedHandler}/>  
     </div> 
    );
    // style.backgroundColor = 'red';
    // style[':hover'] = {
    //    backgroundColor: 'salmon',
    //    color: 'black',
    // };
  }

  return (
    <div className="App">
      
      {persons}
    </div>
);}
  //very compliment
  //return React.createElement('div', {className:'App'}, React.createElement('h1', null, 'hi, I am a React App'));
}

export default App;
// export default Radium(App);

/* 1234 <Person 
name={this.state.persons[0].name} 
age={this.state.persons[0].age}/>
<Person 
name={this.state.persons[1].name} 
age={this.state.persons[1].age}
click={this.switchNameHandler.bind(this,'Max')}
changed={this.nameChangeHandler}>
  Hey bro </Person>
<Person 
name={this.state.persons[2].name}  
age={this.state.persons[2].age} />  */

// class App extends Component {
//   state = {
//     username: 'supermax',
//   }

//   inputChangeHandler = (event) => {
//     this.setState({username: event.target.value})
//   }

//   render () {
//     return (
//       <div>
//         <UserInput changed={this.inputChangeHandler} currentName={this.state.username} />
//         <UserOutput username="Max"/>
//         <UserOutput username={this.state.username}/>
//       </div>
      
//     )
//   }
// }

// export default App;







// const App = props => {
//   const [ personsState, setPersonState ] = useState({
//     persons: [
//        {name: 'Max', age: 28},
//        {name: 'Manu', age: 29},
//        {name: 'Adya', age: 26},
//     ]
//   });

// const switchNameHandler = () => {
//   setPersonState({
//     persons: [
//       {name: 'Madyasha', age: 28}, 
//       {name: 'Manu', age: 29},
//       {name: 'silu', age: 26},
//    ]
//    });
// }
//   return (
//     <div className="App">
//       <h1>Hey, React</h1>
//       <h1>it is working</h1>
//       <button onClick={switchNameHandler}>switch names</button>
//       <Person name={personsState.persons[0].name} age={personsState.persons[0].age}/>
//       <Person name={personsState.persons[1].name} age={personsState.persons[1].age}>Hey bro</Person>
//       <Person name={personsState.persons[2].name}  age={personsState.persons[2].age} />
//     </div>
// );
// }

// export default App;