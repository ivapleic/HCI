"use client";

import { useRouter } from "next/navigation";

export default function BookPage() {
  const router = useRouter();
  const { id } = router.query; // Pristup id-u iz URL-a

  return (
    <div>
      <h1>Detalji knjige</h1>
      <p>ID knjige: {id}</p>
    </div>
  );
}
