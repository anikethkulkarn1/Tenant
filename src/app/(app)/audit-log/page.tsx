import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { auditLogs } from "@/lib/data";

export default function AuditLogPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Audit Log</CardTitle>
                <CardDescription>
                    Review a log of all user activities within your tenant. This feature is exclusive to Pro and Enterprise plans.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead className="hidden md:table-cell">Action</TableHead>
                            <TableHead className="hidden lg:table-cell">IP Address</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {auditLogs.map((log) => (
                            <TableRow key={log.id}>
                                <TableCell>
                                    <div className="font-medium">{log.user}</div>
                                    <div className="text-sm text-muted-foreground">{log.email}</div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">{log.action}</TableCell>
                                <TableCell className="hidden lg:table-cell">{log.ip}</TableCell>
                                <TableCell>{log.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
