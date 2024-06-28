import ContactList from "./Structure/ContactList.tsx";
import MessageList from "./Structure/MessageList.tsx";
import Form from "./Structure/Form.tsx";

import "./Messages.scss";

export default function Messages() {
  return (
    <div className="chat__container">
      <h1>Mes messages</h1>
      <div className="chat">
        <section className="chat-lists">
          <ContactList />
          <MessageList />
        </section>
        <Form />
      </div>
    </div>
  );
}
