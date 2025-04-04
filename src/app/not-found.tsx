import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center h-screen flex-col gap-2">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <p>chaj da link pao</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
