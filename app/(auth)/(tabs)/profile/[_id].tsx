import { useLocalSearchParams } from 'expo-router';
import Profile from '@/components/Profile';

const Page = () => {
  const { _id } = useLocalSearchParams();

  return <Profile userId={_id as string} showBackButton />;
};
export default Page;