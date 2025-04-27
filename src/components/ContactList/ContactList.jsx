import { useSelector } from 'react-redux';
import Contact from '../Contact/Contact';
import styles from './ContactList.module.css';

export default function ContactList() {
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.filters.name);

  const visibleContacts = Array.isArray(contacts)
    ? contacts
        .filter(contact => typeof contact.name === 'string' && contact.name.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name))
    : [];

  if (contacts.length === 0 && filter === '') {
    return null; 
  }

  if (visibleContacts.length === 0 && filter !== '') {
    return <p>No contacts found.</p>;
  }

  return (
    <ul className={styles.list}>
      {visibleContacts.map(({ id, name, number }) => (
        <Contact
          key={id}
          id={id}
          name={name}
          number={number}
        />
      ))}
    </ul>
  );
}
