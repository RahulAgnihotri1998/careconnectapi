import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithCredential, signOut, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get, query, orderByChild, limitToLast, equalTo, child } from "firebase/database";
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const firebaseConfig = {
  apiKey: "AIzaSyDS6YAlyuhqNTBSI8sc8WGtDstfMRpvJwM",
  authDomain: "restate-e3f87.firebaseapp.com",
  databaseURL: "https://restate-e3f87-default-rtdb.firebaseio.com",
  projectId: "restate-e3f87",
  storageBucket: "restate-e3f87.firebasestorage.app",
  messagingSenderId: "665770718753",
  appId: "1:665770718753:web:402cadc010bf3777cad560",
  measurementId: "G-L7W73QREND"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);

export async function login() {
  try {
    // For demo purposes, create a mock user
    mockUser = {
      $id: 'demo-user-123',
      name: 'Demo User',
      email: 'demo@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=0061FF&color=fff',
    };
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function logout() {
  try {
    mockUser = null;
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

let mockUser: any = null;

export async function getCurrentUser(): Promise<any> {
  // For demo purposes, return mock user if logged in
  return mockUser;
}

export async function getLatestProperties() {
  // Mock data for demo
  return [
    {
      $id: '1',
      $collectionId: 'properties',
      $databaseId: 'main',
      $createdAt: new Date().toISOString(),
      $updatedAt: new Date().toISOString(),
      $permissions: [],
      name: 'Modern Villa',
      type: 'Villa',
      price: 2500,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=60&w=640&auto=format&fit=crop',
      address: '123 Main St, City',
      bedrooms: 3,
      bathrooms: 2,
      area: 1200
    },
    {
      $id: '2',
      $collectionId: 'properties',
      $databaseId: 'main',
      $createdAt: new Date().toISOString(),
      $updatedAt: new Date().toISOString(),
      $permissions: [],
      name: 'Cozy Apartment',
      type: 'Apartments',
      price: 1800,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1605146768851-eda79da39897?q=60&w=640&auto=format&fit=crop',
      address: '456 Oak Ave, Downtown',
      bedrooms: 2,
      bathrooms: 1,
      area: 800
    }
  ];
}

export async function getProperties({
  filter,
  query,
  limit,
}: {
  filter: string;
  query: string;
  limit?: number;
}) {
  // Mock data for demo
  let properties = [
    {
      $id: '1',
      $collectionId: 'properties',
      $databaseId: 'main',
      $createdAt: new Date().toISOString(),
      $updatedAt: new Date().toISOString(),
      $permissions: [],
      name: 'Modern Villa',
      type: 'Villa',
      price: 2500,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=60&w=640&auto=format&fit=crop',
      address: '123 Main St, City',
      bedrooms: 3,
      bathrooms: 2,
      area: 1200
    },
    {
      $id: '2',
      $collectionId: 'properties',
      $databaseId: 'main',
      $createdAt: new Date().toISOString(),
      $updatedAt: new Date().toISOString(),
      $permissions: [],
      name: 'Cozy Apartment', 
      type: 'Apartments',
      price: 1800,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1605146768851-eda79da39897?q=60&w=640&auto=format&fit=crop',
      address: '456 Oak Ave, Downtown',
      bedrooms: 2,
      bathrooms: 1,
      area: 800
    },
    {
      $id: '3',
      $collectionId: 'properties',
      $databaseId: 'main',
      $createdAt: new Date().toISOString(),
      $updatedAt: new Date().toISOString(),
      $permissions: [],
      name: 'Luxury House',
      type: 'House',
      price: 3200,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=60&w=640&auto=format&fit=crop',
      address: '789 Pine Rd, Suburbs',
      bedrooms: 4,
      bathrooms: 3,
      area: 1800
    }
  ];
  
  // Filter by type
  if (filter && filter !== "All") {
    properties = properties.filter(prop => prop.type === filter);
  }
  
  // Filter by search query
  if (query) {
    const searchTerm = query.toLowerCase();
    properties = properties.filter(prop => 
      prop.name?.toLowerCase().includes(searchTerm) ||
      prop.address?.toLowerCase().includes(searchTerm) ||
      prop.type?.toLowerCase().includes(searchTerm)
    );
  }
  
  // Apply limit
  if (limit) {
    properties = properties.slice(0, limit);
  }
  
  return properties;
}

export async function getPropertyById({ id }: { id: string }) {
  // Mock data for demo
  const properties: any = {
    '1': {
      $id: '1',
      $collectionId: 'properties',
      $databaseId: 'main',
      $createdAt: new Date().toISOString(),
      $updatedAt: new Date().toISOString(),
      $permissions: [],
      name: 'Modern Villa',
      type: 'Villa',
      price: 2500,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=60&w=640&auto=format&fit=crop',
      address: '123 Main St, City',
      bedrooms: 3,
      bathrooms: 2,
      area: 1200,
      description: 'Beautiful modern villa with stunning views.',
      facilities: ['Gym', 'Swimming pool', 'Wifi'],
      agent: {
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=0061FF&color=fff'
      },
      reviews: [{
        name: 'Jane Smith',
        avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=0061FF&color=fff',
        review: 'Great property!',
        rating: 5
      }],
      gallery: [{
        $id: 'g1',
        image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=60&w=640&auto=format&fit=crop'
      }]
    }
  };
  
  return properties[id] || null;
}
