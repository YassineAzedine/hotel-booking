"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  // Example: Animated typing effect for hero subtitle (advanced UX touch)
  const fullText = "Book the best hotels and rooms with ease and confidence.";
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section
        aria-label="Hero section"
        className="relative h-[500px] md:h-[600px] flex items-center justify-center text-center text-white overflow-hidden"
      >
        <Image
          src="/hero-hotel.jpg"
          alt="Hotel view with mountains and sky"
          fill
          style={{ objectFit: "cover" }}
          priority
          quality={90}
          sizes="(max-width: 768px) 100vw, 50vw"
          placeholder="blur"
          blurDataURL="/hero-hotel-blur.jpg" // Provide a small base64 blur placeholder
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"
          aria-hidden="true"
        ></div>

        <div className="relative z-10 max-w-4xl px-6 md:px-12">
          <h1
            className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg"
            tabIndex={0}
          >
            Welcome to Your Dream Stay
          </h1>
          <p
            className="text-lg md:text-2xl mb-12 font-medium drop-shadow-md tracking-wide"
            aria-live="polite"
          >
            {displayedText}
            <span className="blinking-cursor">|</span>
          </p>
          <a
            href="/hotels"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition px-10 py-4 rounded-xl text-lg font-semibold shadow-lg"
            aria-label="Explore hotels"
          >
            Explore Hotels
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section
        aria-labelledby="features-title"
        className="py-20 px-6 md:px-20 bg-white"
      >
        <h2
          id="features-title"
          className="text-3xl font-extrabold text-center mb-16"
        >
          Why Choose Us?
        </h2>

        <div className="grid md:grid-cols-3 gap-16 max-w-7xl mx-auto">
          {[
            {
              icon: "/icons/secure.svg",
              title: "Secure Booking",
              description:
                "Your personal information is safe with our top-notch security.",
            },
            {
              icon: "/icons/support.svg",
              title: "24/7 Support",
              description: "Our customer service is available anytime to help you.",
            },
            {
              icon: "/icons/best-price.svg",
              title: "Best Prices",
              description:
                "We offer competitive rates on all hotels and rooms.",
            },
          ].map(({ icon, title, description }) => (
            <article
              key={title}
              role="region"
              aria-labelledby={`${title.replace(/\s+/g, "-").toLowerCase()}-title`}
              className="flex flex-col items-center text-center space-y-6 max-w-sm mx-auto"
            >
              <Image
                src={icon}
                alt={`${title} icon`}
                width={96}
                height={96}
                priority
                className="mb-2"
              />
              <h3
                id={`${title.replace(/\s+/g, "-").toLowerCase()}-title`}
                className="text-2xl font-semibold"
              >
                {title}
              </h3>
              <p className="text-gray-600 text-base md:text-lg">{description}</p>
            </article>
          ))}
        </div>
      </section>
      
      {/* Newsletter Signup Section - Advanced addition */}
      <section
        aria-label="Newsletter signup"
        className="py-16 bg-indigo-700 text-white px-6 md:px-20"
      >
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">
            Stay Updated with Exclusive Offers
          </h2>
          <p className="text-lg max-w-xl mx-auto">
            Subscribe to our newsletter and never miss out on special deals and
            promotions.
          </p>
          <form
            className="flex flex-col sm:flex-row justify-center gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for subscribing!");
            }}
          >
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              id="email"
              required
              placeholder="Enter your email"
              className="w-full sm:w-auto px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <button
              type="submit"
              className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
