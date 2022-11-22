import { createContext } from 'react'

const LinkingContext = createContext({
  options: undefined,
})

let StackActions, getStateFromPath, getActionFromState

export { LinkingContext, StackActions, getStateFromPath, getActionFromState }
