import React from 'react'
import {addVoteTo} from "../reducers/anecdoteReducer"
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {

 const anecdotes = useSelector(state => state)
    .sort((a,b) => a.votes -b.votes)
    .reverse()
 const dispatch = useDispatch()

 
 const vote = (id) => {
    dispatch(addVoteTo(id))
  }

    return ( <div>
  <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={()=>vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div> );
}
 
export default AnecdoteList;