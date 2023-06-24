import type { useRouter } from 'next/navigation'

export const useNextAppDirRouter = ():
  | ReturnType<typeof useRouter>
  | undefined => undefined
