import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { weddingConfig } from '@/components/demo/boda/data/wedding-config'
import './globals.css'

export const metadata: Metadata = {
  title: weddingConfig.couple.metaTitle,
  description: weddingConfig.couple.metaDescription,
  generator: weddingConfig.couple.metaTitle,
  // Next.js 15 detecta automáticamente favicon.ico, icon.png y apple-icon.png en /app
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script async src="https://www.youtube.com/iframe_api"></script>
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
