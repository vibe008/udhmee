'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
    const pathname = usePathname();
    const pathSegments = pathname.split('/').filter(segment => segment);

    const crumbs = pathSegments.map((segment, index) => {
        const href = '/' + pathSegments.slice(0, index + 1).join('/');
        const label = segment.charAt(0).toUpperCase() + segment.slice(1);
        const isLast = index === pathSegments.length - 1;

        return (
            <span key={href} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                {!isLast ? (
                    <>
                        <Link href={href} className="hover:underline text-blue-600 dark:text-blue-400">
                            {label}
                        </Link>
                        <span className="mx-2">/</span>
                    </>
                ) : (
                    <span className="font-medium">{label}</span>
                )}
            </span>
        );
    });

    return (
        <nav className="w-[30%] px-6 py-3 bg-gray-100 dark:bg-gray-800 rounded-md">
            <div className="text-sm flex gap-1">
                <Link href="/" className="hover:underline text-blue-600 dark:text-blue-400">Home</Link>
                {pathSegments.length > 0 && <span className="mx-2">/</span>}
                {crumbs}
            </div>
        </nav>
    );
}
