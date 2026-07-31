// app/admin/page.tsx
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Trash2, Pencil, EyeOff, Eye, Plus, ChefHat, UtensilsCrossed, Sparkles, GripVertical } from "lucide-react";
import Link from "next/link";

async function deleteItem(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await db.menuItem.delete({ where: { id } });
  revalidatePath("/admin");
  revalidatePath("/");
}

async function toggleAvailability(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const current = formData.get("current") === "true";
  await db.menuItem.update({
    where: { id },
    data: { isAvailable: !current },
  });
  revalidatePath("/admin");
  revalidatePath("/");
}

export default async function AdminPage() {
  const categories = await db.category.findMany({
    orderBy: { order: "asc" },
    include: { items: { orderBy: { createdAt: "asc" } } },
  });

  const totalItems = categories.reduce((acc, cat) => acc + cat.items.length, 0);
  const availableItems = categories.reduce((acc, cat) => 
    acc + cat.items.filter(item => item.isAvailable).length, 0
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a] p-4 md:p-8">
      
      {/* Background Glow */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header - Premium */}
        <div className="relative">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="h-8 w-1 bg-gradient-to-b from-amber-500 to-amber-400 rounded-full" />
                <div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
                    Menu Management
                  </h2>
                  <p className="text-sm text-white/40 font-light tracking-wide">
                    Manage your menu items and categories
                  </p>
                </div>
              </div>
              
              {/* Stats */}
              <div className="flex flex-wrap items-center gap-4 ml-4">
                <div className="flex items-center gap-2 text-sm text-white/30">
                  <UtensilsCrossed className="h-4 w-4" />
                  <span>{totalItems} total items</span>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-2 text-sm text-white/30">
                  <Eye className="h-4 w-4" />
                  <span>{availableItems} available</span>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-2 text-sm text-white/30">
                  <ChefHat className="h-4 w-4" />
                  <span>{categories.length} categories</span>
                </div>
              </div>
            </div>

            {/* Add Button - Glass */}
            <Link
              href="/admin/new"
              className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full font-medium text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all hover:scale-105"
            >
              <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" strokeWidth={2} />
              <span>Add Item</span>
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-amber-400 animate-ping" />
            </Link>
          </div>

          {/* Decorative line */}
          <div className="mt-6 h-px bg-gradient-to-r from-amber-500/20 via-white/10 to-transparent" />
        </div>

        {/* Categories Grid */}
        <div className="space-y-10">
          {categories.map((category) => {
            const availableCount = category.items.filter(item => item.isAvailable).length;
            
            return (
              <section key={category.id} className="relative">
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-1 bg-gradient-to-b from-amber-500 to-amber-400 rounded-full" />
                    <h3 className="font-display text-xl font-bold text-white">
                      {category.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-white/30 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/5">
                      {category.items.length} items
                    </span>
                    {availableCount < category.items.length && (
                      <span className="text-xs text-amber-400/60 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                        {availableCount} visible
                      </span>
                    )}
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-white/5 to-transparent" />
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 gap-3">
                  {category.items.map((item, index) => (
                    <div
                      key={item.id}
                      className={`group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/5 ${
                        !item.isAvailable ? 'opacity-60' : ''
                      }`}
                    >
                      {/* Hover gradient */}
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Item index */}
                      <div className="absolute top-4 right-4 text-xs font-mono text-white/10 group-hover:text-white/20 transition-colors">
                        #{String(index + 1).padStart(2, '0')}
                      </div>

                      <div className="relative flex items-center justify-between p-4 md:p-5">
                        {/* Left - Item Info */}
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          {/* Availability indicator */}
                          <div className={`w-1.5 h-8 rounded-full transition-all ${
                            item.isAvailable 
                              ? 'bg-gradient-to-b from-green-500 to-emerald-500' 
                              : 'bg-gradient-to-b from-gray-500 to-gray-600'
                          }`} />

                          {/* Item Details */}
                          <div className="min-w-0">
                            <div className="flex items-center gap-3">
                              <h4 className={`font-medium truncate transition-colors ${
                                item.isAvailable 
                                  ? 'text-white group-hover:text-amber-400' 
                                  : 'text-white/40'
                              }`}>
                                {item.name}
                              </h4>
                              {!item.isAvailable && (
                                <span className="inline-flex items-center gap-1 bg-white/5 border border-white/5 rounded-full px-2 py-0.5 text-[9px] font-medium text-white/30">
                                  <EyeOff className="h-2.5 w-2.5" />
                                  Hidden
                                </span>
                              )}
                              {item.isAvailable && (
                                <span className="inline-flex items-center gap-1 bg-green-500/10 border border-green-500/20 rounded-full px-2 py-0.5 text-[9px] font-medium text-green-400">
                                  <Eye className="h-2.5 w-2.5" />
                                  Live
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-3 mt-0.5">
                              <p className="text-sm text-white/40 group-hover:text-white/60 transition-colors">
                                {item.price.toLocaleString()} UGX
                              </p>
                              {item.description && (
                                <>
                                  <span className="w-px h-3 bg-white/5" />
                                  <p className="text-xs text-white/20 truncate max-w-xs">
                                    {item.description}
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Right - Actions */}
                        <div className="flex items-center gap-1 ml-4">
                          {/* Toggle Availability */}
                          <form action={toggleAvailability} className="relative">
                            <input type="hidden" name="id" value={item.id} />
                            <input type="hidden" name="current" value={String(item.isAvailable)} />
                            <button
                              type="submit"
                              className={`p-2.5 rounded-xl transition-all group/toggle ${
                                item.isAvailable 
                                  ? 'text-green-400/40 hover:text-green-400 hover:bg-green-500/10' 
                                  : 'text-white/20 hover:text-white/60 hover:bg-white/5'
                              }`}
                              title={item.isAvailable ? "Hide from menu" : "Show on menu"}
                            >
                              {item.isAvailable ? (
                                <Eye className="h-4 w-4 group-hover/toggle:scale-110 transition-transform" strokeWidth={1.5} />
                              ) : (
                                <EyeOff className="h-4 w-4 group-hover/toggle:scale-110 transition-transform" strokeWidth={1.5} />
                              )}
                              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-white/20 opacity-0 group-hover/toggle:opacity-100 transition-opacity whitespace-nowrap">
                                {item.isAvailable ? 'Hide' : 'Show'}
                              </span>
                            </button>
                          </form>

                          {/* Edit Button */}
                          <Link
                            href={`/admin/${item.id}/edit`}
                            className="relative p-2.5 rounded-xl text-white/30 hover:text-white bg-white/5 hover:bg-white/10 transition-all group/edit"
                          >
                            <Pencil className="h-4 w-4 group-hover/edit:scale-110 transition-transform" strokeWidth={1.5} />
                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-white/20 opacity-0 group-hover/edit:opacity-100 transition-opacity whitespace-nowrap">
                              Edit
                            </span>
                          </Link>

                          {/* Delete Button */}
                          <form action={deleteItem} className="relative">
                            <input type="hidden" name="id" value={item.id} />
                            <button
                              type="submit"
                              className="p-2.5 rounded-xl text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all group/delete"
                            >
                              <Trash2 className="h-4 w-4 group-hover/delete:scale-110 transition-transform" strokeWidth={1.5} />
                              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-white/20 opacity-0 group-hover/delete:opacity-100 transition-opacity whitespace-nowrap">
                                Delete
                              </span>
                            </button>
                          </form>
                        </div>
                      </div>

                      {/* Bottom glow on hover */}
                      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-700 group-hover:w-full" />
                    </div>
                  ))}

                  {/* Empty state for category */}
                  {category.items.length === 0 && (
                    <div className="bg-white/5 border border-white/5 rounded-2xl p-6 text-center">
                      <p className="text-sm text-white/30">No items in this category yet</p>
                    </div>
                  )}
                </div>
              </section>
            );
          })}

          {/* Empty state for no categories */}
          {categories.length === 0 && (
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12 text-center">
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
                  <UtensilsCrossed className="h-8 w-8 text-amber-400/40" />
                </div>
                <h3 className="font-display text-xl text-white mb-2">No Menu Items Yet</h3>
                <p className="text-sm text-white/40 max-w-sm mx-auto">
                  Start creating your menu by adding categories and items.
                </p>
                <Link
                  href="/admin/categories/new"
                  className="inline-flex items-center gap-2 mt-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2.5 rounded-full text-sm font-medium shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all hover:scale-105"
                >
                  <Plus className="h-4 w-4" strokeWidth={2} />
                  Create Category
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-white/10 pt-4 border-t border-white/5">
          <div className="flex items-center gap-4">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400/30" />
            <span>{categories.length} categories • {totalItems} items</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Eye className="h-3 w-3 text-green-400/30" />
              {availableItems} visible
            </span>
            <span className="flex items-center gap-1.5">
              <EyeOff className="h-3 w-3 text-white/20" />
              {totalItems - availableItems} hidden
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}