import { ChatPlaceholder } from "./ChatPlaceholder"
import { ChatMessageItem } from "./ChatMessageItem"
import { ChatMessageLoading } from "./ChatMessageLoading"

import { Chat } from "@/types/Chat"

interface IChatAreaProps {
  chat: Chat | undefined
  loading: boolean
}

export const ChatArea = ({chat, loading}: IChatAreaProps) => {

  return (
    <section className="flex-auto h-0 overflow-y-scroll">
      {!chat && <ChatPlaceholder />}

      {chat && chat.messages.map(item => (
        <ChatMessageItem key={item.id} item={item} />
      ))}

      {loading && <ChatMessageLoading />}
    </section>
  )
}