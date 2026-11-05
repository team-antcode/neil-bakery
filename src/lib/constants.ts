import type { NavItem, Outlet, Testimonial, CategoryItem, ContactInfo } from '@/types';

// Navigation items
export const NAV_ITEMS: NavItem[] = [
  { name: 'Home', id: 'home' },
  { name: 'About Us', id: 'about' },
  { name: 'Outlets', id: 'outlets' },
  { name: 'Products', id: 'products' },
  { name: 'Feedback', id: 'feedback' },
  { name: 'Contact Us', id: 'contact' },
];

// Company information
export const COMPANY_INFO = {
  name: "Neil Bakery",
  tagline: 'Freshly baked goods made with love',
  description:
    "Freshly baked goods made with love and the finest ingredients. Serving our community since 1990.",
  email: 'neilbakery87@gmail.com',
  phone: '0771544293 | 0112657088',
  address: 'St.Annes Lane Katukurunda Moratuwa ',
} as const;

// lib/constants.ts

export const OUTLETS: Outlet[] = [
  {
    name: 'Neil Bakery - Moratuwa',
    address: 'Moratuwa, Colombo',
    hours: 'Open 5.30 AM - 9.00 PM',
    phone: '+94 76 094 9867',
    lat: 6.775279,
    lng: 79.884022,
  },

  {
    name: 'Neil Bakery - Lunawa',
    address: 'Beachside- No.96/A, Puranappuraja Mawatha, Moratuwa',
    hours: 'Open 5.30 AM - 9.00 PM',
    lat: 6.7865,
    lng: 79.8776,
  },
  
  {
    name: 'Neil Bakery - Koralawella',
    address: 'Moratuwa, Colombo',
    hours: 'Open 5.30 AM - 9.00 PM',
    phone: '+94 76 101 9656',
    lat: 6.758583,
    lng: 79.889378,
  },

  {
    name: 'Neil Bakery - Egoda Uyana',
    address: 'Moratuwa, Colombo', // Example address
    hours: 'Open 5.30 AM - 9.00 PM',
    phone: '+94 76 354 6745',
    lat: 6.743246,
    lng: 79.892377,
  }
];


// Product categories for home page
export const PRODUCT_CATEGORIES: CategoryItem[] = [
  {
    name: 'Breads',
    description: 'Freshly baked artisan breads',
    icon: '🍞',
    items: ['Sourdough', 'Whole Wheat', 'French Baguette', 'Multigrain'],
  },
  {
    name: 'Pastries',
    description: 'Delicious sweet and savory pastries',
    icon: '🥐',
    items: ['Croissants', 'Danish', 'Puff Pastry', 'Eclairs'],
  },
  {
    name: 'Cakes',
    description: 'Custom cakes for every occasion',
    icon: '🎂',
    items: ['Birthday Cakes', 'Wedding Cakes', 'Cupcakes', 'Cheesecakes'],
  },
  {
    name: 'Sweets',
    description: 'Delightful sweet treats',
    icon: '🍬',
    items: ['Cookies', 'Brownies', 'Macarons', 'Donuts'],
  },
  {
    name: 'Drinks',
    description: 'Refreshing beverages',
    icon: '☕',
    items: ['Coffee', 'Tea', 'Fresh Juice', 'Smoothies'],
  },
];

// Testimonials for Feedback Section
export const CUSTOMER_TESTIMONIALS = [
  {
    id: 1,
    name: 'Banu Athuraliya',
    role: 'Content Creator',
    initials: 'BA',
    rating: 5,
    feedback:
      'Good variety of bakery items and bread, offering fresh and delicious choices for every taste.',
    googleReviewUrl: 'https://share.google/6PItFsRgdlXZYYhBA',
  },
  {
    id: 2,
    name: 'Roshan Tilakaratna',
    role: 'Local Guide',
    initials: 'RT',
    rating: 5,
    feedback:
      'Delicious food, reasonable prices, excellent service, and a great atmosphere made the experience wonderful overall.',
    googleReviewUrl: 'https://share.google/dmUrp2GjJ1JnCWtG1',
  },
  {
    id: 3,
    name: 'Rovin Shanila',
    role: 'Local Guide',
    initials: 'RS',
    rating: 5,
    feedback:
      'Excellent service and healthy food made the breakfast enjoyable and well worth the affordable price overall.',
    googleReviewUrl: 'https://share.google/O64sJGqMzdAN26lKU',
  },
  {
    id: 4,
    name: 'Suresh Rambukwella',
    role: 'Regular Customer',
    initials: 'SR',
    rating: 5,
    feedback:
      'The food is delicious, and the variety offered is excellent, making the dining experience enjoyable.',
    googleReviewUrl: 'https://share.google/SyJ0EB32QswhgfJBW',
  },
  {
    id: 5,
    name: 'Isuru Amarathunga',
    role: 'Regular Customer',
    initials: 'IA',
    rating: 4,
    feedback:
      'Good food with great variety; service was good, though the atmosphere could be improved.',
    googleReviewUrl: 'https://share.google/T7cZ1eKuZA4hhispY',
  },
  {
    id: 6,
    name: 'Sugeeth Ransara',
    role: 'Local Guide',
    initials: 'SR',
    rating: 5,
    feedback:
      'Absolutely the best and most delicious food, with excellent service and a perfect atmosphere overall.',
    googleReviewUrl: 'https://share.google/6Mj7r9BK0B5vVBhKO',
  },
] as const;

// Legacy testimonials (kept for backward compatibility)
export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Sarah Johnson',
    rating: 5,
    comment: 'The best bakery in town! Their croissants are absolutely divine.',
    date: 'Nov 2024',
  },
  {
    name: 'Michael Chen',
    rating: 5,
    comment: 'Fresh bread every day and amazing customer service. Highly recommended!',
    date: 'Oct 2024',
  },
  {
    name: 'Emma Williams',
    rating: 5,
    comment: 'Their custom cakes are works of art. Perfect for special occasions!',
    date: 'Dec 2024',
  },
];

// Contact information items
export const CONTACT_INFO: ContactInfo[] = [
  {
    icon: '📍',
    title: 'Address',
    content: ['St.Annes Lane, Katukurunda, Moratuwa'],
  },
  {
    icon: '📞',
    title: 'Phone',
    content: '0771544293 | 0112657088',
  },
  {
    icon: '✉️',
    title: 'Email',
    content: 'neilbakery87@gmail.com',
  },
  {
    icon: '🕒',
    title: 'Business Hours',
    content: ['Monday - Sunday: 5.30 AM - 9.00 PM'],
  },
];

// Statistics
export const STATS = [
  { value: '100+', label: 'Products' },
  { value: '10K+', label: 'Happy Customers' },
  { value: '5+', label: 'Outlets' },
] as const;