import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

export function HomePage() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-12">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Frontend Template</h1>
        <p className="max-w-2xl text-xl text-muted-foreground">
          React + Vite + TypeScript + TailwindCSS + shadcn/ui. Production-ready template with
          testing, linting, and CI/CD.
        </p>
      </div>

      <div className="grid w-full max-w-4xl gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Fast</CardTitle>
            <CardDescription>Powered by Vite</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Lightning-fast HMR and optimised build times.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Type-safe</CardTitle>
            <CardDescription>TypeScript strict mode</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              End-to-end type safety with full TypeScript support.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tested</CardTitle>
            <CardDescription>Vitest + Testing Library</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Unit and component tests with coverage reports.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Interactive Demo</CardTitle>
          <CardDescription>Counter using shadcn/ui components</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <span className="text-6xl font-bold tabular-nums">{count}</span>
        </CardContent>
        <CardFooter className="flex justify-center gap-2">
          <Button variant="outline" onClick={() => setCount((c) => c - 1)}>
            Decrement
          </Button>
          <Button onClick={() => setCount((c) => c + 1)}>Increment</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
