import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";

const ProfileIcon = () => {
  const { user } = useAuth();

  // Ako korisnik nije učitan, možeš vratiti null ili neku zamjensku vrijednost
  if (!user || !user.id) return null;

  return (
    <Link
      href={`/profile/${user.id}`}
      className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#593E2E] flex items-center justify-center bg-[#E8DFD7]"
    >
      <span className="text-[#593E2E] font-bold">
        {user.fullName
          ? user.fullName
              .split(" ")
              .map((w) => w[0])
              .join("")
              .toUpperCase()
          : "?"}
      </span>
    </Link>
  );
};

export default ProfileIcon;
