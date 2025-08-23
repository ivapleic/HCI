import Link from "next/link";
import { getUserById } from "../_lib/UserApi";

export default async function ProfilePage({
  params,
}: {
  params: { userId: string };
}) {
  const user = await getUserById(params.userId);

  if (!user) {
    return <div className="p-8 text-red-600">User not found.</div>;
  }

  // Get profile picture URL if exists
  const profilePicUrl = user.fields.profilePicture?.fields?.file?.url
    ? `https:${user.fields.profilePicture.fields.file.url}`
    : null;

  return (
    <div className="p-8 flex justify-center bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full px-10 py-12">
        {/* Heading above everything, inside white div */}
        <h1 className="text-4xl font-extrabold mb-10 text-[#593E2E] text-start">
          Your Profile
        </h1>

        {/* Content below heading: layout with image left and info right */}
        <div className="flex items-start">
          {/* Left: Profile picture */}
          <div className="flex-shrink-0 mr-10">
            {profilePicUrl ? (
              <img
                src={profilePicUrl}
                alt="Profile picture"
                width={160}
                height={160}
                className="rounded-md object-cover"
              />
            ) : (
              <div className="w-40 h-40 bg-gray-300 rounded-md flex items-center justify-center text-6xl font-bold text-gray-600">
                {user.fields.fullName
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .toUpperCase()}
              </div>
            )}
          </div>

          {/* Right: Name and details */}
          <div className="flex flex-col flex-grow">
            <h2 className="text-3xl font-bold mb-6">{user.fields.fullName}</h2>

            <p className="text-gray-700 mb-2">
              <strong>Email:</strong> {user.fields.email}
            </p>

            <p className="text-gray-700 mb-4">
              <strong>Account Status:</strong>{" "}
              {user.fields.accountStatus ? "Active" : "Inactive"}
            </p>

            <p className="text-gray-700 mb-6">
              <strong>Joined on:</strong>{" "}
              {new Date(user.fields.joinedDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            {/* Favorite Genres with links in lowercase */}
            {user.fields.favoriteGenres && user.fields.favoriteGenres.length > 0 && (
              <div className="mb-6">
                <strong className="block mb-2 text-gray-900">Favorite Genres:</strong>
                <div className="flex flex-wrap gap-3">
                  {user.fields.favoriteGenres.map((genre: any) => {
                    const genreTitle = genre.fields?.title || genre.fields?.name || "genre";
                    const genreIdOrSlug = genreTitle.toLowerCase().replace(/\s+/g, "-");
                    return (
                      <Link
                        key={genre.sys?.id || genreTitle}
                        href={`/genres/${genreIdOrSlug}`}
                        className="text-[#593E2E] px-3 py-1 bg-[#E8DFD7] rounded-full font-medium hover:bg-[#cdbda7] transition lowercase"
                      >
                        {genreTitle.toLowerCase()}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Bio */}
            {user.fields.bio && (
              <div className="whitespace-pre-line text-gray-800">
                <strong>About Me:</strong>
                <p className="mt-2">{user.fields.bio}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
