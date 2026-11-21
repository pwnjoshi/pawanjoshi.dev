import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="relative overflow-hidden">
      <div className="aurora aurora-fade" aria-hidden="true"><span /><span /><span /></div>
      <div className="container-x relative flex min-h-[70svh] flex-col items-start justify-center py-16 md:items-center md:text-center">
        <p className="text-[5.5rem] font-medium leading-none tracking-tighter text-fg/15 md:text-[10rem]">404</p>
        <h1 className="mt-2 text-[2.125rem] font-semibold leading-tight text-fg md:text-6xl md:font-medium" style={{ letterSpacing: "-0.035em" }}>
          Page not found
        </h1>
        <p className="mt-3 max-w-md text-[15px] text-subtle md:text-lg">The page you&apos;re looking for may have moved or never existed.</p>
        <div className="mt-8 flex w-full gap-2.5 md:w-auto">
          <Link href="/" className="btn btn-primary !min-h-12 flex-1 !rounded-full px-6 md:flex-none">
            <ArrowLeft size={16} /> Back home
          </Link>
          <Link href="/work" className="btn btn-secondary glass !min-h-12 !rounded-full px-6">
            View work
          </Link>
        </div>
      </div>
    </div>
  );
}
