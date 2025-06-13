import { fetchHotels } from '@/lib/api';
import HotelsClient from './HotelsClient';

export default async function HotelsPage() {
  const hotels = await fetchHotels();
  return <HotelsClient hotels={hotels} />;
}