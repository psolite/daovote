import AllPolls from "@/components/AllPolls";
import CreatePoll from "@/components/CreatePoll";
import Hero from "@/components/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* <Hero /> */}
      {/* <CreatePoll /> */}
      <AllPolls />
    </main>
  );
}

// git push -u origin frontend
