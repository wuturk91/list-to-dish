import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky flex items-center justify-between top-0 w-full p-4 bg-[linear-gradient(135deg,_#667eea_0%,_#764ba2_100%)] border-b border-white">
      <Link href="/">
        <h1 className="w-full font-bold text-2xl">List 2 Dish</h1>
      </Link>
      {/* Placeholder for future menu items or navigation */}
      <button>Menu</button>
    </header>
  )
}