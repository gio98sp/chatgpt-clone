import { ReactNode } from 'react';

interface ISidebarButtonProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

export const SidebarButton = ({ icon, label, onClick }: ISidebarButtonProps) => {
  return (
    <div
      className="flex items-center p-3 rounded-md text-sm cursor-pointer hover:bg-gray-500/20"
      onClick={onClick}
    >
      <div className="mr-3">{icon}</div>

      <div className="flex-1 truncate">{label}</div>

    </div>
  );
};
