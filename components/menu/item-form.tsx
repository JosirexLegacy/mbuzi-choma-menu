"use client";

type Category = { id: string; name: string };

type ItemFormProps = {
  categories: Category[];
  action: (formData: FormData) => void;
  defaultValues?: {
    name: string;
    description: string;
    price: number;
    categoryId: string;
    imageUrl?: string | null;
  };
  submitLabel: string;
};

export function ItemForm({ categories, action, defaultValues, submitLabel }: ItemFormProps) {
  return (
    <form action={action} className="flex flex-col gap-4">
      <div>
        <label className="text-sm font-medium text-foreground">Name</label>
        <input
          name="name"
          defaultValue={defaultValues?.name}
          required
          className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-accent"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-foreground">Description</label>
        <textarea
          name="description"
          defaultValue={defaultValues?.description}
          required
          rows={3}
          className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-accent"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium text-foreground">Price (UGX)</label>
          <input
            name="price"
            type="number"
            defaultValue={defaultValues?.price}
            required
            className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>

        <div className="flex-1">
          <label className="text-sm font-medium text-foreground">Category</label>
          <select
            name="categoryId"
            defaultValue={defaultValues?.categoryId}
            required
            className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-accent"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
  <label className="text-sm font-medium text-foreground">Photo</label>
  <input
    name="image"
    type="file"
    accept="image/*"
    className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none file:mr-3 file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-1.5 file:text-sm file:text-foreground"
  />
  {defaultValues?.imageUrl && (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={defaultValues.imageUrl}
      alt="Current"
      className="mt-2 h-20 w-20 rounded-lg object-cover"
    />
  )}
</div>

      <button
        type="submit"
        className="mt-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
      >
        {submitLabel}
      </button>
    </form>
  );
}