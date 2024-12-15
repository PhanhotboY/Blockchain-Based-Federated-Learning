export const jsonRpcProviderConfig: Record<string, { url: string; chainId: number }> = {
  development: {
    url: "http://127.0.0.1:8545/",
    chainId: 1337,
  },
  production: {
    url: process.env.VITE_JSON_RPC_URL || "http://localhost:8545",
    chainId: Number(process.env.VITE_CHAIN_ID) || 1337,
  },
};
