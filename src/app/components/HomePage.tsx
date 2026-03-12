import { Link } from 'react-router-dom';
import { ArrowRight, Star, Box, Search, ShoppingCart } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

// ── MOCK PRODUCTS (replace with real data/API later) ──────────────
const ALL_PRODUCTS = [
  { id: 1, name: 'Dragon Figurine', category: 'Figurines', price: 24.99, rating: 4.9, reviews: 128, color: 'from-blue-900/60 to-slate-900/60' },
  { id: 2, name: 'Geometric Vase', category: 'Home Decor', price: 18.99, rating: 4.7, reviews: 84, color: 'from-purple-900/60 to-slate-900/60' },
  { id: 3, name: 'D&D Miniature Set', category: 'Miniatures', price: 34.99, rating: 5.0, reviews: 203, color: 'from-pink-900/60 to-slate-900/60' },
  { id: 4, name: 'Cable Organizer', category: 'Functional', price: 9.99, rating: 4.8, reviews: 56, color: 'from-green-900/60 to-slate-900/60' },
  { id: 5, name: 'Skull Planter', category: 'Home Decor', price: 14.99, rating: 4.6, reviews: 91, color: 'from-orange-900/60 to-slate-900/60' },
  { id: 6, name: 'Knight Helmet', category: 'Figurines', price: 29.99, rating: 4.9, reviews: 47, color: 'from-cyan-900/60 to-slate-900/60' },
  { id: 7, name: 'Phone Stand', category: 'Functional', price: 7.99, rating: 4.5, reviews: 33, color: 'from-yellow-900/60 to-slate-900/60' },
  { id: 8, name: 'Wizard Staff', category: 'Figurines', price: 19.99, rating: 4.8, reviews: 62, color: 'from-indigo-900/60 to-slate-900/60' },
];

export function HomePage() {
  const [searchInput, setSearchInput] = useState('');
  const [results, setResults] = useState<typeof ALL_PRODUCTS>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const q = searchInput.trim().toLowerCase();
    if (!q) {
      setResults([]);
      setHasSearched(false);
      return;
    }
    setHasSearched(true);
    setResults(
      ALL_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      )
    );
  }, [searchInput]);

  // Simple fade out → reset → fade in loop
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let looping = false;

    const handleTimeUpdate = () => {
      if (looping) return;
      const remaining = video.duration - video.currentTime;

      if (remaining <= 1.5) {
        looping = true;

        // Fade out over 1s
        video.style.transition = 'opacity 1s ease';
        video.style.opacity = '0';

        setTimeout(() => {
          // Reset to start while invisible
          video.currentTime = 0;

          // Fade back in over 1s
          video.style.transition = 'opacity 1s ease';
          video.style.opacity = '1';

          // Allow loop to trigger again after fade-in completes
          setTimeout(() => {
            looping = false;
          }, 1000);
        }, 1000);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a12]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;700&display=swap');
        .page-font { font-family: 'Outfit', sans-serif; }
        .serif { font-family: 'Playfair Display', serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.3; }
          50%       { transform: translateY(4px); opacity: 0.7; }
        }

        .fade-up   { animation: fadeUp 0.85s ease-out forwards; }
        .fade-up-1 { animation: fadeUp 0.85s ease-out 0.15s forwards; opacity: 0; }
        .fade-up-2 { animation: fadeUp 0.85s ease-out 0.28s forwards; opacity: 0; }

        .search-glow:focus-within {
          box-shadow: 0 0 0 2px rgba(96,165,250,0.35), 0 8px 40px rgba(96,165,250,0.18);
        }
        .result-card {
          transition: transform 0.25s ease, border-color 0.25s ease;
        }
        .result-card:hover {
          transform: translateY(-3px);
          border-color: rgba(255,255,255,0.18);
        }
        .result-card:hover .card-img {
          transform: scale(1.06);
        }
        .card-img {
          transition: transform 0.4s ease;
        }
        .results-enter {
          animation: fadeIn 0.35s ease-out forwards;
        }
      `}</style>

      {/* ── HERO ───────────────────────────────────────────────────── */}
      <div
        className="page-font relative flex flex-col items-center justify-center overflow-hidden"
        style={{ minHeight: hasSearched ? '52vh' : '100vh', transition: 'min-height 0.6s cubic-bezier(0.4,0,0.2,1)' }}
      >
        {/* Video background */}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          style={{ opacity: 1 }}
        >
          <source src="/hero.mp4" type="video/mp4" />
          <source src="/hero.webm" type="video/webm" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 z-0"
          style={{
            background: hasSearched ? 'rgba(0,0,0,0.75)' : 'rgba(0,0,0,0.60)',
            transition: 'background 0.6s ease'
          }} />

        {/* Hero text + search */}
        <div
          className="relative z-10 text-center px-4 w-full max-w-2xl mx-auto"
          style={{ paddingTop: hasSearched ? '6rem' : '0', paddingBottom: hasSearched ? '2.5rem' : '0', transition: 'padding 0.6s ease' }}
        >
          {/* Headline — shrinks when results show */}
          <div style={{
            transform: hasSearched ? 'scale(0.72)' : 'scale(1)',
            transformOrigin: 'top center',
            transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)',
            marginBottom: hasSearched ? '-1rem' : '0'
          }}>
            <p className="fade-up text-blue-400 text-xs font-semibold tracking-widest uppercase mb-5">
              Handcrafted 3D Prints
            </p>
            <h1 className="fade-up-1 serif text-6xl sm:text-7xl text-white font-normal leading-tight mb-5">
              Bring Ideas<br />
              <span style={{ background: 'linear-gradient(135deg,#60a5fa,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Into Reality.
              </span>
            </h1>
            <p className="fade-up-2 text-white/45 text-base mb-8">
              Unique, made-to-order 3D printed models — figurines, decor, miniatures & more.
            </p>
          </div>

          {/* Search bar */}
          <div className="fade-up-2 relative">
            <div
              className="search-glow flex items-center backdrop-blur-xl rounded-2xl overflow-hidden transition-all border"
              style={{
                background: 'rgba(255,255,255,0.06)',
                borderColor: 'rgba(255,255,255,0.25)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)'
              }}
            >
              <Search className="w-4 h-4 text-white/40 ml-5 shrink-0" />
              <input
                type="text"
                placeholder="Search previously made models..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/30 px-4 py-4 text-sm"
                autoComplete="off"
              />
              {searchInput && (
                <button
                  onClick={() => setSearchInput('')}
                  className="mr-2 w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/50 hover:text-white text-xs transition-all"
                >
                  ✕
                </button>
              )}
              <button
                className="flex items-center gap-2 px-6 py-4 text-sm font-medium text-white shrink-0 transition-opacity hover:opacity-85"
                style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' }}
              >
                Search <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator — hidden once searching */}
        {!hasSearched && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
            <span className="text-white/25 text-xs tracking-widest uppercase">Scroll to browse</span>
            <div className="flex flex-col items-center gap-1">
              <div className="w-px h-8 bg-gradient-to-b from-white/25 to-transparent" />
              <div className="w-1 h-1 rounded-full bg-white/25"
                style={{ animation: 'bounce 1.8s ease-in-out infinite' }} />
            </div>
          </div>
        )}
      </div>

      {/* ── RESULTS ────────────────────────────────────────────────── */}
      {hasSearched && (
        <div className="page-font results-enter max-w-6xl mx-auto px-6 pb-20 pt-10">
          <p className="text-white/35 text-sm mb-6">
            {results.length > 0
              ? `${results.length} result${results.length !== 1 ? 's' : ''} for "${searchInput}"`
              : `No results for "${searchInput}"`}
          </p>

          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {results.map((product) => (
                <div key={product.id}
                  className="result-card bg-white/4 border border-white/8 rounded-2xl overflow-hidden cursor-pointer">
                  <div className={`relative h-44 bg-gradient-to-br ${product.color} overflow-hidden`}>
                    <div className="card-img absolute inset-0 flex items-center justify-center">
                      <Box className="w-12 h-12 text-white/15" strokeWidth={0.8} />
                    </div>
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white/55 border border-white/8">
                      {product.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-white text-sm font-medium mb-1.5">{product.name}</h3>
                    <div className="flex items-center gap-1 mb-3">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-white/60 text-xs">{product.rating}</span>
                      <span className="text-white/25 text-xs">({product.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white font-semibold text-sm">${product.price}</span>
                      <button
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white rounded-full transition-all hover:opacity-85"
                        style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' }}>
                        <ShoppingCart className="w-3 h-3" /> Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center mb-5">
                <Search className="w-7 h-7 text-white/20" />
              </div>
              <p className="text-white/50 font-medium mb-1">Nothing found</p>
              <p className="text-white/25 text-sm">Try a different search term.</p>
            </div>
          )}
        </div>
      )}

      {/* ── DEFAULT STATE ──────────────────────────────────────────── */}
      {!hasSearched && (
        <div className="page-font max-w-6xl mx-auto px-6 py-20 text-center">
          <p className="text-white/20 text-sm">Start typing above to find models</p>
        </div>
      )}

    </div>
  );
}