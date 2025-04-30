import React, { useEffect, useRef, useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import styles from '@/styles/components/common/Bot.module.scss';

export default function AIChatButton(){
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ 'text': '您好！我是校園大使，有什麼可以幫您的嗎？', 'isBot': true }]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 'behavior': 'smooth' });
    }
  }, [messages, isTyping]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (inputText.trim() === '') {
      return;
    }

    setMessages([...messages, { 'text': inputText, 'isBot': false }]);
    setIsTyping(true);

    setTimeout(() => {
      setMessages(prev => [
        ...prev, {
          'text': `謝謝您的提問！這是關於「${inputText}」的回應。`,
          'isBot': true
        }
      ]);
      setIsTyping(false);
    }, 1000);

    setInputText('');
  };

  return (
    <div className={styles.aichatcontainer}>
      {isOpen && (
        <div className={styles.chatwindow}>
          <div className={styles.chatheader}>
            <h3>AI校園大使</h3>
            <button onClick={toggleChat} className={styles.closebtn}>
              <X size={18} />
            </button>
          </div>

          <div className={styles.chatmessages}>
            <div className={styles.messagescontainer}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`${styles.messagewrapper} ${msg.isBot ? styles.bot : styles.user}`}
                >
                  <div className={`${styles.message} ${msg.isBot ? styles.botmessage : styles.usermessage}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef}></div>
            </div>
            {isTyping && (
              <div className={`${styles.messagewrapper} ${styles.bot}`}>
                <div className={`${styles.message} ${styles.botmessage} ${styles.typing}`}>
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className={styles.chatinput}>
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="請輸入您的問題..."
              className={styles.inputfield}
            />
            <button type="submit" className={styles.sendbtn}>
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      <button onClick={toggleChat} className={styles.chatbutton}>
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
};