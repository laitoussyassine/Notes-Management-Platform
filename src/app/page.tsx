"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter()
  console.log(router);

  return (
    <main className="min-h-screen">
      <h1>my list of notes</h1>
      <ul>
        <Link href={"/1"}>Note 1</Link>
        <Link href={"/2"}>Note 2</Link>
        <Link href={"/3"}>Note 3</Link>
      </ul>
    </main>
  );
}
