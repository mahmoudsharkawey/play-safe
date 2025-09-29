import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t mt-12">
      <div className="mx-auto max-w-6xl px-4 py-8 grid gap-6 md:grid-cols-3 text-sm">
        <div>
          <div className="font-semibold mb-2">Play Safe</div>
          <p className="text-muted-foreground">Keeping communities informed and safe.</p>
        </div>
        <div className="space-y-2">
          <div className="font-medium">Links</div>
          <nav className="flex flex-col gap-1">
            <Link href="#alerts" className="hover:underline underline-offset-4">Alerts</Link>
            <Link href="#about" className="hover:underline underline-offset-4">About</Link>
            <Link href="#contact" className="hover:underline underline-offset-4">Contact</Link>
          </nav>
        </div>
        <div className="space-y-2">
          <div className="font-medium">Legal</div>
          <nav className="flex flex-col gap-1">
            <Link href="#privacy" className="hover:underline underline-offset-4">Privacy</Link>
            <Link href="#terms" className="hover:underline underline-offset-4">Terms</Link>
          </nav>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-6 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Play Safe. All rights reserved.
      </div>
    </footer>
  );
}


