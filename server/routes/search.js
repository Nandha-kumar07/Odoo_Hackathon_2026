const express = require('express');
const router = express.Router();

// Mock Data simulating an external "Places API"
const ACTIVITIES_DB = [
    {
        id: 1,
        title: 'Louvre Museum Guided Tour',
        rating: 4.8,
        reviews: '1.2k reviews',
        description: 'Skip the long lines and join a guided tour of the Louvre Museum. See the Mona Lisa, Venus de Milo, and other masterpieces.',
        tags: ['History', '3 Hours', 'Instant Confirmation'],
        category: 'Art & Culture',
        price: 45,
        location: 'Paris, France',
        image: 'https://images.unsplash.com/photo-1499856871940-a09627c6d7db?q=80&w=2070&auto=format&fit=crop',
    },
    {
        id: 2,
        title: 'Eiffel Tower Summit',
        rating: 5.0,
        reviews: '3.4k reviews',
        description: 'Access the summit of the Eiffel Tower for breathtaking views of Paris. Includes elevator access and a glass of champagne option.',
        tags: ['Landmark', '2.5 Hours', 'Selling Fast'],
        category: 'Sightseeing',
        price: 62,
        location: 'Paris, France',
        image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce7859?q=80&w=1974&auto=format&fit=crop',
    },
    {
        id: 3,
        title: 'Seine River Sunset Cruise',
        rating: 4.2,
        reviews: '850 reviews',
        description: 'Enjoy a romantic evening cruise on the Seine River. See the illuminated monuments of Paris, including the Eiffel Tower and Notre Dame.',
        tags: ['Romantic', '1 Hour'],
        category: 'Romance',
        price: 25,
        location: 'Paris, France',
        image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?q=80&w=2070&auto=format&fit=crop',
    },
    {
        id: 4,
        title: 'Montmartre Cheese & Wine',
        rating: 4.9,
        reviews: '420 reviews',
        description: 'Discover the culinary delights of Montmartre. Taste artisanal cheeses and fine wines while exploring the charming streets.',
        tags: ['Foodie', '2 Hours'],
        category: 'Food & Drink',
        price: 85,
        location: 'Paris, France',
        image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2070&auto=format&fit=crop',
    },
    {
        id: 5,
        title: 'Kyoto Temples Walking Tour',
        rating: 4.7,
        reviews: '560 reviews',
        description: 'Explore the ancient temples of Kyoto with a local guide. Visit Kinkaku-ji, Fushimi Inari, and more.',
        tags: ['History', '4 Hours'],
        category: 'Art & Culture',
        price: 55,
        location: 'Kyoto, Japan',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2074&auto=format&fit=crop',
    },
    {
        id: 6,
        title: 'Bali Surf Lesson',
        rating: 4.9,
        reviews: '890 reviews',
        description: 'Learn to surf in the beautiful waters of Kuta Beach. Professional instructors and equipment included.',
        tags: ['Adventure', '2 Hours'],
        category: 'Adventure',
        price: 35,
        location: 'Bali, Indonesia',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2038&auto=format&fit=crop',
    },
];

const CITIES_DB = [
    {
        id: 1,
        name: 'Paris',
        country: 'France',
        cost_index: '$$$',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop',
        description: 'The City of Light, famous for its cafe culture, Eiffel Tower, and the Louvre.',
        popularity: 98
    },
    {
        id: 2,
        name: 'Kyoto',
        country: 'Japan',
        cost_index: '$$',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2074&auto=format&fit=crop',
        description: 'Famous for its classical Buddhist temples, gardens, imperial palaces, Shinto shrines and traditional wooden houses.',
        popularity: 95
    },
    {
        id: 3,
        name: 'Bali',
        country: 'Indonesia',
        cost_index: '$',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2038&auto=format&fit=crop',
        description: 'An Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs.',
        popularity: 92
    },
    {
        id: 4,
        name: 'New York',
        country: 'USA',
        cost_index: '$$$$',
        image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop',
        description: 'The city that never sleeps, known for its skyscrapers, Broadway shows, and Central Park.',
        popularity: 97
    },
    {
        id: 5,
        name: 'Rome',
        country: 'Italy',
        cost_index: '$$',
        image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1996&auto=format&fit=crop',
        description: 'Italy’s capital, a sprawling, cosmopolitan city with nearly 3,000 years of globally influential art, architecture and culture.',
        popularity: 96
    }
];

// @route   GET /api/search/activities
// @desc    Search activities with filters
// @access  Public
router.get('/activities', (req, res) => {
    try {
        const { query, category, minPrice, maxPrice } = req.query;
        let results = ACTIVITIES_DB;

        // Filter by text query
        if (query) {
            const lowerQuery = query.toLowerCase();
            results = results.filter(a =>
                a.title.toLowerCase().includes(lowerQuery) ||
                a.description.toLowerCase().includes(lowerQuery) ||
                a.location.toLowerCase().includes(lowerQuery)
            );
        }

        // Filter by category
        if (category) {
            results = results.filter(a => a.category === category);
        }

        // Filter by price
        if (minPrice) {
            results = results.filter(a => a.price >= parseInt(minPrice));
        }
        if (maxPrice) {
            results = results.filter(a => a.price <= parseInt(maxPrice));
        }

        res.json({ success: true, count: results.length, data: results });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// @route   GET /api/search/cities
// @desc    Search destinations
// @access  Public
router.get('/cities', (req, res) => {
    try {
        const { query } = req.query;
        let results = CITIES_DB;

        if (query) {
            const lowerQuery = query.toLowerCase();
            results = results.filter(c =>
                c.name.toLowerCase().includes(lowerQuery) ||
                c.country.toLowerCase().includes(lowerQuery)
            );
        }

        res.json({ success: true, count: results.length, data: results });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
