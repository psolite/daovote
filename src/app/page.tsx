import AllPolls from "@/components/AllPolls";
import CreatePoll from "@/components/CreatePoll";
import Hero from "@/components/Hero";
import Vote from "@/components/Vote";
import VoteSummary from "@/components/VoteSummary";
import Image from "next/image";

export default function Home() {
  return (

    <main className="min-h-screen">
      {/* <Hero /> */}
      {/* <CreatePoll /> */}
      {/* <AllPolls /> */}
      <Vote />
      {/* <VoteSummary /> */}
    </main>
  );
}

