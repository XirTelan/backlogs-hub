import Link from "next/link";

export default function Home() {
  return (
    <main className="flex  min-h-screen flex-col items-center  justify-center">
      <Link href={"/user/test/"}>My Profile</Link>

      <div>
        
      </div>
    </main>
  );
}
