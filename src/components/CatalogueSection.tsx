import React, { useState } from 'react';
import { ProductItem } from '../types';
import { Search, Tag, ArrowRight, Check, X, Sparkles, Eye } from 'lucide-react';

interface CatalogueSectionProps {
  products: ProductItem[];
  setCurrentTab: (tab: string) => void;
  onSelectProduct: (productTitle: string) => void;
}

export const CatalogueSection: React.FC<CatalogueSectionProps> = ({
  products,
  setCurrentTab,
  onSelectProduct
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [activeProductModal, setActiveProductModal] = useState<ProductItem | null>(null);

  const categories = ['Tous', 'Sites web', 'Applications', 'Design graphique', 'Marketing', 'Logiciel', 'Conseil'];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'Tous' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
          BOUTIQUE TECHNIQUE & PRODUITS
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Catalogue des Solutions Prêtes à l'Emploi
        </h2>
        <p className="text-slate-300 text-base">
          Trouvez la solution digitale idéale pour booster votre activité. Prix transparents ou sur devis.
        </p>
      </div>

      {/* Search & Categories Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher un produit ou service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-11 pr-4 py-2.5 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-500/30'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-slate-950 border border-slate-800 hover:border-amber-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-black/90 text-amber-400 border border-amber-500/30 backdrop-blur-sm">
                  {product.price}
                </div>
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-slate-900/80 text-white backdrop-blur-sm">
                  {product.category}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                  {product.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
                  {product.description}
                </p>

                <ul className="space-y-1.5 pt-2">
                  {product.features.slice(0, 3).map((feat, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-6 pt-0 grid grid-cols-2 gap-3">
              <button
                onClick={() => setActiveProductModal(product)}
                className="w-full py-2.5 rounded-xl text-xs font-semibold bg-slate-900 text-slate-200 hover:bg-slate-800 border border-slate-800 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Eye className="w-4 h-4 text-amber-400" />
                <span>Détails</span>
              </button>
              <button
                onClick={() => {
                  onSelectProduct(product.title);
                  setCurrentTab('devis');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-amber-600 text-white hover:bg-amber-500 shadow-md shadow-amber-500/30 flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Commander</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-2xl">
          <p className="text-slate-400 text-lg">Aucun produit ou service trouvé pour cette recherche.</p>
        </div>
      )}

      {/* Product Detail Modal */}
      {activeProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-950 border border-amber-500/40 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative">
            <button
              onClick={() => setActiveProductModal(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-64 bg-slate-900">
              <img
                src={activeProductModal.image}
                alt={activeProductModal.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-6">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-600 text-white mb-2 inline-block">
                  {activeProductModal.category}
                </span>
                <h3 className="text-2xl font-bold text-white">{activeProductModal.title}</h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <div className="text-lg font-bold text-amber-400 mb-2">Prix : {activeProductModal.price}</div>
                <p className="text-slate-300 text-sm leading-relaxed">{activeProductModal.description}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-3">Ce qui est inclus :</h4>
                <ul className="space-y-2">
                  {activeProductModal.features.map((feat, idx) => (
                    <li key={idx} className="text-sm text-slate-200 flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-end space-x-4 pt-4 border-t border-slate-800">
                <button
                  onClick={() => setActiveProductModal(null)}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-900 transition-colors"
                >
                  Fermer
                </button>
                <button
                  onClick={() => {
                    const title = activeProductModal.title;
                    setActiveProductModal(null);
                    onSelectProduct(title);
                    setCurrentTab('devis');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold bg-amber-600 text-white hover:bg-amber-500 shadow-md shadow-amber-500/30 flex items-center gap-2"
                >
                  <span>Demander un devis pour ce produit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
