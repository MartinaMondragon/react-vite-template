import { ErrorBoundary } from "@/components/ErrorBoundary";
import { RootLayout } from "@/components/layout/RootLayout";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { HomePage } from "@/features/home/HomePage";

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <RootLayout>
          <HomePage />
        </RootLayout>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
