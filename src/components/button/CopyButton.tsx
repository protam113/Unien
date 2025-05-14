import { CopyLinkButtonProps } from '@/types/types';
import { toast } from 'sonner';
import { ClipboardCopy } from 'lucide-react'; // icon đẹp

export const CopyLinkButton = ({ url }: CopyLinkButtonProps) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url || window.location.href);
      toast.success('Link copied!');
    } catch {
      toast.error('Cannot copy link!');
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 px-3 py-2  text-gray-600 rounded-xl hover:bg-lime-400 transition"
    >
      <ClipboardCopy size={16} />
      Copy Link
    </button>
  );
};
