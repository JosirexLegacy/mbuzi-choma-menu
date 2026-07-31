"use client";

type CategoryOrderInputProps = {
  id: string;
  order: number;
  action: (formData: FormData) => void;
};

export function CategoryOrderInput({ id, order, action }: CategoryOrderInputProps) {
  return (
    <form action={action} className="flex items-center gap-2">
      <input type="hidden" name="id" value={id} />
      <input
        name="order"
        type="number"
        defaultValue={order}
        onBlur={(e) => e.currentTarget.form?.requestSubmit()}
        className="w-14 rounded-lg border border-border bg-background px-2 py-1 text-center text-sm"
        title="Display order — lower numbers show first"
      />
    </form>
  );
}