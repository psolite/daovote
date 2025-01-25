import { Connection } from "@solana/web3.js";

const network = process.env.NEXT_PUBLIC_SOLANA_RPC2 || "https://api.devnet.solana.com";
export const connection = new Connection(network, 'confirmed');