import { ThemeProvider } from "next-themes";

interface ProvidersProps {
  children: Readonly<React.ReactNode>;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider enableSystem attribute="class" defaultTheme="dark">
      {children}
    </ThemeProvider>
  );
}
