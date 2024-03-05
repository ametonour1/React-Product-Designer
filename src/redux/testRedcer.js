const initialState = {
    data:"heloooooooooooooooooo"
};

const testReducer = (state = initialState,action) => {

    switch(action.type) {
        case "SET_DATA":
            return {
                ...state,
                data:action.payload
            };
            default:
                return state
    }
}

export default testReducer