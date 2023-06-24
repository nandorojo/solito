import { useSearchParams } from 'next/navigation'

export default () => {
  // need to cast this type to appease TS, idk why
  return useSearchParams() as ReturnType<typeof useSearchParams> | undefined
}
