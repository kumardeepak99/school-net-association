import Link from "next/link";
import { HeaderConstants } from "../constants/Header";

export default function Header() {
  return (
    <header className="bg-blue-500 py-4 px-8 flex justify-between items-center">
      <h1 className="text-white text-lg font-semibold">{HeaderConstants.title}</h1>

      <Link className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700" href="/create">
        {HeaderConstants.createNew}
      </Link>
    </header>
  );
}
