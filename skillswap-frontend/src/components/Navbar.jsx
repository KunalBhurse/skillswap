import { useState } from "react";
import {
  useNavigate,
  Link,
  useLocation,
} from "react-router-dom";
import { Menu, X } from "lucide-react";
import { connectWallet } from "../services/nimiq";
import { useWallet } from "../context/WalletContext";
import toast from "react-hot-toast";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const closeMenu = () => {
    setMenuOpen(false);
  };
  const {
    walletAddress,
    setWalletAddress,
  } = useWallet();

  const handleConnect = async () => {

    try {
      setConnecting(true);

      const address = await connectWallet();

      if (address) {
        setWalletAddress(address);
        toast.success("Wallet Connected!");
      } else {
        toast.error("Please open SkillSwap inside Nimiq Pay.");
      }
    } finally {
      setConnecting(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#040B23]/95 backdrop-blur-md border-b border-[#1D2D5C]">

      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">

        {/* Logo */}

        <div
          className="cursor-pointer"
          onClick={() => {
            navigate("/");
            closeMenu();
          }}
        >
          <h1 className="text-3xl font-extrabold tracking-tight text-[#F6D66E]">
            SkillSwap
          </h1>

          <p className="text-xs text-gray-400">
            Powered by Nimiq
          </p>
        </div>

        {/* Desktop Menu */}

        <div className="hidden lg:flex items-center gap-3">

          <button
            onClick={() => {
              if (location.pathname === "/") {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              } else {
                navigate("/");
              }
            }}
            className="bg-[#13214A] hover:bg-[#1D2D5C] px-4 py-2 rounded-xl transition"
          >
            Home
          </button>

          <button
            onClick={() => navigate("/my-tasks")}
            className="bg-[#13214A] hover:bg-[#1D2D5C] px-4 py-2 rounded-xl transition"
          >
            My Tasks
          </button>

          <Link to="/my-applications">
            <button className="bg-[#13214A] hover:bg-[#1D2D5C] px-4 py-2 rounded-xl transition">
              My Applications
            </button>
          </Link>

          <button
            onClick={() => navigate("/create-task")}
            className="bg-[#F6D66E] text-black px-4 py-2 rounded-xl font-semibold hover:scale-105 transition"
          >
            + Post Task
          </button>

          <button
            onClick={handleConnect}
            disabled={connecting}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {connecting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Connecting...
              </div>
            ) : (
              walletAddress
                ? `${walletAddress.slice(0, 8)}...${walletAddress.slice(-4)}`
                : "Connect Wallet"
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-white"
        >
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

      </div>

      {/* Mobile Menu */}

      {menuOpen && (

        <div className="lg:hidden bg-[#0A1638] border-t border-[#1D2D5C] px-5 py-5 flex flex-col gap-4">

          <button
            onClick={() => {
              navigate("/");
              closeMenu();
            }}
            className="text-left bg-[#13214A] px-4 py-3 rounded-xl"
          >
            🏠 Home
          </button>

          <button
            onClick={() => {
              navigate("/my-tasks");
              closeMenu();
            }}
            className="text-left bg-[#13214A] px-4 py-3 rounded-xl"
          >
            📋 My Tasks
          </button>

          <button
            onClick={() => {
              navigate("/my-applications");
              closeMenu();
            }}
            className="text-left bg-[#13214A] px-4 py-3 rounded-xl"
          >
            📄 My Applications
          </button>

          <button
            onClick={() => {
              navigate("/create-task");
              closeMenu();
            }}
            className="bg-[#F6D66E] text-black py-3 rounded-xl font-bold"
          >
            + Post Task
          </button>

          <button
            onClick={handleConnect}
            className="bg-green-600 py-3 rounded-xl font-semibold"
          >
            {walletAddress
              ? `${walletAddress.slice(0, 8)}...${walletAddress.slice(-4)}`
              : "Connect Wallet"}
          </button>

        </div>

      )}

    </nav>
  );
}