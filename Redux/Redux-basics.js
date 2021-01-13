const redux = require('redux');
const createStore = redux.createStore;

const initialState = { //initial the state
    counter: 0
}

//reducer
const rootReducer = (state = initialState, action) => { //updated the state
    if(action.type === 'INC_COUNTER'){
        //you can't say state counter ++ as it is immutable
        return{
            ...state,
            counter: state.counter+ 1,
        }
    }
    if(action.type === 'ADD_COUNTER'){
        return{
            ...state,
            counter: state.counter+ action.value,
        }  
    }
    return state;
};

// store
const store = createStore(rootReducer); 
console.log(store.getState());

// subscription
store.subscribe(() => { //getting triggered when state us updated
    console.log('[Subscription]', store.getState());
});

// dispatching action
store.dispatch({type: 'INC_COUNTER'}); 
store.dispatch({type: 'ADD_COUNTER',value: 10}); 
console.log(store.getState()); 

