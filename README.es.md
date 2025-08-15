# 🚀 StarWars Blog - React Frontend with Vite

A modern, responsive React application that explores the StarWars universe using the SWAPI.tech API. Built with Vite for lightning-fast development and optimized for Vercel deployment.

![StarWars Blog](https://via.placeholder.com/800x400/000000/FFE81F?text=StarWars+Blog)

## ✨ Features

- **🎬 Comprehensive StarWars Data**: Characters, planets, and vehicles from SWAPI.tech
- **❤️ Favorites System**: Save your favorite items with localStorage persistence
- **🔍 Advanced Search**: Real-time search with debouncing across all categories
- **📱 Responsive Design**: Bootstrap-powered UI that works on all devices
- **🖼️ Visual Guide Images**: High-quality images from starwars-visualguide.com
- **⚡ Vite Powered**: Lightning-fast development with HMR
- **🎨 Modern UI/UX**: Smooth animations, hover effects, and professional design

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks and context
- **Vite** - Next generation frontend tooling
- **React Router 6** - Client-side routing
- **Bootstrap 5** - Responsive CSS framework
- **Font Awesome** - Icons and visual elements
- **SWAPI.tech** - StarWars API data source
- **Vercel** - Deployment platform

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ and npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd starwars-blog-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   npm start
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
npm run preview  # Preview production build locally
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx             # Navigation with favorites counter
│   ├── CharacterCard.jsx      # Character display cards
│   ├── PlanetCard.jsx         # Planet display cards
│   ├── VehicleCard.jsx        # Vehicle display cards
│   ├── LoadingSpinner.jsx     # Loading states
│   └── SearchBar.jsx          # Search functionality
├── views/
│   ├── Home.jsx               # Main dashboard
│   ├── CharacterDetail.jsx    # Character detail pages
│   ├── PlanetDetail.jsx       # Planet detail pages
│   ├── VehicleDetail.jsx      # Vehicle detail pages
│   └── Favorites.jsx          # Favorites management
├── store/
│   └── AppContext.jsx         # Global state management
├── App.jsx                    # Main app component
├── App.css                    # Custom styles
├── main.jsx                   # Vite entry point
└── index.css                  # Global styles
```

## 🔥 Key Features Explained

### Favorites System
- **Add/Remove**: Click the heart icon on any card or detail page
- **Persistent Storage**: Favorites saved to localStorage
- **Visual Feedback**: Heart fills when item is favorited
- **Counter**: Navbar shows total favorites count

### Search Functionality
- **Real-time Search**: Search across characters, planets, and vehicles
- **Debounced Input**: Optimized performance with 300ms delay
- **Category Filtering**: Search within specific categories
- **No Results Handling**: Friendly messages when no matches found

### Vite Benefits
- **⚡ Fast HMR**: Instant hot module replacement
- **📦 Optimized Build**: Tree-shaking and code splitting
- **🚀 Fast Dev Server**: Lightning-fast startup
- **📱 Modern Syntax**: Native ES modules support

## 🎨 UI/UX Features

- **Dark Theme**: Professional dark navbar and accents
- **Hover Effects**: Cards lift and scale on hover
- **Responsive Grid**: Adapts to screen sizes (1-4 columns)
- **Loading States**: Spinners during data fetching
- **Error Handling**: User-friendly error messages
- **Breadcrumbs**: Easy navigation on detail pages

## 🌐 API Integration

### SWAPI.tech Endpoints Used:
- `GET /people` - All characters
- `GET /people/{id}` - Character details
- `GET /planets` - All planets  
- `GET /planets/{id}` - Planet details
- `GET /vehicles` - All vehicles
- `GET /vehicles/{id}` - Vehicle details

### Image Sources:
- **Characters**: `starwars-visualguide.com/assets/img/characters/{id}.jpg`
- **Planets**: `starwars-visualguide.com/assets/img/planets/{id}.jpg`
- **Vehicles**: `starwars-visualguide.com/assets/img/vehicles/{id}.jpg`

## 🚢 Deployment to Vercel

### Automatic Deployment:
1. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel auto-detects Vite and configures build settings

2. **Manual Deployment**:
   ```bash
   npm run build
   npx vercel --prod
   ```

### Environment Configuration:
No environment variables needed - this is a frontend-only app!

## 📱 Responsive Breakpoints

- **Mobile**: < 576px (1 column)
- **Tablet**: 576px - 768px (2 columns)  
- **Desktop**: 768px - 992px (3 columns)
- **Large Desktop**: > 992px (4 columns)

## 🔧 Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🎯 Future Enhancements

- [ ] **Advanced Search**: Autocomplete with suggestions
- [ ] **Infinite Scroll**: Load more items dynamically
- [ ] **Dark/Light Mode**: Theme switcher
- [ ] **Starships**: Add starships category
- [ ] **Species**: Add species data
- [ ] **Films**: Integration with movie data
- [ ] **PWA**: Service worker for offline functionality
- [ ] **Animations**: Page transitions with Framer Motion

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **SWAPI.tech** - For the comprehensive StarWars API
- **StarWars Visual Guide** - For the amazing character/planet images
- **4Geeks Academy** - For the project inspiration
- **Vite Team** - For the incredible build tool
- **Vercel** - For the excellent deployment platform

---

**May the Force be with you!** ⭐

Built with ❤️ and ⚡ Vite