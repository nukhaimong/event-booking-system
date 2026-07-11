// app/page.tsx
import Link from 'next/link';
import {
  Calendar,
  Ticket,
  MapPin,
  Clock,
  Star,
  Users,
  ArrowRight,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-24 sm:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Discover Amazing Events
              <span className="block text-blue-200">Book Your Tickets Now</span>
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Find and book tickets for the best concerts, conferences, and
              events happening near you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/events"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-full transition duration-200 shadow-lg hover:shadow-xl"
              >
                Browse Events
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 font-semibold py-3 px-8 rounded-full transition duration-200 border border-white/30"
              >
                <Ticket className="w-5 h-5" />
                View All
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We make booking tickets simple, secure, and hassle-free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Ticket className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Easy Booking
              </h3>
              <p className="text-gray-600 text-sm">
                Book your tickets in just a few clicks with our simple and
                intuitive interface.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Instant Confirmation
              </h3>
              <p className="text-gray-600 text-sm">
                Get instant confirmation and your tickets delivered directly to
                your email.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Best Events
              </h3>
              <p className="text-gray-600 text-sm">
                Discover and book tickets for the most exciting events in your
                area.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Upcoming Events
              </h2>
              <p className="text-gray-600 mt-1">
                Check out these popular events
              </p>
            </div>
            <Link
              href="/events"
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Event Card 1 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group">
              <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 relative">
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                  🎵 Concert
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition">
                  Summer Music Festival
                </h3>
                <div className="space-y-2 mt-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Dec 25, 2025</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>Madison Square Garden, NYC</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>150 tickets left</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <span className="text-xl font-bold text-blue-600">
                    $50.00
                  </span>
                  <Link
                    href="/events/1"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Event Card 2 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group">
              <div className="h-48 bg-gradient-to-r from-purple-400 to-pink-500 relative">
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                  🎤 Conference
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition">
                  Tech Summit 2025
                </h3>
                <div className="space-y-2 mt-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Jan 15, 2026</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>Convention Center, SF</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>80 tickets left</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <span className="text-xl font-bold text-blue-600">
                    $120.00
                  </span>
                  <Link
                    href="/events/2"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Event Card 3 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group">
              <div className="h-48 bg-gradient-to-r from-green-400 to-teal-500 relative">
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                  🎭 Theater
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition">
                  Broadway Night
                </h3>
                <div className="space-y-2 mt-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Feb 10, 2026</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>Broadway Theater, NYC</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>45 tickets left</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <span className="text-xl font-bold text-blue-600">
                    $75.00
                  </span>
                  <Link
                    href="/events/3"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Experience Amazing Events?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of happy attendees and book your tickets today.
          </p>
          <Link
            href="/events"
            className="inline-block bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-full transition duration-200 shadow-lg hover:shadow-xl"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">EventHub</h3>
              <p className="text-sm">
                Book tickets for the best events in your city.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/events" className="hover:text-white transition">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="/tickets" className="hover:text-white transition">
                    My Tickets
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition">
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/faq" className="hover:text-white transition">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="hover:text-white transition">
                  Twitter
                </a>
                <a href="#" className="hover:text-white transition">
                  Instagram
                </a>
                <a href="#" className="hover:text-white transition">
                  Facebook
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
            <p>
              &copy; {new Date().getFullYear()} EventHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
