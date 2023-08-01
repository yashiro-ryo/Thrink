import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'
import { Inter } from 'next/font/google'
import StyledComponentsRegistry from '@/lib/registry'
import { Providers } from '@/redux/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Thrink',
  description: 'Thrink 部活動の地域移行を支援するSNSサイトです。',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </Providers>
      </body>
    </html>
  )
}
