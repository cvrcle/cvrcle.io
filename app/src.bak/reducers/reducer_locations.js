
// location reducer returns new application state if the action
// 'LOCATION_SELECTED' was taken


export const LocationReducer = (state = [], action) => {
  if (action.type === 'ENTRY_ADDED') {
    // console.log('1');
    let locations = state.slice(0);
    locations.push(action.payload);
    console.log(locations)
    // console.log('state and action', state)
    return locations
  }
  return state
}


