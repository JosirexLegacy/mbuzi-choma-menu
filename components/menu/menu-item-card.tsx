// components/menu/menu-item-card.tsx
import { Flame, Star, Clock, ChefHat, Sparkles, Heart } from "lucide-react";

type MenuItemCardProps = {
  name: string;
  description: string;
  price: number;
  imageUrl?: string | null;
  isPopular?: boolean;
  isChefSpecial?: boolean;
  prepTime?: string;
  isNew?: boolean;
};

export function MenuItemCard({ 
  name, 
  description, 
  price, 
  imageUrl,
  isPopular = false,
  isChefSpecial = false,
  prepTime = "15 min",
  isNew = false,
}: MenuItemCardProps) {
  return (
    <div className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:bg-white/10 hover:border-orange-500/40 hover:shadow-2xl hover:shadow-orange-500/20 hover:-translate-y-1">
      
      {/* Glowing aura on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Subtle food background in card */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <img
          src={imageUrl || "https://images.unsplash.com/photo-1544025162-d76694265947?w=200&q=80"}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative flex gap-4 p-4 sm:p-5">
        {/* Image with sizzle effect */}
        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl sm:h-32 sm:w-32">
          {imageUrl ? (
            <>
              <img
                src={imageUrl}
                alt={name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Warm overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              
              {/* Sizzle effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/0 via-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* 🔥 BADGES */}
              <div className="absolute top-1.5 left-1.5 flex flex-col gap-1">
                {isNew && (
                  <span className="inline-flex items-center gap-1 bg-gradient-to-r from-green-500 to-emerald-500 px-2 py-0.5 rounded-full text-[9px] font-black text-white shadow-lg shadow-green-500/30 uppercase tracking-wider animate-pulse">
                    <Sparkles className="h-2.5 w-2.5" />
                    New
                  </span>
                )}
                {isPopular && (
                  <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 px-2 py-0.5 rounded-full text-[9px] font-black text-white shadow-lg shadow-orange-500/30 uppercase tracking-wider">
                    <Star className="h-2.5 w-2.5 fill-white" />
                    Popular
                  </span>
                )}
                {isChefSpecial && (
                  <span className="inline-flex items-center gap-1 bg-gradient-to-r from-red-500 to-pink-500 px-2 py-0.5 rounded-full text-[9px] font-black text-white shadow-lg shadow-red-500/30 uppercase tracking-wider">
                    <ChefHat className="h-2.5 w-2.5" />
                    Chef's Pick
                  </span>
                )}
              </div>

              {/* Fresh badge */}
              <div className="absolute bottom-1.5 right-1.5">
                <span className="inline-flex items-center gap-0.5 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded-full text-[7px] font-black text-white/80 uppercase tracking-wider border border-white/10">
                  <Heart className="h-2 w-2 text-red-400 fill-red-400" />
                  Fresh
                </span>
              </div>
            </>
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center">
              <Flame className="h-8 w-8 text-orange-400/40 animate-pulse" />
            </div>
          )}
        </div>

        {/* Content - Pure presentation */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <div>
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h3 className="font-bold text-white text-base sm:text-lg group-hover:text-orange-400 transition-colors">
                  {name}
                </h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-white/40 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {prepTime}
                  </span>
                  {isPopular && (
                    <span className="text-[8px] text-amber-400 font-bold uppercase tracking-wider">★ Bestseller</span>
                  )}
                </div>
              </div>
              <div className="shrink-0 text-right">
                <span className="font-black text-transparent bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-lg sm:text-xl">
                  {price.toLocaleString()}
                </span>
                <span className="text-[10px] text-white/30 ml-0.5">UGX</span>
              </div>
            </div>
            
            <p className="mt-1.5 text-sm text-white/50 leading-relaxed line-clamp-2 group-hover:text-white/70 transition-colors">
              {description}
            </p>
          </div>

          {/* Presentation footer - Just vibe, no ordering */}
          <div className="mt-3 flex items-center justify-between opacity-60 group-hover:opacity-100 transition-all">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[10px] text-white/30">
                <Flame className="h-3 w-3 text-orange-400/60" />
                <span>Charcoal grilled</span>
              </span>
            </div>
            <div className="flex gap-1.5">
              <span className="h-1 w-1 rounded-full bg-orange-400/20 group-hover:bg-orange-400/40 transition-all" />
              <span className="h-1 w-1 rounded-full bg-orange-400/40 group-hover:bg-orange-400/60 transition-all" />
              <span className="h-1 w-1 rounded-full bg-orange-400/60 group-hover:bg-orange-400 transition-all" />
            </div>
          </div>
        </div>
      </div>

      {/* Animated bottom glow - like fire */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 transition-all duration-700 group-hover:w-full group-hover:shadow-[0_0_20px_rgba(251,146,60,0.3)]" />
      
      {/* Corner sparkle */}
      <div className="absolute -top-1 -right-1 h-4 w-4 bg-orange-500/20 rounded-full blur-sm group-hover:bg-orange-500/40 transition-all duration-500" />
    </div>
  );
}