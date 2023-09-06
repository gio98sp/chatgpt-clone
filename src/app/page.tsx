'use client';

import { useState, useEffect } from 'react';

import { ChatArea } from '@/components/ChatArea';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';

import { Chat } from '@/types/Chat';
import { Footer } from '@/components/Footer';

import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [chatActiveId, setChatActiveId] = useState<string>('');
  const [chatActive, setChatActive] = useState<Chat>();
  const [aiLoading, setAILoading] = useState(false);

  useEffect(() => {
    setChatActive(chatList.find((item) => item.id === chatActiveId));
  }, [chatActiveId, chatList]);

  useEffect(() => {
    if(aiLoading) getAiResponse()
  }, [aiLoading])

  const getAiResponse = () => {
    setTimeout(() => {
      let chatListClone = [...chatList];

      let chatIndex = chatListClone.findIndex((item) => item.id === chatActiveId);

      if(chatIndex > -1) {
        chatListClone[chatIndex].messages.push({
          id: uuidv4(),
          author: 'ai',
          body: 'Aqui vai a resposta da AI',
        });
      }

      setChatList(chatListClone)
      setAILoading(false)
    }, 2000)
  }

  const handleOpenSidebar = () => {
    setOpenSidebar(true);
  };

  const handleCloseSidebar = () => {
    setOpenSidebar(false);
  };

  const handleClearConversations = () => {
    if (aiLoading) return;

    setChatActiveId('');
    setChatList([]);
  };

  const handleNewChat = () => {
    if (aiLoading) return;

    setChatActiveId('');
    handleCloseSidebar();
  };

  const handleSendMessage = (message: string) => {
    if (!chatActiveId) {
      let newChatId = uuidv4();

      setChatList([
        {
          id: newChatId,
          title: message,
          messages: [{ id: uuidv4(), author: 'me', body: message }],
        },
        ...chatList,
      ]);

      setChatActiveId(newChatId);
    } else {
      let chatListClone = [...chatList];

      let chatIndex = chatListClone.findIndex((item) => item.id === chatActiveId);

      chatListClone[chatIndex].messages.push({
        id: uuidv4(),
        author: 'me',
        body: message,
      });

      setChatList(chatListClone);
    }

    setAILoading(true);
  };

  return (
    <main className="flex min-h-screen bg-gpt-gray">
      <Sidebar
        open={openSidebar}
        onClose={handleCloseSidebar}
        onClear={handleClearConversations}
        onNewChat={handleNewChat}
      >
        <div>...</div>
      </Sidebar>

      <section className="flex flex-col w-full">
        <Header
          openSidebarClick={handleOpenSidebar}
          title={chatActive ? chatActive.title : 'Nova conversa'}
          newChatClick={handleNewChat}
        />

        <ChatArea chat={chatActive} loading={aiLoading} />

        <Footer onSendMessage={handleSendMessage} disabled={aiLoading} />
      </section>
    </main>
  );
}
