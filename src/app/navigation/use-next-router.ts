import { useRouter } from 'next/navigation'

export const useNextAppDirRouter = ():
  | ReturnType<typeof useRouter>
  | undefined => {
  return useRouter()
}
