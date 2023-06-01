import { useParams } from 'next/navigation'

export default () => {
  // need to cast this type to appease TS, idk why
  return useParams() as Record<string, string> | undefined
}
