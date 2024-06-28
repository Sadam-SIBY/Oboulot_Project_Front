import { useAppSelector } from "../../../hooks/redux.ts";

export default function ContactList() {

  const users = useAppSelector((state) => state.user.list);

  return (
    <div className="contact">
    <section className="contact-header">
      Envoyer un message
    </section>
    {users.map((user) => (
      <section className="contact-info">{`${user.firstname} ${user.lastname}`}</section>
    ))}
    </div>
  );
}
