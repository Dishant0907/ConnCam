import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";



import { Toaster } from "@/components/ui/toaster"
const inter = Inter({ subsets: ["latin"] });

import "@stream-io/video-react-sdk/dist/css/styles.css";
import 'react-datepicker/dist/react-datepicker.css'

export const metadata = {
  title: "ConnCam App",
  description: "ConnCam ",
};

export default function RootLayout({ children }) {
  return (

    <ClerkProvider
    appearance={{
      layout:{
        // logoImageUrl:'/icons/.svg',
        socialButtonsVariant:'iconButton'

      },
      variables:{
        colorText:'#fff',
        colorPrimary:'#0E78F9',
        colorBackground:'#1c1f2e',
        colorInputBackground:'#252a41',
        colorInputText:'#fff'
      }
    }}>
      <html lang="en">
        <body className={`${inter.className}  bg-[#161925]`}>
          {children}
          <Toaster/>
          </body>
      </html>


    </ClerkProvider>

  );
}
