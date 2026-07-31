import { db } from "@/lib/db";
import { ItemForm } from "@/components/menu/item-form";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import { saveImage } from "@/lib/upload";

export default async function EditItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [item, categories] = await Promise.all([
    db.menuItem.findUnique({ where: { id } }),
    db.category.findMany({ orderBy: { order: "asc" } }),
  ]);

  if (!item) notFound();

  async function updateItem(formData: FormData) {
    "use server";

    const imageFile = formData.get("image") as File;
    let imageUrl = item!.imageUrl ?? undefined;
    if (imageFile && imageFile.size > 0) {
      imageUrl = await saveImage(imageFile);
    }

    await db.menuItem.update({
      where: { id },
      data: {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        price: Number(formData.get("price")),
        categoryId: formData.get("categoryId") as string,
        imageUrl,
      },
    });
    revalidatePath("/admin");
    revalidatePath("/");
    redirect("/admin");
  }

  return (
    <div>
      <h2 className="mb-6 font-display text-xl text-foreground">Edit Menu Item</h2>
      <ItemForm
        categories={categories}
        action={updateItem}
        defaultValues={item}
        submitLabel="Save Changes"
      />
    </div>
  );
}