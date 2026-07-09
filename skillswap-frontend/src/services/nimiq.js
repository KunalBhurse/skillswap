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

  } catch (err) {

    console.log("Running outside Nimiq Pay.");

  }

  // Development fallback wallet
  // return "NQ98TESTWALLET987654321"; // for development
  return "NQ12DEVWALLET123456789";

}

export function getProvider() {
  return provider;
}