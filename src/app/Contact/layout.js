'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {Sidebar} from '../../Components/sidebar';

export default function AdminLayout({ children }) {
  const pathname = usePathname()

  

  return (
   
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">{children}</div>
    </div>
  )
}