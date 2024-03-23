"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useForm } from "react-hook-form";
import { Connect } from "@stacks/connect-react";

import ConnectWallet, { userSession } from "../../components/ConnectWallet";
import ContractCallVote from "../../components/ContractCallVote";
import { Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
{/* <ConnectWallet /> */ }
function Navbar() {
    return (
        <div className="flex justify-between items-center p-4 bg-slate-800 text-white">

            <div className="flex items-center">
                <Image src="/path/to/logo.png" alt="Logo" width={50} height={50} />
            </div>

            <div className="flex items-center">
                <Button variant="ghost">
                    <Bell className="h-5 w-5" />
                </Button>
                <ConnectWallet />
            </div>
        </div>
    );
}

function ExchangeRequestForm() {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
        // Handle exchange request submission here
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input placeholder="Amount STX" {...register("amountSTX")} />
            <Input placeholder="Account Number" {...register("accountNumber")} />
            <Input placeholder="Account Name" {...register("accountName")} />
            <Input placeholder="Bank Name" {...register("bankName")} />
            <Button type="submit">Request Exchange</Button>
        </form>
    );
}
export default function Home() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    return (
        <Connect
            authOptions={{
                appDetails: {
                    name: "EscrowX",
                    icon: window.location.origin + "/logo.png",
                },
                redirectTo: "/",
                onFinish: () => {
                    window.location.reload();
                },
                userSession,
            }}
        >
            <div>
                <Navbar />
                <div className="max-w-4xl mx-auto p-8">
                    <h2 className="text-2xl font-bold mb-4">Exchange Request</h2>
                    <ExchangeRequestForm />
                </div>
            </div>
        </Connect>
    );
}
