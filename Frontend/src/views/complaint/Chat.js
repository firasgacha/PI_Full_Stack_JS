import React, { useEffect, useState } from 'react';
export const Chat = () => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: 'Hello Can I Help You !',
      },]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessages([...messages, { id: 2, text: e.target.elements.message.value }]);
    e.target.elements.message.value = '';
  };
  return (
    <div className="relative p-6 flex-auto">
      <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
        <div>Messages: {messages.map(message => (<div key={message.id}>{message.text}</div>))}
          <form onSubmit={handleSubmit}>
            <input type="text" name="message" />
            <button type="submit">Send</button>
          </form>
        </div>
      </p>
    </div>
  );

}


