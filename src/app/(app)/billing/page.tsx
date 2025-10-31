import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";

const features = [
    { name: 'User Management', free: true, pro: true, enterprise: true },
    { name: 'API Access', free: true, pro: true, enterprise:true },
    { name: 'Basic Reporting', free: true, pro: true, enterprise: true },
    { name: 'Audit Logs', free: false, pro: true, enterprise: true },
    { name: 'Role-Based Access Control', free: false, pro: true, enterprise: true },
    { name: 'AI Rate Limiter', free: false, pro: false, enterprise: true },
    { name: 'Dedicated Support', free: false, pro: false, enterprise: true },
]

function PlanFeature({ available }: { available: boolean }) {
    return available ? 
        <Check className="mx-auto h-5 w-5 text-green-500" /> : 
        <X className="mx-auto h-5 w-5 text-muted-foreground" />;
}

export default function BillingPage() {
    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Subscription</CardTitle>
                    <CardDescription>Manage your billing and subscription details.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="font-medium">
                            You are currently on the <span className="text-primary">Pro</span> plan.
                        </p>
                        <p className="text-sm text-muted-foreground">Your subscription will renew on July 31, 2024.</p>
                    </div>
                    <Button>Manage Subscription</Button>
                </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <Card className="flex flex-col">
                    <CardHeader className="flex-1">
                        <CardTitle>Free</CardTitle>
                        <CardDescription>For individuals and small teams getting started.</CardDescription>
                        <p className="pt-4 text-3xl font-bold">$0<span className="text-sm font-normal text-muted-foreground">/month</span></p>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline" className="w-full" disabled>Your Current Plan</Button>
                    </CardContent>
                </Card>
                
                <Card className="border-primary flex flex-col ring-2 ring-primary">
                    <CardHeader className="flex-1">
                        <CardTitle>Pro</CardTitle>
                        <CardDescription>For growing businesses that need more power.</CardDescription>
                        <p className="pt-4 text-3xl font-bold">$49<span className="text-sm font-normal text-muted-foreground">/month</span></p>
                    </CardHeader>
                    <CardContent>
                        <Button className="w-full" disabled>Your Current Plan</Button>
                    </CardContent>
                </Card>
                
                <Card className="flex flex-col">
                    <CardHeader className="flex-1">
                        <CardTitle>Enterprise</CardTitle>
                        <CardDescription>For large organizations with custom needs.</CardDescription>
                        <p className="pt-4 text-3xl font-bold">Contact Us</p>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline" className="w-full">Upgrade to Enterprise</Button>
                    </CardContent>
                </Card>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Compare Plans</CardTitle>
                    <CardDescription>Find the right plan for your needs.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="divide-y divide-border">
                        <div className="grid grid-cols-4 gap-4 py-2 font-semibold">
                            <div className="col-span-1">Features</div>
                            <div className="text-center">Free</div>
                            <div className="text-center">Pro</div>
                            <div className="text-center">Enterprise</div>
                        </div>
                        {features.map(feature => (
                            <div key={feature.name} className="grid grid-cols-4 items-center gap-4 py-3">
                                <div className="col-span-1 text-sm">{feature.name}</div>
                                <div className="text-center"><PlanFeature available={feature.free} /></div>
                                <div className="text-center"><PlanFeature available={feature.pro} /></div>
                                <div className="text-center"><PlanFeature available={feature.enterprise} /></div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
