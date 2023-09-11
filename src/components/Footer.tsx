import { ChatMessageInput } from "./chat/ChatMessageInput"

interface IFooterProps {
  disabled: boolean
  onSendMessage: (message: string) => void
}

export const Footer = ({disabled, onSendMessage }: IFooterProps) => {

  return (
    <footer className="w-full border-t border-t-gray-600 p-2">
      <div className="max-w-4xl m-auto">
        <ChatMessageInput onSend={onSendMessage} disabled={disabled} />
      </div>
    </footer>
  )
}