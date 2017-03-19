export const TestSession = (session) => {
  return {
    type: "SAVE_SESSION",
    payload: session
  }
}

export const updateLocations = (locations) => {
  console.log('this will take care of updating markers')
  return {
    type: "ENTRY_ADDED",
    payload: locations
  }
}

