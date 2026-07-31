import { db } from "@/lib/db";
import { redirect, notFound } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = await db.category.findUnique({ where: { id } });
  if (!category) notFound();

  async function updateCategory(formData: FormData) {
    "use server";
    await db.category.update({
      where: { id },
      data: { name: formData.get("name") as string },
    });
    revalidatePath("/admin/categories");
    revalidatePath("/admin");
    revalidatePath("/");
    redirect("/admin/categories");
  }

  return (
    <div>
      <h2 className="mb-6 font-display text-xl text-foreground">Edit Category</h2>
      <form action={updateCategory} className="flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium text-foreground">Name</label>
          <input
            name="name"
            defaultValue={category.name}
            required
            className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>
        <button
          type="submit"
          className="mt-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}