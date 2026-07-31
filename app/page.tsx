// app/page.tsx
import { db } from "@/lib/db";
import { MenuItemCard } from "@/components/menu/menu-item-card";
import { MapPin, Phone, Flame, Star, Clock, Music, Coffee, Heart } from "lucide-react";

export default async function HomePage() {
  const categories = await db.category.findMany({
    orderBy: { order: "asc" },
    include: {
      items: {
        where: { isAvailable: true },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  const prepTimes = ["12-15 min", "20-25 min", "10-12 min", "18-22 min", "8-10 min"];

  // 🍽️ PREMIUM RESTAURANT IMAGES
  const glassSlides = [
    {
      url: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
      alt: "Grilled steak with vegetables",
      label: "Signature Grill"
    },
    {
      url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
      alt: "Sizzling grilled meat platter",
      label: "Fire Grilled"
    },
    {
      url: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=800&q=80",
      alt: "Premium steak with sides",
      label: "Chef's Selection"
    },
    {
      url: "https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80",
      alt: "Grilled chicken with herbs",
      label: "Herb Infused"
    },
    {
      url: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80",
      alt: "Premium beef steak",
      label: "Prime Cut"
    },
    {
      url: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800&q=80",
      alt: "Grilled vegetables and meat",
      label: "Garden Fresh"
    },
  ];

  return (
    <main className="relative min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      
      {/* 🔥 AMBIENT BACKGROUND */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a0a] via-[#0d0d0d] to-[#0a0a0a]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-3xl" />
        
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-amber-400/10 animate-float"
              style={{
                width: Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDelay: Math.random() * 5 + 's',
                animationDuration: Math.random() * 10 + 8 + 's',
              }}
            />
          ))}
        </div>
      </div>

      {/* 🔥 HERO - FULLY RESPONSIVE GLASS SLIDES */}
      <section className="relative min-h-screen flex items-center px-4 py-8 overflow-hidden">
        
        <div className="relative w-full max-w-6xl mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Column - Text (Full width on mobile) */}
            <div className="w-full space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 order-1 lg:order-none">
              {/* Brand */}
              <div className="inline-flex items-center gap-3 md:gap-4 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full px-4 md:px-6 py-2 md:py-2.5">
                <span className="relative flex h-2 w-2 md:h-2.5 md:w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 md:h-2.5 md:w-2.5 bg-amber-400" />
                </span>
                <span className="text-[10px] md:text-[11px] font-light text-white/80 tracking-[0.15em] md:tracking-[0.2em] uppercase">
                  Live Grill • Kampala
                </span>
              </div>

              {/* Main Heading */}
              <div>
                <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight leading-[1.1]">
                  <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 bg-clip-text text-transparent animate-glow-slow">
                    Mbuzi
                  </span>
                  <span className="text-white/95 block sm:inline-block sm:ml-2 md:ml-4">Choma</span>
                </h1>
              </div>

              {/* Decorative line */}
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-12 md:w-16 h-0.5 bg-gradient-to-r from-amber-400/60 to-transparent" />
                <span className="text-[10px] md:text-xs font-light text-white/30 tracking-[0.2em] md:tracking-[0.3em] uppercase">Since 2024</span>
              </div>

              {/* Description */}
              <p className="max-w-md text-base md:text-lg lg:text-xl text-white/70 font-light leading-relaxed">
                Where fire meets flavor — 
                <span className="text-amber-300/80 block">charcoal-grilled perfection.</span>
              </p>

              {/* Stats - Scrollable on mobile */}
              <div className="flex flex-wrap gap-4 md:gap-8 text-sm">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                    <Star className="h-3.5 w-3.5 md:h-4 md:w-4 fill-amber-400 text-amber-400" />
                  </div>
                  <div>
                    <span className="block text-white/90 font-medium text-xs md:text-sm">4.9 ★</span>
                    <span className="text-[8px] md:text-[10px] text-white/30">1.2k reviews</span>
                  </div>
                </div>
                
                <div className="hidden sm:block w-px h-10 md:h-12 bg-white/5" />
                
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                    <Clock className="h-3.5 w-3.5 md:h-4 md:w-4 text-amber-400" />
                  </div>
                  <div>
                    <span className="block text-white/90 font-medium text-xs md:text-sm">Open Now</span>
                    <span className="text-[8px] md:text-[10px] text-white/30">24/7</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Glass Slides Gallery (Full width on mobile) */}
            <div className="w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[600px] rounded-2xl md:rounded-3xl overflow-hidden order-2 lg:order-none">
              {/* Glass Frame */}
              <div className="relative w-full h-full rounded-2xl md:rounded-3xl border border-white/10 backdrop-blur-sm bg-white/5 overflow-hidden">
                
                {/* Glass Slides Container */}
                <div className="relative w-full h-full">
                  {glassSlides.map((slide, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 glass-slide-${index + 1}`}
                    >
                      <img
                        src={slide.url}
                        alt={slide.alt}
                        className="h-full w-full object-cover"
                      />
                      {/* Glass overlay effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent" />
                      
                      {/* Glass shine */}
                      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-white/10 to-transparent" />
                      
                      {/* Label - Responsive */}
                      <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6">
                        <span className="text-[8px] md:text-[10px] lg:text-xs font-light text-white/70 tracking-[0.1em] md:tracking-[0.15em] uppercase border border-white/20 px-2 md:px-3 lg:px-4 py-1 md:py-1.5 rounded-full backdrop-blur-sm bg-black/30">
                          {slide.label}
                        </span>
                      </div>
                      
                      {/* Index indicator - Responsive */}
                      <div className="absolute top-4 md:top-6 right-4 md:right-6">
                        <span className="text-[8px] md:text-[10px] font-light text-white/20">
                          {String(index + 1).padStart(2, '0')}/{String(glassSlides.length).padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Glass reflection overlay */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/5 via-transparent to-white/5" />
                <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-2xl md:rounded-3xl" />
              </div>
            </div>
          </div>

          {/* Scroll indicator - Hidden on mobile, visible on larger screens */}
          <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow">
            <div className="flex flex-col items-center gap-2 text-white/10">
              <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
              <span className="text-[9px] tracking-[0.3em] uppercase font-light">Explore</span>
            </div>
          </div>
        </div>
      </section>

      {/* 🍖 CREATIVE MENU LAYOUT - Fully Responsive */}
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 space-y-16 md:space-y-20">
        
        {categories.map((category) => (
          <section key={category.id} id={category.id} className="scroll-mt-20">
            {/* Category Header - Responsive */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-6 md:mb-10">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="h-8 md:h-10 w-1 bg-gradient-to-b from-amber-500 to-amber-400 rounded-full" />
                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                  {category.name}
                </h2>
              </div>
              <div className="flex-1 min-w-[40px] h-px bg-gradient-to-r from-white/10 to-transparent" />
              <span className="text-xs md:text-sm text-white/30 bg-white/5 px-2 md:px-3 py-0.5 md:py-1 rounded-full border border-white/5">
                {category.items.length} items
              </span>
            </div>
            
            {/* Menu Grid - Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {category.items.map((item, itemIndex) => {
                const isPopular = itemIndex === 0 || itemIndex === 3;
                const isChefSpecial = itemIndex === 1 || itemIndex === 4;
                const isNew = itemIndex === 2 || itemIndex === 5;
                const prepTime = prepTimes[itemIndex % prepTimes.length];
                const delay = (itemIndex % 3) * 100;
                
                return (
                  <div
                    key={item.id}
                    className={`animate-in fade-in slide-in-from-bottom-6 duration-700 ${
                      itemIndex % 2 === 0 ? 'sm:translate-y-0' : 'sm:translate-y-4 md:translate-y-8'
                    }`}
                    style={{ animationDelay: `${delay}ms` }}
                  >
                    <MenuItemCard
                      name={item.name}
                      description={item.description}
                      price={item.price}
                      imageUrl={item.imageUrl}
                      isPopular={isPopular}
                      isChefSpecial={isChefSpecial}
                      isNew={isNew}
                      prepTime={prepTime}
                    />
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* 📖 OUR STORY - Responsive */}
      <section className="max-w-6xl mx-auto px-4 mt-12 md:mt-16">
        <div className="relative rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 p-6 md:p-8 lg:p-12 text-center backdrop-blur-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-orange-500/5" />
          
          <div className="relative space-y-4 md:space-y-6">
            <div className="inline-block rounded-full bg-amber-500/20 px-4 md:px-6 py-1 md:py-1.5 text-[10px] md:text-xs font-bold text-amber-400 tracking-wider border border-amber-500/20">
              Our Story
            </div>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white">More Than Just Food</h2>
            <p className="max-w-2xl mx-auto text-sm md:text-base text-white/60 leading-relaxed">
              Mbuzi Choma is a Youth Platform Africa business, bringing Uganda's 
              rich grilling heritage to your table. Every bite is a story of 
              tradition, community, and the perfect charcoal flame.
            </p>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12 pt-4">
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                  <Flame className="h-5 w-5 md:h-6 md:w-6 text-amber-400" />
                </div>
                <span className="text-[10px] md:text-xs text-white/40">Charcoal Grill</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                  <Heart className="h-5 w-5 md:h-6 md:w-6 text-red-400" />
                </div>
                <span className="text-[10px] md:text-xs text-white/40">Made with Love</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                  <Coffee className="h-5 w-5 md:h-6 md:w-6 text-amber-400" />
                </div>
                <span className="text-[10px] md:text-xs text-white/40">Fresh Daily</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 📍 CONTACT - Responsive */}
      <section className="max-w-6xl mx-auto px-4 mt-6 md:mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          <div className="flex items-center justify-center gap-3 md:gap-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 hover:bg-white/10 transition-all group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/30 transition-all">
              <MapPin className="h-4 w-4 md:h-5 md:w-5 text-amber-400" />
            </div>
            <div className="text-left">
              <span className="block text-xs md:text-sm font-medium text-white">Find Us</span>
              <span className="text-xs md:text-sm text-white/40">Kampala, Uganda</span>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-3 md:gap-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 hover:bg-white/10 transition-all group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/30 transition-all">
              <Phone className="h-4 w-4 md:h-5 md:w-5 text-amber-400" />
            </div>
            <div className="text-left">
              <span className="block text-xs md:text-sm font-medium text-white">Call Us</span>
              <span className="text-xs md:text-sm text-white/40">+256 XXX XXX XXX</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER - Responsive */}
      <footer className="max-w-6xl mx-auto px-4 mt-12 md:mt-16 pb-6 md:pb-8 text-center">
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-[10px] md:text-xs text-white/20">
          <Music className="h-3 w-3" />
          <span>© {new Date().getFullYear()} Mbuzi Choma • Youth Platform Africa</span>
          <Flame className="h-3 w-3" />
        </div>
        <p className="mt-1 text-[8px] md:text-[10px] text-white/10">Made with 🔥 and passion</p>
      </footer>
    </main>
  );
}