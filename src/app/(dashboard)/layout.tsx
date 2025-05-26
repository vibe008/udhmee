'use client';
import LayoutWrapper from '@/components/layout/LayoutWrapper';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-full'>
      <LayoutWrapper>{children}</LayoutWrapper>
    </div>
  )
}