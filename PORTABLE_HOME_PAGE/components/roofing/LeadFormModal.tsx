'use client';

import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
} from '@/components/ui/dialog';
import dynamic from 'next/dynamic';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

const UniversalLeadFormInner = dynamic(() => import('./UniversalLeadFormInner'), {
    ssr: false, // Form logic doesn't need SSR
    loading: () => <div className="min-h-[400px] flex items-center justify-center bg-white rounded-3xl"><div className="w-10 h-10 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin" /></div>
});

interface LeadFormModalProps {
    children: React.ReactNode;
    location?: string;
    inferredGoal?: string;
    showGoal?: boolean;
}

export default function LeadFormModal({ children, location, inferredGoal, showGoal }: LeadFormModalProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="w-[92vw] max-h-[85vh] overflow-y-auto sm:w-full sm:max-h-none sm:overflow-visible max-w-4xl p-0 border-none bg-transparent shadow-none sm:rounded-[2.5rem] rounded-3xl">
                <VisuallyHidden>
                    <DialogTitle>Lead Qualification Form</DialogTitle>
                </VisuallyHidden>
                <div className="bg-transparent pt-4 sm:pt-0">
                    <UniversalLeadFormInner location={location} inferredGoal={inferredGoal} showGoal={showGoal} />
                </div>
            </DialogContent>
        </Dialog>
    );
}
