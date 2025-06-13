export async function fetchHotels() {
  const res = await fetch('http://localhost:3000/hotels', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch hotels');
  }
  return res.json();
}
export async function fetchHotelById(id) {
  console.log('fetchHotelById called with id:', id);
  const res = await fetch(`http://localhost:3000/hotels/${id}`);
  console.log('fetchHotelById response:', res);
  return res.json();
}