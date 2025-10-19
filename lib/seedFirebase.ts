// scripts/seedFirebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDS6YAlyuhqNTBSI8sc8WGtDstfMRpvJwM",
  authDomain: "restate-e3f87.firebaseapp.com",
  databaseURL: "https://restate-e3f87-default-rtdb.firebaseio.com",
  projectId: "restate-e3f87",
  storageBucket: "restate-e3f87.firebasestorage.app",
  messagingSenderId: "665770718753",
  appId: "1:665770718753:web:402cadc010bf3777cad560",
  measurementId: "G-L7W73QREND",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ Sample Data
const agents = [
  {
    name: "Rahul Agnihotri",
    email: "rahul@example.com",
    avatar: "https://example.com/avatar.jpg",
  },
  {
    name: "Priya Sharma",
    email: "priya@example.com",
    avatar: "https://example.com/priya.jpg",
  },
];

const properties = [
  {
    name: "Sunset Villa",
    type: "Villa",
    description: "A luxury villa with modern interiors and a sea view.",
    address: "Goa, India",
    price: 12000000,
    area: 3200,
    bedrooms: 4,
    bathrooms: 3,
    rating: 4.7,
    facilities: ["Wifi", "Swimming pool", "Car Parking", "Laundry"],
    image: "https://example.com/villa.jpg",
    geolocation: "15.2993,74.1240",
    createdAt: new Date(),
  },
  {
    name: "Skyline Apartment",
    type: "Apartment",
    description: "Beautiful 2BHK apartment in Mumbai city center.",
    address: "Mumbai, India",
    price: 9000000,
    area: 1500,
    bedrooms: 2,
    bathrooms: 2,
    rating: 4.3,
    facilities: ["Wifi", "Gym", "Car Parking"],
    image: "https://example.com/apartment.jpg",
    geolocation: "19.0760,72.8777",
    createdAt: new Date(),
  },
];

const galleries = [
  { image: "https://example.com/gallery1.jpg" },
  { image: "https://example.com/gallery2.jpg" },
];

const reviews = [
  {
    name: "Ravi Verma",
    avatar: "https://example.com/ravi.jpg",
    review: "Beautiful property and great agent service!",
    rating: 5,
  },
  {
    name: "Aisha Khan",
    avatar: "https://example.com/aisha.jpg",
    review: "Very clean and well-maintained. Recommended!",
    rating: 4.5,
  },
];

// ✅ Seeding function
async function seedFirebase() {
  try {
    console.log("🌱 Starting Firebase seeding...");

    // Agents
    for (const agent of agents) {
      await addDoc(collection(db, "agents"), agent);
      console.log(`✅ Agent added: ${agent.name}`);
    }

    // Properties
    for (const property of properties) {
      await addDoc(collection(db, "properties"), property);
      console.log(`✅ Property added: ${property.name}`);
    }

    // Galleries
    for (const gallery of galleries) {
      await addDoc(collection(db, "galleries"), gallery);
      console.log(`✅ Gallery image added`);
    }

    // Reviews
    for (const review of reviews) {
      await addDoc(collection(db, "reviews"), review);
      console.log(`✅ Review added by ${review.name}`);
    }

    console.log("🎉 Seeding complete!");
  } catch (error) {
    console.error("❌ Error seeding Firebase:", error);
  }
}

seedFirebase();
