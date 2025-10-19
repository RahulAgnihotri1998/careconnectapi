// lib/firebaseSeed.ts
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push } from "firebase/database";

// 1️⃣ Firebase config
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

// 2️⃣ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 3️⃣ Sample data (from your data.ts)
const agentImages = [
  "https://images.unsplash.com/photo-1691335053879-02096d6ee2ca?q=60&w=640&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544723495-432537d12f6c?q=60&w=640&auto=format&fit=crop",
];

const galleryImages = [
  "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=60&w=640&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1638799869566-b17fa794c4de?q=60&w=640&auto=format&fit=crop",
];

const reviewImages = [
  "https://images.unsplash.com/photo-1517331671191-ddc2c6d3ebd1?q=60&w=640&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1474176857210-7287d38d27c6?q=60&w=640&auto=format&fit=crop",
];

const propertiesImages = [
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=60&w=640&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1605146768851-eda79da39897?q=60&w=640&auto=format&fit=crop",
];

const propertyTypes = [
  "House",
  "Townhomes",
  "Condos",
  "Duplexes",
  "Studios",
  "Villa",
  "Apartments",
  "Others",
];
const facilities = [
  "Laundry",
  "Car Parking",
  "Sports Center",
  "Cutlery",
  "Gym",
  "Swimming pool",
  "Wifi",
  "Pet Center",
];

function getRandomSubset<T>(array: T[], min: number, max: number): T[] {
  const subsetSize = Math.floor(Math.random() * (max - min + 1)) + min;
  return array.sort(() => 0.5 - Math.random()).slice(0, subsetSize);
}

// 4️⃣ Seed function
async function seed() {
  try {
    // Agents
    const agentsRef = ref(db, "agents");
    const agents: any[] = [];
    for (let i = 1; i <= 5; i++) {
      const newAgentRef = push(agentsRef);
      const agentData = {
        name: `Agent ${i}`,
        email: `agent${i}@example.com`,
        avatar: agentImages[Math.floor(Math.random() * agentImages.length)],
      };
      await set(newAgentRef, agentData);
      agents.push({ id: newAgentRef.key, ...agentData });
    }
    console.log(`Seeded ${agents.length} agents`);

    // Reviews
    const reviewsRef = ref(db, "reviews");
    const reviews: any[] = [];
    for (let i = 1; i <= 20; i++) {
      const newReviewRef = push(reviewsRef);
      const reviewData = {
        name: `Reviewer ${i}`,
        avatar: reviewImages[Math.floor(Math.random() * reviewImages.length)],
        review: `This is a review by Reviewer ${i}.`,
        rating: Math.floor(Math.random() * 5) + 1,
      };
      await set(newReviewRef, reviewData);
      reviews.push({ id: newReviewRef.key, ...reviewData });
    }
    console.log(`Seeded ${reviews.length} reviews`);

    // Galleries
    const galleriesRef = ref(db, "galleries");
    const galleries: any[] = [];
    for (const img of galleryImages) {
      const newGalleryRef = push(galleriesRef);
      await set(newGalleryRef, { image: img });
      galleries.push({ id: newGalleryRef.key, image: img });
    }
    console.log(`Seeded ${galleries.length} galleries`);

    // Properties
    const propertiesRef = ref(db, "properties");
    for (let i = 1; i <= 20; i++) {
      const newPropertyRef = push(propertiesRef);
      const assignedAgent = agents[Math.floor(Math.random() * agents.length)];
      const assignedReviews = getRandomSubset(reviews, 5, 7);
      const assignedGalleries = getRandomSubset(galleries, 3, 5);
      const selectedFacilities = getRandomSubset(
        facilities,
        1,
        facilities.length
      );

      const propertyData = {
        name: `Property ${i}`,
        type: propertyTypes[Math.floor(Math.random() * propertyTypes.length)],
        description: `This is the description for Property ${i}.`,
        address: `123 Property Street, City ${i}`,
        geolocation: `192.168.1.${i}, 192.168.1.${i}`,
        price: Math.floor(Math.random() * 9000) + 1000,
        area: Math.floor(Math.random() * 3000) + 500,
        bedrooms: Math.floor(Math.random() * 5) + 1,
        bathrooms: Math.floor(Math.random() * 5) + 1,
        rating: Math.floor(Math.random() * 5) + 1,
        facilities: selectedFacilities,
        image: propertiesImages[i % propertiesImages.length],
        agentId: assignedAgent.id,
        reviewIds: assignedReviews.map((r) => r.id),
        galleryIds: assignedGalleries.map((g) => g.id),
      };

      await set(newPropertyRef, propertyData);
      console.log(`Seeded property: ${propertyData.name}`);
    }

    console.log("Firebase Realtime Database seeding completed!");
  } catch (error) {
    console.error("Error seeding Firebase:", error);
  }
}

seed();
