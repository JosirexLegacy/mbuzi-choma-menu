// app/admin/categories/new/page.tsx
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ArrowLeft, Plus, ChefHat, Sparkles } from "lucide-react";
import Link from "next/link";

export default async function NewCategoryPage() {
  const count = await db.category.count();

  async function createCategory(formData: FormData) {
    "use server";
    await db.category.create({
      data: {
        name: formData.get("name") as string,
        order: count,
      },
    });
    revalidatePath("/admin/categories");
    revalidatePath("/");
    redirect("/admin/categories");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a] p-4 md:p-8">
      
      {/* Background Glow */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-2xl mx-auto">
        
        {/* Back Button - Styled */}
        <Link
          href="/admin/categories"
          className="group inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-all mb-6"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" strokeWidth={1.5} />
          <span>Back to Categories</span>
        </Link>

        {/* Main Card - Glass Morphism */}
        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 overflow-hidden">
          
          {/* Decorative glow */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-orange-500/5 rounded-full blur-3xl" />

          {/* Header */}
          <div className="relative flex items-start gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/20 flex items-center justify-center shrink-0">
              <Sparkles className="h-6 w-6 text-amber-400" />
            </div>
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
                Add Category
              </h2>
              <p className="text-sm text-white/40 font-light mt-1">
                Create a new category to organize your menu items
              </p>
            </div>
          </div>

          {/* Form */}
          <form action={createCategory} className="relative space-y-6">
            
            {/* Name Input */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-white/80 mb-2">
                <ChefHat className="h-4 w-4 text-amber-400" strokeWidth={1.5} />
                <span>Category Name</span>
                <span className="text-xs text-white/30 font-light">required</span>
              </label>
              <input
                name="name"
                required
                placeholder="e.g. Desserts, Appetizers, Main Course"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 outline-none transition-all duration-300 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 hover:border-white/20"
                autoFocus
              />
              <p className="mt-2 text-xs text-white/20 font-light">
                Choose a descriptive name for this category
              </p>
            </div>

            {/* Preview Section */}
            <div className="bg-white/5 border border-white/5 rounded-xl p-4">
              <p className="text-xs text-white/30 font-light tracking-wider uppercase mb-3">Preview</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/20 flex items-center justify-center">
                  <ChefHat className="h-4 w-4 text-amber-400/60" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white/40 text-sm font-light">Category:</span>
                    <span className="text-white/60 font-medium">New Category</span>
                  </div>
                  <span className="text-[10px] text-white/20">0 items • Position {count + 1}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="submit"
                className="group flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3.5 rounded-xl font-medium text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all hover:scale-[1.02] active:scale-95"
              >
                <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" strokeWidth={2} />
                <span>Create Category</span>
              </button>
              
              <Link
                href="/admin/categories"
                className="flex-1 inline-flex items-center justify-center px-6 py-3.5 rounded-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
              >
                Cancel
              </Link>
            </div>

            {/* Help text */}
            <div className="flex items-center gap-2 text-xs text-white/10">
              <span className="inline-block h-1 w-1 rounded-full bg-amber-400/30" />
              <span>Categories will appear in your menu in the order they're listed</span>
            </div>
          </form>
        </div>

        {/* Quick Tip */}
        <div className="mt-6 p-4 bg-white/5 border border-white/5 rounded-xl">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="h-3 w-3 text-amber-400" />
            </div>
            <div>
              <p className="text-xs font-medium text-white/40">💡 Quick Tip</p>
              <p className="text-xs text-white/20 mt-1">
                Create categories like "Starters", "Main Course", "Desserts", and "Drinks" 
                to make your menu easy to navigate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}