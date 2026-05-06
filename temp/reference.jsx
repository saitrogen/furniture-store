import React, { useState } from 'react';
import { Star, MapPin, Phone, Clock, Menu, X, ArrowRight, Quote } from 'lucide-react';

// --- MOCK DATA ---
const storeData = {
  name: "HOMEIX Sofa & Furniture Studio",
  tagline: "Premium Custom Sofas & Furniture in Malappuram",
  address: "Gudalur - Nilambur - Kozhikode Road, Vadapuram, Kerala 676542",
  phone: "+91 98765 43210", // Placeholder
  hours: "10:00 AM - 9:00 PM",
  rating: 4.9,
  totalReviews: 162,
  mapLink: "https://maps.app.goo.gl/YourExactMapLinkHere"
};

const featuredProducts = [
  {
    id: "p1",
    name: "Luxury L-Shape Sectional",
    category: "Sofas",
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "p2",
    name: "Modern Teak Dining Set",
    category: "Dining",
    imageUrl: "https://images.unsplash.com/photo-1617806118233-18e1c0945594?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "p3",
    name: "Classic Wooden Wardrobe",
    category: "Bedroom",
    imageUrl: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
  }
];

const customerReviews = [
  {
    id: "r1",
    author: "Mohammed S.",
    text: "They are the best for custom-made sofas in the area. Really happy and truly satisfied with their newly delivered products. Highly recommended!",
    date: "2 months ago"
  },
  {
    id: "r2",
    author: "Aisha N.",
    text: "Timely delivery, careful handling, and professional assembly. The quality of the wood and fabric is top-notch.",
    date: "4 months ago"
  },
  {
    id: "r3",
    author: "Rahul V.",
    text: "Good service, premium products, and affordable prices. The staff was very helpful in choosing the right design for our living room.",
    date: "5 months ago"
  }
];

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="shrink-0 flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl leading-none">H</span>
              </div>
              <span className="font-bold text-2xl tracking-tight">HOMEIX</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#collections" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Collections</a>
              <a href="#reviews" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Reviews</a>
              <a href="#location" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Location</a>
              <a 
                href={storeData.mapLink}
                target="_blank" 
                rel="noreferrer"
                className="bg-slate-900 text-white px-5 py-2.5 rounded-full font-medium hover:bg-slate-800 transition-colors shadow-sm"
              >
                Get Directions
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-600 hover:text-slate-900 focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1 shadow-lg absolute w-full">
            <a href="#collections" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50">Collections</a>
            <a href="#reviews" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50">Reviews</a>
            <a href="#location" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50">Location</a>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative h-[85vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=80" 
            alt="Modern living room furniture" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-slate-900/40"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white mb-6">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium tracking-wide">4.9 Star Rated Studio in Vadapuram</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 drop-shadow-md">
            Elevate Your Space with <span className="text-slate-200 italic">Custom</span> Furniture
          </h1>
          <p className="text-lg md:text-xl text-slate-100 mb-10 max-w-2xl mx-auto drop-shadow">
            {storeData.tagline}. Discover our exclusive collection of hand-crafted sofas, dining sets, and bedroom essentials designed for comfort and style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="#collections" 
              className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 rounded-full font-semibold text-lg hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              View Collections
            </a>
            <a 
              href="#location" 
              className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              Visit Store <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* FEATURED COLLECTIONS */}
      <section id="collections" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Signature Collections</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Explore our wide range of premium furniture, meticulously crafted to transform your house into a home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group relative rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300">
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 bg-white">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{product.category}</div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-slate-700 transition-colors">{product.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF (REVIEWS) */}
      <section id="reviews" className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by our Community</h2>
              <p className="text-slate-400 text-lg">
                Don't just take our word for it. See what our customers in Malappuram have to say about our quality and service.
              </p>
            </div>
            <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-2xl border border-white/10">
              <div className="text-4xl font-bold">{storeData.rating}</div>
              <div className="flex flex-col">
                <div className="flex gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <span className="text-sm text-slate-400">Based on {storeData.totalReviews} reviews</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {customerReviews.map((review) => (
              <div key={review.id} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
                <Quote className="w-10 h-10 text-slate-600 mb-6" />
                <div className="flex gap-1 text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-slate-300 mb-8 leading-relaxed">"{review.text}"</p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="font-semibold text-white">{review.author}</span>
                  <span className="text-sm text-slate-500">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION & FOOTER */}
      <footer id="location" className="bg-white pt-24 pb-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            
            {/* Store Info */}
            <div>
              <div className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-2xl leading-none">H</span>
                </div>
                <span className="font-bold text-3xl tracking-tight text-slate-900">HOMEIX</span>
              </div>
              
              <p className="text-slate-600 text-lg mb-10 max-w-md">
                Your local destination for premium, custom-crafted furniture. Visit our studio to experience the quality firsthand.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-slate-900" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Visit Our Studio</h4>
                    <p className="text-slate-600">{storeData.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-slate-900" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Opening Hours</h4>
                    <p className="text-slate-600">{storeData.hours} (Open Daily)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-slate-900" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Contact Us</h4>
                    <p className="text-slate-600">{storeData.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-slate-100 rounded-3xl overflow-hidden min-h-[400px] relative flex flex-col items-center justify-center border border-slate-200">
               {/* In a real scenario, you'd put an iframe here. For the showcase, an image + button looks cleaner */}
               <div className="absolute inset-0 opacity-40 mix-blend-multiply bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center"></div>
               <div className="relative z-10 text-center p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl max-w-xs mx-auto border border-slate-100">
                  <MapPin className="w-10 h-10 text-slate-900 mx-auto mb-4" />
                  <h3 className="font-bold text-xl mb-2 text-slate-900">Find Us on Maps</h3>
                  <p className="text-slate-600 text-sm mb-6">Get directions to our Vadapuram studio.</p>
                  <a 
                    href={storeData.mapLink}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full py-3 px-6 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-colors"
                  >
                    Open Google Maps
                  </a>
               </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} HOMEIX Sofa & Furniture Studio. All rights reserved.
            </p>
            <div className="text-slate-500 text-sm flex gap-4">
              <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}