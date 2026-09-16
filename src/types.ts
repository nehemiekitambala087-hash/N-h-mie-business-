export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  popular?: boolean;
}

export interface ProductItem {
  id: string;
  title: string;
  category: string;
  description: string;
  price: string;
  image: string;
  features: string[];
  popular?: boolean;
}

export interface QuoteRequest {
  id: string;
  trackingNumber: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  item?: string;
  description: string;
  budget: string;
  attachment?: string;
  status: 'En attente' | 'En cours' | 'Terminée' | 'Annulée';
  createdAt: string;
  clientId?: string;
}

export interface Project {
  id: string;
  title: string;
  clientName: string;
  service: string;
  progress: number;
  status: 'Planification' | 'En cours' | 'Révision' | 'Terminé';
  deadline: string;
  notes: string;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: 'Actif' | 'Inactif' | 'VIP';
  createdAt: string;
  company?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'client';
  token: string;
}

export interface MediaItem {
  id: string;
  title: string;
  type: 'photo' | 'video';
  url: string;
  category: string;
  description: string;
  date: string;
}
