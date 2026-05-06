import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar({ storeLink }: { storeLink: string }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="shrink-0 flex items-center gap-2 cursor-pointer">
                        <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl leading-none">H</span>
                        </div>
                        <span className="font-bold text-2xl tracking-tight text-slate-900">HOMEIX</span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#collections" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Collections</a>
                        <a href="#reviews" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Reviews</a>
                        <a href="#location" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Location</a>
                        <a
                            href={storeLink}
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
    );
}
