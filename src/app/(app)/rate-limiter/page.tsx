'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Bot, Loader2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useState, useTransition } from "react";
import { getAdjustedRateLimit } from "./actions";
import type { AdjustRateLimitOutput } from "@/ai/flows/dynamic-rate-limit-adjustment";

const formSchema = z.object({
  subscriptionPlan: z.enum(['free', 'pro', 'enterprise']),
  usagePatterns: z.string().min(20, {
    message: "Usage patterns must be at least 20 characters.",
  }).max(500, { message: "Usage patterns cannot exceed 500 characters."}),
  systemLoad: z.number().min(0).max(100),
});

type FormValues = z.infer<typeof formSchema>;

export default function RateLimiterPage() {
    const [isPending, startTransition] = useTransition();
    const [result, setResult] = useState<AdjustRateLimitOutput | null>(null);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            subscriptionPlan: "pro",
            usagePatterns: "High volume of read operations during business hours, with occasional spikes in write operations. Minimal activity overnight.",
            systemLoad: 50,
        },
    });

    function onSubmit(values: FormValues) {
        setResult(null);
        setError(null);
        startTransition(async () => {
            const response = await getAdjustedRateLimit({
                ...values,
                systemLoad: `${values.systemLoad}%`
            });
            if (response.success && response.data) {
                setResult(response.data);
            } else {
                setError(response.error || 'Failed to get adjustment.');
            }
        });
    }

    return (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <Card>
                            <CardHeader>
                                <CardTitle>AI Rate Limiter</CardTitle>
                                <CardDescription>
                                    Dynamically adjust API rate limits based on subscription, usage, and system load. This feature is exclusive to Enterprise plans.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="subscriptionPlan"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Subscription Plan</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a plan" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="free">Free</SelectItem>
                                                    <SelectItem value="pro">Pro</SelectItem>
                                                    <SelectItem value="enterprise">Enterprise</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="usagePatterns"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Usage Patterns</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Describe recent API usage patterns for the tenant..."
                                                    rows={5}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="systemLoad"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Current System Load: {field.value}%</FormLabel>
                                            <FormControl>
                                                <Slider
                                                    defaultValue={[field.value]}
                                                    onValueChange={(value) => field.onChange(value[0])}
                                                    max={100}
                                                    step={1}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                            <CardFooter className="border-t px-6 py-4">
                                <Button type="submit" disabled={isPending}>
                                    {isPending ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Analyzing...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="mr-2 h-4 w-4" />
                                            Adjust Rate Limit
                                        </>
                                    )}
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </Form>
            </div>

            <div className="space-y-6">
                 <Card className="bg-secondary/50 border-dashed">
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                         <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <Bot className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                            <CardTitle>How it Works</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Our AI model analyzes the tenant data against real-time performance metrics to suggest a new API rate limit that balances fair resource allocation with tenant needs.
                        </p>
                    </CardContent>
                </Card>
                
                {(isPending || result || error) && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Adjustment Result</CardTitle>
                        </CardHeader>
                        <CardContent className="flex min-h-[240px] items-center justify-center">
                            {isPending && <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />}
                            {error && <p className="text-destructive text-center">{error}</p>}
                            {result && (
                                <div className="space-y-4 text-center">
                                    <p className="text-sm font-semibold text-muted-foreground">New Rate Limit (RPM)</p>
                                    <p className="text-5xl font-bold text-primary">{result.newRateLimit}</p>
                                    <p className="text-sm text-muted-foreground">{result.reason}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
