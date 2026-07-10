import { init } from "@nimiq/mini-app-sdk";

let provider = null;

export async function connectWallet() {
  try {
    provider = await init();

    await provider.connect();

    const accounts = await provider.listAccounts();

    if (accounts && accounts.length > 0) {
      return accounts[0];
    }

    return null;

  } catch (err) {
    console.error("Wallet Connection Error:", err);
    return null;
  }
}

export function getProvider() {
  return provider;
}