import { auth } from '@/auth';
import { redirect } from "next/navigation"
export default async function RootLayout({ children }) {
  const session = await auth()
  const user = session?.user
  if (!user) redirect('/login')
  return (
    <section  className="w-full h-full">
      {children}
    </section>
 
  );
}
