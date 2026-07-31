import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/40">
      <header className="border-b border-border bg-card px-6 py-4">
        <h1 className="font-display text-xl text-foreground">
          Mbuzi Choma — Admin
        </h1>
        <nav className="mt-3 flex gap-4">
          <Link
            href="/admin"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Items
          </Link>
          <Link
            href="/admin/categories"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Categories
          </Link>
        </nav>
      </header>
      <main className="mx-auto max-w-4xl px-6 py-8">{children}</main>
    </div>
  );
}