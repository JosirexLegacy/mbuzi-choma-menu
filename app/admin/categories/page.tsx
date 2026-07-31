// app/admin/categories/page.tsx
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Trash2, Pencil, Plus, GripVertical, ChefHat, UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import { CategoryOrderInput } from "@/components/menu/category-order-input";

async function deleteCategory(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;

  const itemCount = await db.menuItem.count({ where: { categoryId: id } });
  if (itemCount > 0) {
    return;
  }

  await db.category.delete({ where: { id } });
  revalidatePath("/admin/categories");
  revalidatePath("/admin");
  revalidatePath("/");
}

async function updateOrder(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const order = Number(formData.get("order"));
  await db.category.update({ where: { id }, data: { order } });
  revalidatePath("/admin/categories");
  revalidatePath("/");
}

export default async function CategoriesPage() {
  const categories = await db.category.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { items: true } } },
  });

  const totalItems = categories.reduce((acc, cat) => acc + cat._count.items, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a] p-4 md:p-8">
      
      {/* Background Glow */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header - Premium */}
        <div className="relative">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="h-8 w-1 bg-gradient-to-b from-amber-500 to-amber-400 rounded-full" />
                <div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
                    Categories
                  </h2>
                  <p className="text-sm text-white/40 font-light tracking-wide">
                    Manage your menu categories
                  </p>
                </div>
              </div>
              
              {/* Stats */}
              <div className="flex items-center gap-6 ml-4">
                <div className="flex items-center gap-2 text-sm text-white/30">
                  <UtensilsCrossed className="h-4 w-4" />
                  <span>{categories.length} categories</span>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-2 text-sm text-white/30">
                  <ChefHat className="h-4 w-4" />
                  <span>{totalItems} total items</span>
                </div>
              </div>
            </div>

            {/* Add Button - Glass */}
            <Link
              href="/admin/categories/new"
              className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full font-medium text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all hover:scale-105"
            >
              <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" strokeWidth={2} />
              <span>Add Category</span>
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-amber-400 animate-ping" />
            </Link>
          </div>

          {/* Decorative line */}
          <div className="mt-6 h-px bg-gradient-to-r from-amber-500/20 via-white/10 to-transparent" />
        </div>

        {/* Categories List - Modern Grid */}
        <div className="grid grid-cols-1 gap-3">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/5"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Index number */}
              <div className="absolute top-4 right-4 text-xs font-mono text-white/10 group-hover:text-white/20 transition-colors">
                #{String(index + 1).padStart(2, '0')}
              </div>

              <div className="relative flex items-center justify-between p-4 md:p-5">
                {/* Left - Category Info */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {/* Drag Handle - Styled */}
                  <div className="text-white/20 group-hover:text-white/40 transition-colors cursor-move">
                    <GripVertical className="h-5 w-5" strokeWidth={1.5} />
                  </div>

                  {/* Order Input - Styled */}
                  <CategoryOrderInput
                    id={category.id}
                    order={category.order}
                    action={updateOrder}
                  />

                  {/* Category Details */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className="font-display text-lg font-semibold text-white group-hover:text-amber-400 transition-colors truncate">
                        {category.name}
                      </h3>
                      {category._count.items > 0 && (
                        <span className="inline-flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 rounded-full px-2.5 py-0.5 text-[10px] font-medium text-amber-400">
                          <ChefHat className="h-2.5 w-2.5" />
                          {category._count.items}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-white/40 group-hover:text-white/60 transition-colors">
                      {category._count.items === 0 
                        ? 'No items yet' 
                        : `${category._count.items} item${category._count.items !== 1 ? 's' : ''} available`
                      }
                    </p>
                  </div>
                </div>

                {/* Right - Actions */}
                <div className="flex items-center gap-1 ml-4">
                  {/* Edit Button - Glass */}
                  <Link
                    href={`/admin/categories/${category.id}/edit`}
                    className="relative p-2.5 rounded-xl text-white/30 hover:text-white bg-white/5 hover:bg-white/10 transition-all group/edit"
                  >
                    <Pencil className="h-4 w-4 group-hover/edit:scale-110 transition-transform" strokeWidth={1.5} />
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-white/20 opacity-0 group-hover/edit:opacity-100 transition-opacity whitespace-nowrap">
                      Edit
                    </span>
                  </Link>

                  {/* Delete Button - Styled */}
                  <form action={deleteCategory} className="relative">
                    <input type="hidden" name="id" value={category.id} />
                    <button
                      type="submit"
                      disabled={category._count.items > 0}
                      title={
                        category._count.items > 0
                          ? "Move or delete its items first"
                          : "Delete category"
                      }
                      className="p-2.5 rounded-xl text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all group/delete disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white/20"
                    >
                      <Trash2 className="h-4 w-4 group-hover/delete:scale-110 transition-transform" strokeWidth={1.5} />
                      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-white/20 opacity-0 group-hover/delete:opacity-100 transition-opacity whitespace-nowrap">
                        {category._count.items > 0 ? 'Has items' : 'Delete'}
                      </span>
                    </button>
                  </form>
                </div>
              </div>

              {/* Bottom glow on hover */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-700 group-hover:w-full" />
            </div>
          ))}

          {/* Empty State - Styled */}
          {categories.length === 0 && (
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center">
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
                  <UtensilsCrossed className="h-8 w-8 text-amber-400/40" />
                </div>
                <h3 className="font-display text-xl text-white mb-2">No Categories Yet</h3>
                <p className="text-sm text-white/40 max-w-sm mx-auto">
                  Start by creating your first category. Organize your menu items for a better dining experience.
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
        <div className="flex items-center justify-between text-xs text-white/10 pt-4 border-t border-white/5">
          <div className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400/30" />
            <span>Drag to reorder categories</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Total: {categories.length} categories</span>
            <span>•</span>
            <span>{totalItems} items</span>
          </div>
        </div>
      </div>
    </div>
  );
}