import { useEffect, useRef } from "react";

import { useAppSelector } from "../../../hooks/redux.ts";
import { RootState } from "../../../store/index.ts";

import Message from "./Message.tsx";

export default function MessageList() {
  const user = useAppSelector((state: RootState) => state.user.list[0]);

  const messages = useAppSelector((state: RootState) => state.chat.messages);

  const containerEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerEndRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <div className="messagelist">
      <section className="messagelist-header">
        {/* {`${user.firstname} ${user.lastname}`} */}
        {`test`}
      </section>
      <section className="messagelist-list">
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        <div ref={containerEndRef}> </div>
      </section>
    </div>
  );
}
