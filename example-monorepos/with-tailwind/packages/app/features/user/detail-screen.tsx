"use client";

import { Text } from 'react-native';
import { useParams, useRouter } from 'solito/navigation';

const useUserParams = useParams<{ userId: string }>

export function UserDetailScreen() {
  const router = useRouter()
  const { userId } = useUserParams()
  return (
    <Text className='text-red-400 font-bold'>Hello {userId}</Text>
  )
}
