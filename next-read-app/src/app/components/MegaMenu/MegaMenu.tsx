import Link from "next/link";

type MegaMenuProps = {
  isOpen: boolean;
  customWidth?: string;
};

const megaMenuLinks = [
  { name: "Recommended", href: "/" },
  { name: "New Releases", href: "/" },
  { name: "Genres", href: "/genres" },
  { name: "Lists", href: "/lists" },
];

const genres = [
  "Fiction",
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Romance",
  "Thriller",
  "Non-fiction",
  "Biography",
  "Historical",
  "Young Adult",
];

const MegaMenu = ({ isOpen, customWidth }: MegaMenuProps) => {
  if (!isOpen) return null;

  return (
    <div
      className={`absolute top-12 left-0 ${customWidth} bg-white shadow-lg border border-gray-300 z-10 p-6 rounded-lg`}
    >
      <div className="flex justify-between ">
        {/* Left column: Mega menu links */}
        <div className="space-y-8 pr-8 mr-10 border-r border-black">
          <h4 className="font-semibold text-lg text-gray-800">Browse</h4>
          <ul className="space-y-6">
            {megaMenuLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>
                  <span className="text-gray-800">{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

    
        {/* Right column: Genres (in 3 columns, each containing 5 items) */}
        <div className="flex-1 space-y-8">
          <h4 className="font-semibold text-lg text-gray-800">Popular genres</h4>
          <div className="grid grid-cols-3 w-full gap-4">
            {genres.slice(0, 15).map((genre, index) => (
              <div key={index}>
                    <span className="text-gray-800 w-40">{genre}</span>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
