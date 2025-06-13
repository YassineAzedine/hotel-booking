// app/hotel/[id]/page.tsx (Server component)
import { fetchHotelById } from '@/lib/api';
import HotelPage from './HotelsDetailClient'; // client component

const page = async ({ params }) => {
    
  const hotel = await fetchHotelById(params.id);
 console.log('hotel', hotel);
 
  return <HotelPage hotel={hotel} />;

};

export default page;
