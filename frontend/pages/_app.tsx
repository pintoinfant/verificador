import "@/styles/globals.css";
import "@/styles/index.scss";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import {
  lightTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { base, polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import ThemeContextWrapper from "@/components/Providers/ThemeContextWrapper";

const navigation = [
  { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
  { name: "Team", href: "#", icon: UsersIcon, current: false },
  { name: "Projects", href: "#", icon: FolderIcon, current: false },
  { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
  { name: "Documents", href: "#", icon: DocumentDuplicateIcon, current: false },
  { name: "Reports", href: "#", icon: ChartPieIcon, current: false },
];
const teams = [
  { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
  { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
  { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function App({ Component, pageProps }: AppProps) {
  const [ready, setReady] = useState(false);

  const deployedChains: any =
    process.env.NEXT_PUBLIC_ENV === "staging" ? [polygonMumbai] : [base];

  const { publicClient, chains } = configureChains(deployedChains, [
    publicProvider(),
  ]);

  const { connectors } = getDefaultWallets({
    appName: "NounerKarma",
    projectId: "032e7d86545e1e9d28e796da73f4f4c1",
    chains,
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>
      {ready ? (
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider
            chains={chains}
            theme={lightTheme({
              accentColor: "#4f46e5",
              accentColorForeground: "white",
              borderRadius: "medium",
            })}
          >
            <ThemeContextWrapper>
              <Component {...pageProps} />
            </ThemeContextWrapper>
          </RainbowKitProvider>
        </WagmiConfig>
      ) : null}
    </>
  );
}
