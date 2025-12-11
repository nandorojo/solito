import type * as native from './replace-helpers.native'
import { createContext } from 'react'

const LinkingContext = createContext({
  options: undefined,
}) as typeof native.LinkingContext

let StackActions: typeof native.StackActions,
  getStateFromPath: typeof native.getStateFromPath,
  getActionFromState: typeof native.getActionFromState

export { LinkingContext, StackActions, getStateFromPath, getActionFromState }
