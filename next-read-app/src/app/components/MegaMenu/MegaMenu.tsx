import Link from "next/link";
import { FC, ReactNode } from "react";

type MenuLink = {
  name: string;
  href: string;
  icon: ReactNode;
  description: string; // Dodano!
};

type MegaMenuProps = {
  isOpen: boolean;
  customWidth?: string;
  onClose?: () => void;
};

const megaMenuLinks: MenuLink[] = [
  {
    name: "Recommended",
    href: "/recommendations",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M8 8h8M8 12h8M8 16h6" strokeLinecap="round" />
      </svg>
    ),
    description: "Books we think you'll like",
  },
  {
    name: "New Releases",
    href: "/new-releases",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <rect x="4" y="6" width="16" height="14" rx="2" />
        <path d="M16 2v4M8 2v4M4 10h16" strokeLinecap="round" />
      </svg>
    ),
    description: "See the latest arrivals.",
  },
  {
    name: "Genres",
    href: "/genres",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path d="M6 4a2 2 0 012-2h8a2 2 0 012 2v16l-7-5-7 5V4z" />
      </svg>
    ),
    description: "Discover books by your favorite genres.",
  },
  {
    name: "Lists",
    href: "/lists",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <circle cx="6" cy="6" r="2" />
        <path d="M10 6h10M6 12a2 2 0 100-4M10 12h10M6 18a2 2 0 100-4M10 18h10" />
      </svg>
    ),
    description: "Curated book lists for every mood.",
  },
];

const genres: string[] = [
  "Fiction",
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Romance",
  "Thriller",
  "Non-fiction",
  "Biography",
];

const MegaMenu: FC<MegaMenuProps> = ({ isOpen, customWidth, onClose }) => {
  if (!isOpen) return null;

  const baseWidth =
    customWidth ??
    "w-[90vw] max-w-[360px] sm:max-w-[420px] md:max-w-[600px]";

  return (
    <div
      className={`absolute left-1/2 -translate-x-1/2 top-12 ${baseWidth} bg-white shadow-lg border border-gray-300 z-10 rounded-lg transition-all`}
      style={{ minWidth: "220px" }}
    >
      {/* Strelica */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 pointer-events-none">
        <svg width="28" height="14" viewBox="0 0 28 14">
          <polygon
            points="14,0 28,14 0,14"
            fill="white"
            stroke="#d1d5db"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="flex flex-col sm:flex-row sm:gap-0 relative">
        {/* Lijeva kolona */}
    <div className="bg-[#F9F3EE] w-full sm:w-2/5 lg:w-[45%] rounded-l-lg flex-shrink-0 sm:border-r border-gray-200 px-5 py-5 mb-4 sm:mb-0">
  <h4 className="font-semibold text-base sm:text-lg mb-4 text-[#593E2E]">Browse</h4>
  <ul className="space-y-2 sm:space-y-4">
    {megaMenuLinks.map((link) => (
      <li
        key={link.href}
        onClick={() => onClose?.()}
        className="group flex items-start rounded-md cursor-pointer hover:bg-white transition-colors"
      >
        {/* Ikona */}
        <span className="flex items-center justify-center w-9 h-9 mr-3 mt-1 rounded-full bg-white border border-[#e1d6ce] group-hover:bg-[#593E2E] group-hover:border-[#593E2E] transition-colors duration-200">
          <span className="text-[#593E2E] group-hover:text-white transition-colors duration-200">
            {link.icon}
          </span>
        </span>
        <div className="flex-1 min-w-0">
          <Link href={link.href}>
            <span className="block text-sm sm:text-base font-medium text-gray-800 group-hover:text-[#593E2E] transition-colors">
              {link.name}
            </span>
          </Link>
          <div className="text-xs text-gray-500 mt-0.5 sm:mt-1">{link.description}</div>
        </div>
      </li>
    ))}
  </ul>
</div>


        {/* Desna kolona */}
        <div className="flex-1 px-5 py-5">
          <h4 className="font-semibold text-base sm:text-lg mb-4 text-[#593E2E]">
            Popular genres
          </h4>
          <div className="grid grid-cols-2 gap-x-2 gap-y-2">
            {genres.map((genre) => (
              <Link
                key={genre}
                href={`/genres/${genre.toLowerCase()}`}
                onClick={() => onClose?.()}
                className="text-gray-700 text-sm sm:text-base hover:text-[#593E2E] py-1"
              >
                {genre}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
