// add post
// export const addEntry = (entry) => {
//   return {
//     type: 'ADD_ENTRY',
//     payload: post
//   }
// }

// // delete post
// export const deleteEntry = (entry) => {
//   return {
//     type: 'DELETE_ENTRY'
//   }
// }

// export const TestSession = (session) => {
//   return {
//     type: "SAVE_SESSION",
//     payload: session
//   }
// }

export const updateLocations = (locations) => {
  console.log('this will take care of updating markers')
  return {
    type: "ENTRY_ADDED",
    payload: locations
  }
}

