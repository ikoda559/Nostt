import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Layers, Printer, Home, Menu, X } from 'lucide-react';

export function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { to: '/', label: 'Home', Icon: Home },
    { to: '/categories', label: 'Categories', Icon: Layers },
    { to: '/custom', label: 'Custom Print', Icon: Printer },
  ];

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/10"
        style={{ background: 'rgba(10, 10, 20, 0.55)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
          .navbar-font { font-family: 'Outfit', sans-serif; }
          .nav-link-active::after {
            content: '';
            position: absolute;
            bottom: -6px;
            left: 0; right: 0;
            height: 2px;
            background: linear-gradient(90deg, #60a5fa, #a78bfa);
            border-radius: 2px;
          }
          .cart-btn:hover .cart-icon {
            transform: rotate(-12deg) scale(1.1);
            transition: transform 0.2s ease;
          }
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-8px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .mobile-menu { animation: slideDown 0.2s ease-out forwards; }
        `}</style>

        <div className="navbar-font max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-3 items-center h-16">

            {/* LEFT — Logo (desktop) / Hamburger (mobile) */}
            <div className="flex items-center">
              {/* Logo — desktop only */}
              <Link to="/" className="hidden md:flex items-center">
                <img src="/nostt.svg" alt="Logo" className="h-14 w-auto object-contain" />
              </Link>

              {/* Hamburger — mobile only */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-white/8 border border-white/12 hover:bg-white/15 transition-colors text-white/70 hover:text-white"
              >
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>

            {/* CENTER — Nav links (desktop) / Logo (mobile) */}
            <div className="flex items-center justify-center">
              {/* Nav links — desktop only */}
              <div className="hidden md:flex items-center gap-1">
                {navLinks.map(({ to, label, Icon }) => (
                  <Link
                    key={to}
                    to={to}
                    className={`relative flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-colors
                      ${isActive(to)
                        ? 'text-white nav-link-active'
                        : 'text-white/55 hover:text-white hover:bg-white/8'
                      }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </Link>
                ))}
              </div>

              {/* Logo — mobile only, centered */}
              <Link to="/" className="md:hidden flex items-center">
                <img src="/nostt.svg" alt="Logo" className="h-14 w-auto object-contain" />
              </Link>
            </div>

            {/* RIGHT — Cart + Sign In (always) */}
            <div className="flex items-center justify-end gap-2">
              {/* Cart */}
              <Link
                to="/cart"
                className="cart-btn relative flex items-center justify-center w-9 h-9 rounded-full bg-white/8 border border-white/12 hover:bg-white/15 transition-colors"
              >
                <ShoppingCart className="cart-icon w-4 h-4 text-white/80" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full text-[10px] text-white font-semibold flex items-center justify-center">
                  0
                </span>
              </Link>

              {/* Sign In */}
              <Link
                to="/login"
                className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium text-white/60 hover:text-white transition-colors"
              >
                Sign in
              </Link>
            </div>

          </div>
        </div>

        {/* Mobile dropdown — nav links only */}
        {mobileOpen && (
          <div
            className="mobile-menu md:hidden border-t border-white/10 px-5 py-4 flex flex-col gap-1"
            style={{ background: 'rgba(10, 10, 20, 0.95)', backdropFilter: 'blur(20px)' }}
          >
            {navLinks.map(({ to, label, Icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors
                  ${isActive(to)
                    ? 'text-white bg-white/10'
                    : 'text-white/55 hover:text-white hover:bg-white/8'
                  }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}