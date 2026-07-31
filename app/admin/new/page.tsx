import { db } from "@/lib/db";
import { ItemForm } from "@/components/menu/item-form";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { saveImage } from "@/lib/upload";

export default async function NewItemPage() {
  const categories = await db.category.findMany({ orderBy: { order: "asc" } });

  async function createItem(formData: FormData) {
    "use server";

    const imageFile = formData.get("image") as File;
    let imageUrl: string | undefined;
    if (imageFile && imageFile.size > 0) {
      imageUrl = await saveImage(imageFile);
    }

    await db.menuItem.create({
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
      <h2 className="mb-6 font-display text-xl text-foreground">Add Menu Item</h2>
      <ItemForm categories={categories} action={createItem} submitLabel="Add Item" />
    </div>
  );
}