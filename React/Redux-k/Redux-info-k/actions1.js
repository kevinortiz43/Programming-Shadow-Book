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

const store = redux.createStore(reducer) // create new store, giving reducer

store.subscribe(() => {
    console.log(store.getState())
})

store.dispatch({type: "INCREMENT"}) // determines what’ll happen to state
store.dispatch({type: "INCREMENT"})
store.dispatch({type: "DECREMENT"})
