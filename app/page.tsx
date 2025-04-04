import Link from "next/link";
import ProductCard from "./components/ProductCard";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Image from "next/image";
import coffee from "@/public/images/coffee.jpg";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main>
      {/* <Image src={coffee} alt="coffee" /> */}
      {/* <Image
        // src="https://bit.ly/react-cover"
        src="https://cdn.filestackcontent.com/bLy3JtIoQ8y8PDs4tFem"
        alt="coffee"
        fill
        className="object-cover"
        // style={{ objectFit: "cover" }}
        // width={300}
        // height={170}
      /> */}
      <h1>Hello {session && <span>{session.user?.name}</span>}</h1>
      <Link href="/users">Users</Link>
      <ProductCard />
    </main>
  );
}
