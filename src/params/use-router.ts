import { useRouter as useNextRouter } from 'next/router'
export const useRouter = (): ReturnType<typeof useNextRouter> | undefined => {
  return useNextRouter()
}
