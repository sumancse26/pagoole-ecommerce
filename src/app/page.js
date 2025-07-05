'use client';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();
    return (
        <button
            onClick={() => router.push('/dashboard')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Go to Dashboard
        </button>
    );
}
