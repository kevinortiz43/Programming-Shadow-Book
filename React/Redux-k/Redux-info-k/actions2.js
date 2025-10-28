const redux = require("redux") // will be using import
const initialState = {
    count: 0
}

function reducer(state=initialState, action) {
    switch(action.type) {
        case "INCREMENT":
            return {
                count: state.count + 1
            } // don’t need break since we have return
        case "DECREMENT":
            return {
                count: state.count - 1
            }
        default: // else return orig state
            return state
    }
}

const store = redux.createStore(reducer) 
// create new store, passing in reducer 
// this is when we actually start using Redux

console.log(store)
// {dispatch: dispatch(action), subscribe: subscribe(listener), getState: getState(), replaceReducer: replaceReducer(nextReducer) }

// subscribe lets us pass function inside of it
// subscribing to change to store, and if that change is made, then we run the function
store.subscribe(() => {
    console.log(store.getState()) // quick way to get and see current state of object
})

store.dispatch({type: "INCREMENT"}) // {count: 1}
store.dispatch(increment()) // {count: 2} // same result as above
store.dispatch({type: "INCREMENT"}) // {count: 3}
store.dispatch({type: "DOUBLE"}) // {count: 6}
store.dispatch(decrement()) // {count: 5}
store.dispatch({type: "DECREMENT"}) // {count: 4}
store.dispatch({type: "HALVE"}) // {count: 2}
store.dispatch({type: "WEIRD"}) // {count: 2}