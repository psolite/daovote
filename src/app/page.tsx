import AllPolls from "@/components/AllPolls";
import CreatePoll from "@/components/CreatePoll";
import Hero from "@/components/Hero";
import Vote from "@/components/Vote";
import VotedCard from "@/components/VotedCard";
import VoteSummary from "@/components/VoteSummary";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* <Hero /> */}
      {/* <CreatePoll /> */}
      <AllPolls />
      {/* <Vote /> */}
      {/* <VoteSummary /> */}
      {/* <VotedCard /> */}
    </main>
  );
}

// git push -u origin frontend