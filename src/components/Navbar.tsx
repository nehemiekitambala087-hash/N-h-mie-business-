import React, { useState, useEffect, useRef } from 'react';
import { Shield, User, Menu, X, Search, Globe, Smartphone, Newspaper, ExternalLink, Sun, Moon } from 'lucide-react';
import { User as UserType, ServiceItem, ProductItem } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  currentUser: UserType | null;
  onOpenAuth: (mode: 'login' | 'register') => void;
  onLogout: () => void;
  services?: ServiceItem[];
  products?: ProductItem[];
  isDarkMode?: boolean;
  toggleTheme?: () => void;
}

interface Article {
  title: string;
  summary: string;
  date: string;
  source: string;
  url: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  currentUser,
  onOpenAuth,
  onLogout,
  services = [],
  products = [],
  isDarkMode = true,
  toggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'services', label: 'Nos services' },
    { id: 'catalogue', label: 'Catalogue' },
    { id: 'album', label: 'Album' },
    { id: 'actualites', label: 'Actualités' },
    { id: 'realisations', label: 'Réalisations' },
    { id: 'devis', label: 'Demander un devis' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    // Fetch articles for search if query entered
    if (searchQuery.trim().length > 1 && articles.length === 0) {
      fetch('/api/news')
        .then(res => res.json())
        .then(data => {
          if (data && data.articles) setArticles(data.articles);
        })
        .catch(err => console.error(err));
    }
  }, [searchQuery, articles.length]);

  // Click outside to close search dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
    setIsSearchOpen(false);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredServices = searchQuery.trim() ? services.filter(s =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  const filteredProducts = searchQuery.trim() ? products.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  const filteredArticles = searchQuery.trim() ? articles.filter(a =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.summary.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  const totalResults = filteredServices.length + filteredProducts.length + filteredArticles.length;

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-amber-500/30 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('accueil')}
          className="flex items-center space-x-3 text-left group focus:outline-none shrink-0"
        >
          <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform border border-amber-500/50">
            <img src="/assets/logo.jpg" alt="GM Tech Logo" className="w-full h-full object-cover" />
          </div>
          <div className="hidden sm:block">
            <h1 className="font-extrabold text-lg tracking-wide text-white flex items-center gap-1.5">
              NÉHÉMIE <span className="text-amber-500">BUSINESS</span>
            </h1>
            <p className="text-xs text-slate-400 font-medium">Vos idées, nos solutions !</p>
          </div>
        </button>

        {/* Global Search Bar */}
        <div className="relative flex-1 max-w-md hidden md:block" ref={searchRef}>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="Rechercher un service, produit, actualité..."
              className="w-full bg-slate-900/90 border border-slate-700 hover:border-amber-500/50 focus:border-amber-500 rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-100 placeholder-slate-400 focus:outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(''); setIsSearchOpen(false); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                aria-label="Effacer la recherche"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Search Dropdown Results */}
          {isSearchOpen && searchQuery.trim().length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-slate-950 border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-[420px] overflow-y-auto animate-fadeIn">
              <div className="p-3 bg-slate-900 border-b border-slate-800 text-xs font-bold text-slate-400 flex items-center justify-between">
                <span>RÉSULTATS DE RECHERCHE ({totalResults})</span>
                <span className="text-amber-400">"{searchQuery}"</span>
              </div>

              {totalResults === 0 ? (
                <div className="p-6 text-center text-slate-400 text-sm">
                  Aucun résultat trouvé pour "{searchQuery}". Essayez un autre mot-clé (ex: site, android, logo, solaire).
                </div>
              ) : (
                <div className="divide-y divide-slate-900">
                  {/* Services */}
                  {filteredServices.length > 0 && (
                    <div className="p-3">
                      <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5" /> Services ({filteredServices.length})
                      </div>
                      <div className="space-y-1.5">
                        {filteredServices.map(service => (
                          <button
                            key={service.id}
                            onClick={() => handleNavClick('services')}
                            className="w-full text-left p-2.5 rounded-xl hover:bg-slate-900 transition-all group flex items-center justify-between"
                          >
                            <div>
                              <div className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">{service.title}</div>
                              <div className="text-xs text-slate-400 line-clamp-1">{service.description}</div>
                            </div>
                            <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-1 rounded-md border border-amber-500/20 shrink-0 ml-2">Service</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Products */}
                  {filteredProducts.length > 0 && (
                    <div className="p-3">
                      <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Smartphone className="w-3.5 h-3.5" /> Catalogue / Produits ({filteredProducts.length})
                      </div>
                      <div className="space-y-1.5">
                        {filteredProducts.map(prod => (
                          <button
                            key={prod.id}
                            onClick={() => handleNavClick('catalogue')}
                            className="w-full text-left p-2.5 rounded-xl hover:bg-slate-900 transition-all group flex items-center justify-between"
                          >
                            <div>
                              <div className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">{prod.title}</div>
                              <div className="text-xs text-slate-400 line-clamp-1">{prod.description}</div>
                            </div>
                            <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-1 rounded-md border border-amber-500/20 shrink-0 ml-2">{prod.price}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Articles */}
                  {filteredArticles.length > 0 && (
                    <div className="p-3">
                      <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Newspaper className="w-3.5 h-3.5" /> Actualités ({filteredArticles.length})
                      </div>
                      <div className="space-y-1.5">
                        {filteredArticles.map((art, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleNavClick('actualites')}
                            className="w-full text-left p-2.5 rounded-xl hover:bg-slate-900 transition-all group flex items-center justify-between"
                          >
                            <div>
                              <div className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">{art.title}</div>
                              <div className="text-xs text-slate-400 line-clamp-1">{art.summary}</div>
                            </div>
                            <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-1 rounded-md border border-amber-500/20 shrink-0 ml-2">Actu</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center space-x-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                currentTab === item.id
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-500/30 border border-amber-400/40'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Actions & Portal Links */}
        <div className="hidden lg:flex items-center space-x-3">
          {toggleTheme && (
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-900 border border-amber-500/30 text-amber-400 hover:bg-slate-800 transition-all shadow-md"
              title={isDarkMode ? "Passer au mode clair" : "Passer au mode sombre"}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 text-amber-600" />}
            </button>
          )}

          {currentUser ? (
            <div className="flex items-center space-x-3">
              {currentUser.role === 'admin' && (
                <button
                  onClick={() => setCurrentTab('admin')}
                  className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentTab === 'admin'
                      ? 'bg-amber-600 text-white font-bold shadow-md shadow-amber-500/30'
                      : 'bg-slate-900 text-amber-400 hover:bg-slate-800 border border-amber-500/30'
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  <span>Admin</span>
                </button>
              )}
              <button
                onClick={() => setCurrentTab('client-portal')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentTab === 'client-portal'
                    ? 'bg-amber-600 text-white font-bold shadow-md shadow-amber-500/30'
                    : 'bg-slate-900 text-slate-200 hover:bg-slate-800 border border-slate-700'
                }`}
              >
                <User className="w-4 h-4 text-amber-400" />
                <span>Espace client</span>
              </button>
              <button
                onClick={onLogout}
                className="text-xs text-slate-400 hover:text-red-400 px-2 py-1 transition-colors"
                title="Se déconnecter"
              >
                Sortie
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onOpenAuth('login')}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                Connexion
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-amber-600 text-white hover:bg-amber-500 shadow-lg shadow-amber-500/25 transition-all"
              >
                Créer un compte
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-lg bg-slate-900 text-amber-400 hover:bg-slate-800 border border-amber-500/30 focus:outline-none"
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile search input */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            placeholder="Rechercher services, produits, actualités..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-100 placeholder-slate-400 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => { setSearchQuery(''); setIsSearchOpen(false); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Mobile search dropdown */}
        {isSearchOpen && searchQuery.trim().length > 0 && (
          <div className="mt-2 bg-slate-950 border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden max-h-80 overflow-y-auto">
            {totalResults === 0 ? (
              <div className="p-4 text-center text-slate-400 text-xs">Aucun résultat trouvé pour "{searchQuery}".</div>
            ) : (
              <div className="p-2 space-y-2">
                {filteredServices.map(s => (
                  <button
                    key={s.id}
                    onClick={() => handleNavClick('services')}
                    className="w-full text-left p-2 rounded-xl bg-slate-900 hover:bg-slate-850 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-white">{s.title}</div>
                      <div className="text-[10px] text-slate-400">Service</div>
                    </div>
                  </button>
                ))}
                {filteredProducts.map(p => (
                  <button
                    key={p.id}
                    onClick={() => handleNavClick('catalogue')}
                    className="w-full text-left p-2 rounded-xl bg-slate-900 hover:bg-slate-850 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-white">{p.title}</div>
                      <div className="text-[10px] text-amber-400">Catalogue ({p.price})</div>
                    </div>
                  </button>
                ))}
                {filteredArticles.map((a, i) => (
                  <button
                    key={i}
                    onClick={() => handleNavClick('actualites')}
                    className="w-full text-left p-2 rounded-xl bg-slate-900 hover:bg-slate-850 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-white">{a.title}</div>
                      <div className="text-[10px] text-amber-400">Actualité</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-black border-b border-amber-500/30 px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                currentTab === item.id
                  ? 'bg-amber-600 text-white border border-amber-500/40'
                  : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className="pt-4 border-t border-slate-800 flex flex-col space-y-2">
            {toggleTheme && (
              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-semibold bg-slate-900 text-amber-400 border border-amber-500/30 mb-2"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                <span>{isDarkMode ? "Passer au mode clair" : "Passer au mode sombre"}</span>
              </button>
            )}

            {currentUser ? (
              <>
                {currentUser.role === 'admin' && (
                  <button
                    onClick={() => handleNavClick('admin')}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-semibold bg-amber-600 text-white shadow-md shadow-amber-500/25"
                  >
                    <Shield className="w-5 h-5" />
                    <span>Tableau de bord Admin</span>
                  </button>
                )}
                <button
                  onClick={() => handleNavClick('client-portal')}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-semibold bg-slate-900 text-amber-400 border border-amber-500/30"
                >
                  <User className="w-5 h-5" />
                  <span>Mon Espace Client</span>
                </button>
                <button
                  onClick={onLogout}
                  className="w-full py-2 text-center text-sm text-red-400 hover:bg-red-500/10 rounded-lg"
                >
                  Se déconnecter
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { onOpenAuth('login'); setMobileMenuOpen(false); }}
                  className="w-full py-3 rounded-lg font-medium bg-slate-900 text-amber-400 border border-amber-500/30 text-center"
                >
                  Connexion
                </button>
                <button
                  onClick={() => { onOpenAuth('register'); setMobileMenuOpen(false); }}
                  className="w-full py-3 rounded-lg font-semibold bg-amber-600 text-white text-center shadow-lg shadow-amber-500/25"
                >
                  S'inscrire
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
