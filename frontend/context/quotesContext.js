import React, { createContext, useReducer } from 'react'

export const QuotesContext = createContext()

const CREATE_QUOTE = 'CREATE_QUOTE'
const DELETE_QUOTE = 'DELETE_QUOTE'
const EDIT_QUOTE_AUTHENTICITY = 'EDIT_QUOTE_AUTHENTICITY'
const SET_HIGHLIGHTED_QUOTE = 'SET_HIGHLIGHTED_QUOTE'
const TOGGLE_VISIBILITY = 'TOGGLE_VISIBILITY'

let id = 1
const getNextId = () => id++
const initialState = {
    displayAllQuotes: true,
    highlightedQuote: null,

 quotes: [
  {
    "id": 1,
    "quoteText": "The success of every woman should be the inspiration to another. We should raise each other up.",
    "authorName": "Serena Williams",
    "apocryphal": false
  },
  {
    "id": 2,
    "quoteText": "My mother told me to be a lady. And for her, that meant be your own person, be independent.",
    "authorName": "Ruth Bader Ginsburg",
    "apocryphal": false
  },
  {
    "id": 3,
    "quoteText": "Do not follow where the path may lead. Go instead where there is no path and leave a trail.",
    "authorName": "Muriel Strode",
    "apocryphal": false
  },
  {
    "id": 4,
    "quoteText": "You are never too small to make a difference.",
    "authorName": "Greta Thunberg",
    "apocryphal": false
  }
]
}
const reducer = (state, action) => {
    switch (action.type) {
      case CREATE_QUOTE:
        return { ...state, quotes: [...state.quotes, action.payload] }
      case DELETE_QUOTE:
        return { ...state, quotes: state.quotes.filter(qt => qt.id !== action.payload) }
      case EDIT_QUOTE_AUTHENTICITY:
        return {
          ...state,
          quotes: state.quotes.map(qt => {
            if (qt.id != action.payload) return qt
            return { ...qt, apocryphal: !qt.apocryphal }
          })
        }
      case SET_HIGHLIGHTED_QUOTE:
        return {
          ...state,
          highlightedQuote: state.highlightedQuote !== action.payload
            ? action.payload
            : null
        }
      case TOGGLE_VISIBILITY:
        return { ...state, displayAllQuotes: !state.displayAllQuotes }
      default:
        return state
    }
  }

  export function QuotesProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState)

  const createQuote = ({ authorName, quoteText }) => {
    const newQuote = { id: getNextId(), authorName, quoteText, apocryphal: false }
    dispatch({ type: CREATE_QUOTE, payload: newQuote })
  }
  const deleteQuote = id => {
    dispatch({ type: DELETE_QUOTE, payload: id })
  }
  const editQuoteAuthenticity = id => {
    dispatch({ type: EDIT_QUOTE_AUTHENTICITY, payload: id })
  }
  const setHighlightedQuote = id => {
    dispatch({ type: SET_HIGHLIGHTED_QUOTE, payload: id })
  }
  const toggleVisibility = () => {
    dispatch({ type: TOGGLE_VISIBILITY })
  }
  const value = {
    ...state,
    createQuote,
    deleteQuote,
    editQuoteAuthenticity,
    setHighlightedQuote,
    toggleVisibility,
  }

    return (
        <QuotesContext.Provider value={value}>
            {props.children}
        </QuotesContext.Provider>
    )
  }