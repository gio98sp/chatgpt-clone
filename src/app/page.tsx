'use client';

import { Sidebar } from '@/components/Sidebar';
import { useState } from 'react';

export default function Home() {
  const [openSidebar, setOpenSidebar] = useState(false);

  const closeSidebar = () => {
    setOpenSidebar(false);
  };

  const handleClearConversations = () => {};

  const handleNewChat = () => {};

  return (
    <main className="flex min-h-screen bg-gpt-gray">
      <Sidebar
        open={openSidebar}
        onClose={closeSidebar}
        onClear={handleClearConversations}
        onNewChat={handleNewChat}
      >
        <div className='h-screen'>...</div>
      </Sidebar>

      <section className="flex flex-col w-full">
        <button onClick={() => setOpenSidebar(true)}>abrir sidebar</button>
      </section>
    </main>
  );
}
