"use client";

import React, { useEffect, useState } from "react";
import { AppConfig, showConnect, UserSession } from "@stacks/connect";
import { Button } from "./ui/button";
import { Bell } from "lucide-react";
import Image from "next/image";

const appConfig = new AppConfig(["store_write", "publish_data"]);

export const userSession = new UserSession({ appConfig });

function authenticate() {
  showConnect({
    appDetails: {
      name: "Stacks Next.js Starter",
      icon: window.location.origin + "/logo512.png",
    },
    redirectTo: "/",
    onFinish: () => {
      window.location.reload();
    },
    userSession,
  });
}

function disconnect() {
  userSession.signUserOut("/");
}

const ConnectWallet = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const walletInfo = mounted && userSession.isUserSignedIn() ? (
    <>
      <Button variant="destructive" color="red" className="mr-4" onClick={disconnect}>
        Disconnect Wallet
      </Button>
      <div className="text-sm">
        <p>Mainnet: <span className="font-semibold">{userSession.loadUserData().profile.stxAddress.mainnet}</span></p>
        <p>Testnet: <span className="font-semibold">{userSession.loadUserData().profile.stxAddress.testnet}</span></p>
      </div>
    </>
  ) : (
    <Button variant="default" color="blue" onClick={authenticate}>
      Connect Wallet
    </Button>
  );

  return (
    <div className="flex justify-between items-center bg-slate-800 p-4">

      <div className="flex items-center">
        <Button variant="ghost" className="mr-4">
        </Button>
        {walletInfo}
      </div>
    </div>
  );
};

export default ConnectWallet;
