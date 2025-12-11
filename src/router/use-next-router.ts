import { useRouter as _useRouter } from 'next/router'

export const useNextRouter = (): ReturnType<typeof _useRouter> | undefined => {
  return _useRouter()
}
