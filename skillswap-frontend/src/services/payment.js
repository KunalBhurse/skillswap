import { getProvider } from "./nimiq";
import toast from "react-hot-toast";

export async function payFreelancer(recipient, amount) {
  try {
    // DEVELOPMENT MODE
    if (window.location.hostname === "localhost") {
      toast.success("🧪 Development Mode: Payment Simulated");
      console.log("Simulated Payment");
      return true;
    }

    const provider = getProvider();

    if (!provider) {
      toast.error("Please open SkillSwap inside Nimiq Pay.");
      return false;
    }

    const result = await provider.sendBasicTransaction({
      recipient,
      value: Number(amount) * 100000,
    });

    console.log("Payment Success:", result);

    toast.success("Payment Successful 🎉");

    return true;

  } catch (err) {
    console.error(err);
    toast.error("Payment Failed");
    return false;
  }
}