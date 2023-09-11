'use client';

import { useState, useEffect } from 'react';

import { Chat } from '@/types/Chat';

import { openai } from '@/service/openai';

import { v4 as uuidv4 } from 'uuid';

import { ChatArea } from '@/components/chat/ChatArea';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { SidebarChatButton } from '@/components/sidebar/SidebarChatButton';
import { Footer } from '@/components/Footer';

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
    if (aiLoading) getAiResponse();
  }, [aiLoading]);

  const getAiResponse = async () => {
    let chatListClone = [...chatList];
    let chatIndex = chatListClone.findIndex((item) => item.id === chatActiveId);

    if (chatIndex > -1) {
      const tranlated = openai.translateMessages(chatListClone[chatIndex].messages);
      const response = await openai.generate(tranlated);

      if (response) {
        chatListClone[chatIndex].messages.push({
          id: uuidv4(),
          author: 'ai',
          body: response,
        });
      }
    }
    setChatList(chatListClone);
    setAILoading(false);
  };

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

  const handleSelectChat = (id: string) => {
    if (aiLoading) return;
    let item = chatList.find((item) => item.id === id);
    if (item) setChatActiveId(item.id);
    handleCloseSidebar();
  };

  const handleDeleteChat = (id: string) => {
      let chatListClone = [...chatList];
      let chatIndex = chatListClone.findIndex((item) => item.id === id);
      chatListClone.splice(chatIndex, 1);
      setChatList(chatListClone);
      setChatActiveId('');
  };

  const handleEditChat = (id: string, newTitle: string) => {
    if (newTitle) {
      let chatListClone = [...chatList];
      let chatIndex = chatListClone.findIndex((item) => item.id === id);
      chatListClone[chatIndex].title = newTitle;
      setChatList(chatListClone);
    }
  };

  return (
    <main className="flex min-h-screen bg-gpt-gray">
      <Sidebar
        open={openSidebar}
        onClose={handleCloseSidebar}
        onClear={handleClearConversations}
        onNewChat={handleNewChat}
      >
        {chatList.map((item) => (
          <SidebarChatButton
            key={item.id}
            chatItem={item}
            active={item.id === chatActiveId}
            onClick={handleSelectChat}
            onDelete={handleDeleteChat}
            onEdit={handleEditChat}
          />
        ))}
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
