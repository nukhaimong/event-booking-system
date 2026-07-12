'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const Unauthorize = ({ message }: { message: string }) => {
  const router = useRouter();
  const toastId = 'jekono';
  toast.error(`${message}.Please login`, { id: toastId });
  router.push('/login');
  return null;
};

export default Unauthorize;
