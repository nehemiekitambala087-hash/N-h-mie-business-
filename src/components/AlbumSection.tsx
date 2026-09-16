import React, { useState, useEffect } from 'react';
import { MediaItem, User as UserType } from '../types';
import { Image, Video, Plus, X, Sparkles, Filter, Trash2, Play } from 'lucide-react';

interface AlbumSectionProps {
  currentUser: UserType | null;
}

export const AlbumSection: React.FC<AlbumSectionProps> = ({ currentUser }) => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [filterType, setFilterType] = useState<'all' | 'photo' | 'video'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'photo' | 'video'>('photo');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('Équipe');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = () => {
    fetch('/api/media')
      .then(res => res.json())
      .then(data => setMedia(data))
      .catch(err => console.error(err));
  };

  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) return;
    setSubmitting(true);

    try {
      const res = await fetch('/api/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, type, url, category, description })
      });
      if (res.ok) {
        setTitle('');
        setUrl('');
        setDescription('');
        setSuccessMsg('Média ajouté avec succès !');
        fetchMedia();
        setTimeout(() => {
          setSuccessMsg('');
          setIsAddModalOpen(false);
        }, 1500);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Voulez-vous vraiment supprimer ce média ?')) return;
    try {
      await fetch(`/api/media/${id}`, { method: 'DELETE' });
      fetchMedia();
    } catch (err) {
      console.error(err);
    }
  };

  const categories = ['Tous', ...Array.from(new Set(media.map(m => m.category)))];

  const filteredMedia = media.filter(m => {
    const matchType = filterType === 'all' || m.type === filterType;
    const matchCat = selectedCategory === 'Tous' || m.category === selectedCategory;
    return matchType && matchCat;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-8">
        <div className="space-y-3">
          <span className="px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            MÉDIATHÈQUE & ALBUM
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Photos & Vidéos de nos Réalisations
          </h2>
          <p className="text-slate-300 text-sm max-w-2xl">
            Explorez notre galerie multimédia illustrant nos projets de développement web, applications Android, design graphique et interventions sur le terrain à Kinshasa.
          </p>
        </div>

        {currentUser && currentUser.role === 'admin' && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center space-x-2 bg-amber-500 hover:bg-amber-400 text-[#0A192F] font-bold px-6 py-3 rounded-2xl transition-all shadow-lg hover:scale-105 shrink-0"
          >
            <Plus className="w-5 h-5" />
            <span>Ajouter photo / vidéo</span>
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <button
            onClick={() => setFilterType('all')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterType === 'all' ? 'bg-amber-500 text-[#0A192F]' : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            Tous ({media.length})
          </button>
          <button
            onClick={() => setFilterType('photo')}
            className={`flex-1 sm:flex-none flex items-center justify-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterType === 'photo' ? 'bg-amber-500 text-[#0A192F]' : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Image className="w-3.5 h-3.5" />
            <span>Photos ({media.filter(m => m.type === 'photo').length})</span>
          </button>
          <button
            onClick={() => setFilterType('video')}
            className={`flex-1 sm:flex-none flex items-center justify-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterType === 'video' ? 'bg-amber-500 text-[#0A192F]' : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Vidéos ({media.filter(m => m.type === 'video').length})</span>
          </button>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-4 h-4 text-amber-400 shrink-0" />
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredMedia.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800 space-y-3">
          <Sparkles className="w-10 h-10 text-amber-400 mx-auto animate-pulse" />
          <h3 className="text-lg font-bold text-white">Aucun média trouvé</h3>
          <p className="text-xs text-slate-400">Aucun élément ne correspond à votre filtre actuel.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedia.map((m) => (
            <div
              key={m.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl group hover:border-amber-500/40 transition-all flex flex-col"
            >
              <div
                className="relative h-60 bg-slate-950 overflow-hidden cursor-pointer"
                onClick={() => setActiveMedia(m)}
              >
                {m.type === 'photo' ? (
                  <img
                    src={m.url}
                    alt={m.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="relative w-full h-full flex items-center justify-center bg-slate-950">
                    <video src={m.url} className="w-full h-full object-cover opacity-80" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all">
                      <div className="w-14 h-14 rounded-full bg-amber-500 text-[#0A192F] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>
                )}
                <div className="absolute top-3 left-3 flex items-center space-x-2">
                  <span className="bg-[#0A192F]/90 text-amber-400 border border-amber-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
                    {m.category}
                  </span>
                  <span className="bg-slate-900/90 text-slate-300 text-[10px] font-medium px-2.5 py-1 rounded-full backdrop-blur-md flex items-center space-x-1">
                    {m.type === 'photo' ? <Image className="w-3 h-3 text-amber-400" /> : <Video className="w-3 h-3 text-amber-400" />}
                    <span className="capitalize">{m.type}</span>
                  </span>
                </div>

                {currentUser && currentUser.role === 'admin' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(m.id);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-rose-500/90 text-white hover:bg-rose-600 shadow-md transition-all"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <h3 className="font-bold text-white text-base group-hover:text-amber-400 transition-colors">
                    {m.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {m.description}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-[11px] text-slate-500">
                  <span>Ajouté le {m.date}</span>
                  <button
                    onClick={() => setActiveMedia(m)}
                    className="text-amber-400 font-bold hover:underline flex items-center space-x-1"
                  >
                    <span>Voir le média</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Media Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Ajouter un média à l'album</h3>
                <p className="text-xs text-slate-400">Partagez une photo ou une vidéo de réalisation</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {successMsg ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-2xl text-center font-medium text-sm">
                {successMsg}
              </div>
            ) : (
              <form onSubmit={handleAddMedia} className="space-y-4">
                <label className="block text-xs font-bold text-slate-300">
                  Titre du média
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Ex. Installation solaire villa Kalamu"
                    className="mt-1.5 w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </label>

                <div className="grid grid-cols-2 gap-4">
                  <label className="block text-xs font-bold text-slate-300">
                    Type de média
                    <select
                      value={type}
                      onChange={e => setType(e.target.value as 'photo' | 'video')}
                      className="mt-1.5 w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-amber-500"
                    >
                      <option value="photo">Photo</option>
                      <option value="video">Vidéo</option>
                    </select>
                  </label>

                  <label className="block text-xs font-bold text-slate-300">
                    Catégorie
                    <input
                      type="text"
                      required
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                      placeholder="Ex. Solaire, Mobile, Web..."
                      className="mt-1.5 w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </label>
                </div>

                <label className="block text-xs font-bold text-slate-300">
                  URL de l'image ou de la vidéo (Lien Web / Unsplash / MP4)
                  <input
                    type="url"
                    required
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="mt-1.5 w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </label>

                <label className="block text-xs font-bold text-slate-300">
                  Description détaillée
                  <textarea
                    rows={3}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Décrivez ce projet ou cette réalisation..."
                    className="mt-1.5 w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none"
                  />
                </label>

                <div className="pt-2 flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-bold"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 rounded-xl bg-amber-500 text-[#0A192F] hover:bg-amber-400 text-xs font-bold transition-all shadow-lg"
                  >
                    {submitting ? 'Enregistrement...' : 'Enregistrer'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Media Detail Modal */}
      {activeMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-4 bg-[#0A192F] border-b border-slate-800 flex items-center justify-between text-white">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-1 rounded-full bg-amber-500 text-[#0A192F] text-[10px] font-bold uppercase">
                  {activeMedia.category}
                </span>
                <h3 className="font-bold text-sm">{activeMedia.title}</h3>
              </div>
              <button
                onClick={() => setActiveMedia(null)}
                className="p-1.5 rounded-full bg-slate-800 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 bg-black flex items-center justify-center overflow-hidden p-2">
              {activeMedia.type === 'photo' ? (
                <img
                  src={activeMedia.url}
                  alt={activeMedia.title}
                  className="max-h-[60vh] max-w-full object-contain rounded-xl"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <video
                  src={activeMedia.url}
                  controls
                  autoPlay
                  className="max-h-[60vh] max-w-full object-contain rounded-xl"
                />
              )}
            </div>

            <div className="p-6 bg-slate-900 border-t border-slate-800 space-y-2">
              <p className="text-sm text-slate-200">{activeMedia.description}</p>
              <div className="text-xs text-slate-500">Ajouté le {activeMedia.date}</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
