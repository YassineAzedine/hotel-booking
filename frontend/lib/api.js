// ✅ fetch côté serveur

export async function fetchHotels() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hotels`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch hotels');
  return res.json();
}

export async function fetchHotelById(id) {
  console.log('fetchHotelById called with id:', id);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hotels/${id}`);
  if (!res.ok) throw new Error(`Hotel ${id} not found`);
  return res.json();
}
