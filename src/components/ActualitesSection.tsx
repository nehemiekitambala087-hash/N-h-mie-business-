import React, { useState, useEffect } from 'react';
import { Newspaper, ExternalLink, Calendar, Sparkles, RefreshCw, Globe, Share2, ArrowRight } from 'lucide-react';

interface Article {
  title: string;
  summary: string;
  date: string;
  source: string;
  url: string;
}

export const ActualitesSection: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('/api/news');
      const data = await res.json();
      if (data && data.articles) {
        setArticles(data.articles);
      } else {
        setArticles([]);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-8">
        <div className="space-y-3 max-w-2xl">
          <span className="px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Google Search Grounding
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Actualités & Tendances Numériques
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Restez informés des dernières innovations technologiques, du développement logiciel et de la transformation digitale à Kinshasa, en RDC et dans le monde.
          </p>
        </div>

        <button
          onClick={fetchNews}
          disabled={loading}
          className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold border border-slate-800 transition-all shadow-md flex items-center gap-2 self-start md:self-auto"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Actualiser les flux</span>
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-slate-950 border border-slate-800 rounded-3xl p-8 space-y-4 animate-pulse">
              <div className="h-4 bg-slate-900 rounded w-1/3"></div>
              <div className="h-6 bg-slate-900 rounded w-4/5"></div>
              <div className="space-y-2 pt-2">
                <div className="h-3 bg-slate-900 rounded w-full"></div>
                <div className="h-3 bg-slate-900 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-16 space-y-4 bg-slate-950 border border-slate-800 rounded-3xl p-8">
          <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto">
            <Newspaper className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">Impossible de charger les actualités</h3>
          <p className="text-slate-400 text-sm">Vérifiez votre connexion internet ou réessayez ultérieurement.</p>
          <button
            onClick={fetchNews}
            className="px-6 py-3 rounded-xl bg-amber-600 text-white font-bold hover:bg-amber-500 transition-all shadow-md"
          >
            Réessayer
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((art, idx) => (
            <div
              key={idx}
              className="bg-slate-950 border border-slate-800 hover:border-amber-500/40 rounded-3xl p-8 shadow-xl flex flex-col justify-between transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/20">
                    {art.source}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>{art.date}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                  {art.title}
                </h3>

                <p className="text-slate-300 text-sm leading-relaxed">
                  {art.summary}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
                <a
                  href={art.url && art.url !== '#' ? art.url : 'https://google.com/search?q=' + encodeURIComponent(art.title)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <span>Lire l'article complet</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5" /> Verified Search
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Newsletter Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-amber-950 to-slate-950 border border-amber-500/30 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">RESTONS CONNECTÉS</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Ne manquez aucune opportunité digitale</h3>
          <p className="text-slate-300 text-sm">
            Contactez notre équipe dès aujourd'hui pour transformer vos projets technologiques en succès à Kinshasa.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://wa.me/243978885682?text=Bonjour%20GM Tech%20Business,%20je%20souhaite%20discuter%20d'un%20projet%20numérique."
            target="_blank"
            rel="noreferrer"
            className="px-8 py-4 rounded-xl font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-lg flex items-center gap-2 text-sm"
          >
            <span>Discuter sur WhatsApp (+243 97 888 5682)</span>
          </a>
        </div>
      </div>
    </div>
  );
};
