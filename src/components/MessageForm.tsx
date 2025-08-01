import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const MessageForm = () => {
  const [message, setMessage] = useState("");
  const [delay, setDelay] = useState<number>(10);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [sentMessage, setSentMessage] = useState<string>("");

  const handleCancel = () => {
    if (timerId) {
      clearTimeout(timerId);
      setIsSending(false);
    }
  };

  const handleSend = () => {
    setIsSending(true);

    const id = setTimeout(() => {
      setSentMessage(message);
      setIsSending(false);
      setMessage("");
    }, delay * 1000);
    setTimerId(id);
  };
  return (
    <div className="flex flex-col items-center justify-center p-4  bg-blue-200 rounded-lg shadow-md mt-20 p-6 border-2 border-black">
      <h2 className="text-2xl font-bold text-gray-800">Dm Delay Button</h2>

      <Textarea
        className="mt-4 w-full max-w-md border-black rounded-lg p-2"
        placeholder="Type your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Input
        type="number"
        className="mt-4 w-full max-w-md border-black rounded-lg p-2"
        placeholder="delay in seconds"
        value={delay}
        onChange={(e) => setDelay(Number(e.target.value))}
        disabled={isSending}
      />
      {!isSending ? (
        <Button className="mt-4 w-full" onClick={handleSend}>
          Send with Delay
        </Button>
      ) : (
        <Button
          className="mt-4 w-full "
          variant="destructive"
          onClick={handleCancel}
        >
          Cancel Sending
        </Button>
      )}
      {sentMessage && (
        <div className="mt-4 p-3 bg-green-100 text-green-900">
          Message sent: {sentMessage}
        </div>
      )}
    </div>
  );
};

export default MessageForm;
