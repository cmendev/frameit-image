import Image from "next/image";

export default function NavBar() {

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Image src="/me.webp" width={44} height={44} alt="me icon" />
      <a href="/" className="text-xl font-bold">ImageTools</a>
    </nav>
  );
}