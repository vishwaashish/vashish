import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'
import {
  IHistory,
  IInitialState,
  IInitialStateDefault,
  IOperation,
} from '@/types/calculator.model'

const initialState: IInitialStateDefault = {
  current: '0',
  previous: null,
  operation: null,
  overwrite: false,
  history: [],
}

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    addDigit: (state, action: PayloadAction<string>) => {
      if (state.overwrite) {
        return {
          ...state,
          current: action.payload,
          overwrite: false,
        }
      }

      if (action.payload === '0' && state.current === '0') {
        return state
      }

      if (action.payload === '.' && state.current?.includes('.')) {
        return state
      }

      state.current = `${state.current || ''}${action.payload}`
    },
    chooseOperation: (state, action: PayloadAction<IOperation | string>) => {
      if (state.current == null && state.previous === null) {
        return state
      }

      if (state.current == null) {
        return {
          ...state,
          operation: action.payload,
        }
      }
      if (state.previous === null) {
        return {
          ...state,
          operation: action.payload,
          previous: state.current,
          current: null,
        }
      }

      return {
        ...state,
        previous: evaluate(state),
      }
    },
    total: state => {
      if (!state.current || !state.operation || !state.previous) {
        return state
      }

      return {
        ...state,
        history: [
          ...state.history,
          {
            first: +state.previous,
            second: +state.current,
            operation: state.operation,
            total: +evaluate(state),
          },
        ],
        overwrite: true,
        previous: null,
        operation: null,
        current: evaluate(state),
      }
    },

    deleteDigit: state => {
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          current: null,
        }
      }

      if (!state.current) return state
      if (state.current.length === 1) return { ...state, current: null }

      return { ...state, current: state.current.slice(0, -1) }
    },

    clear: state => {
      return {
        ...state,
        current: '0',
        previous: null,
        operation: null,
        overwrite: false,
      }
    },

    populateHistory: (state, action: PayloadAction<IHistory>) => {
      const { first, second, operation, total } = action.payload
      return {
        ...state,
        current: String(second),
        previous: String(first),
        operation: operation,
      }
    },
  },
})

function evaluate({ current, previous, operation }: IInitialState) {
  const prev: number = parseFloat(previous!)
  const cur: number = parseFloat(current!)

  if (isNaN(prev) || isNaN(cur)) {
    return ''
  }

  let computation = ''

  switch (operation) {
    case '+': {
      computation = String(prev + cur)
      break
    }
    case '-': {
      computation = String(prev - cur)
      break
    }
    case '*': {
      computation = String(prev * cur)
      break
    }
    case '÷': {
      computation = String(prev / cur)
      break
    }
    case '%': {
      computation = String(prev % cur)
      break
    }
  }

  return String(computation)
}
export const stateCalculator = (state: RootState) => state.calculator

export const {
  addDigit,
  chooseOperation,
  deleteDigit,
  clear,
  total,
  populateHistory,
} = calculatorSlice.actions

export default calculatorSlice.reducer
