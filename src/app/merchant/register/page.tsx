'use client'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import React from 'react'

function MerchantRegister() {
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Register as a Merchant</CardTitle>
                    <CardDescription>
                        Enter your details to register as merchant.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="full-name">Full Name</Label>
                        <Input id="full-name" type="" placeholder="Chris Emma" required />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com" required />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="bank-name">Bank name</Label>
                        <Input id="bank-name" type="" placeholder="UBA" required />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="bank-account-number">Bank account number</Label>
                        <Input id="bank-account-number" type="number" placeholder="12345678901" required />
                    </div>


                </CardContent>
                <CardFooter>
                    <Button className="w-full">Sign in</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default MerchantRegister
