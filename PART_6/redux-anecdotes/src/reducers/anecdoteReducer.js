const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (10000000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE': 
    const anecdote =action.data
      return state.map(e => e.id !== anecdote.id ? e : {...anecdote, votes: anecdote.votes + 1} )
    case 'CREATE_NEW':
      return [...state, action.data]
    // case 'BAD':
    //   return {...state , bad:state.bad + 1}
    // case 'ZERO':
    //   return initialState
    default: return state
  }
}
export const createAnecdote =(anecdote) => {
  return {
    type: 'CREATE_NEW',
    data:{
        content: anecdote,
        id: getId(),
        votes: 0
    }
  }
}
export const addVoteTo = (anecdote) =>{
  return {
    type: 'VOTE',
    data: anecdote
  }
}

export default reducer