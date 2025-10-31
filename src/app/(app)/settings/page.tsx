import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SettingsPage() {
    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Company Profile</CardTitle>
                    <CardDescription>Update your company's profile information.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Company Name</Label>
                            <Input id="name" defaultValue="Acme Inc." />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="domain">Domain</Label>
                            <Input id="domain" defaultValue="acme.com" />
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>Save</Button>
                </CardFooter>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>API Keys</CardTitle>
                    <CardDescription>Manage API keys for your applications.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <Label htmlFor="api-key" className="sr-only">API Key</Label>
                        <div className="flex items-center gap-2">
                            <Input id="api-key" readOnly value="acme_prod_******************************" />
                            <Button variant="secondary">Copy</Button>
                            <Button variant="outline">Revoke</Button>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>Generate New Key</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
