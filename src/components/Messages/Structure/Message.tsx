import { IMessage } from "../../../types/types";

interface Props {
  message: IMessage;
}

export default function Message({ message }: Props) {
  return (
    <div className="messagelist-message">
      <section className="messagelist-section">
        <div className="messagelist-picture">
          <img alt={`Photo de profil de ${""}`} src={message.picture} />
        </div>
        <div className="messagelist-name">{message.author}</div>
      </section>
      <div className="messagelist-bubble">{message.content}</div>
    </div>
  );
}
