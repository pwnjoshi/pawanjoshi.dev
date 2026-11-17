import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
      <p className="text-xs font-mono text-neutral-700 mb-4">404</p>
      <h1 className="text-3xl font-medium text-neutral-100 tracking-tight mb-4">
        Page not found
      </h1>
      <p className="text-neutral-600 mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
      >
        ← Back home
      </Link>
    </div>
  );
}
