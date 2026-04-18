import { Connection } from "@solana/web3.js";

const network = process.env.NEXT_PUBLIC_SOLANA_RPC || '';
export const connection = new Connection(network, 'confirmed');