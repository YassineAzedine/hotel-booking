export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 mt-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} HotelBooking. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a
            href="#"
            className="hover:text-white"
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            href="#"
            className="hover:text-white"
            aria-label="Twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <a
            href="#"
            className="hover:text-white"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
