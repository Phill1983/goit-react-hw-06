import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from './redux/contactsSlice';
import { defaultContacts } from './data/defaultContacts';

import ContactList from './components/ContactList/ContactList';
import SearchBox from './components/SearchBox/SearchBox';
import ContactForm from './components/ContactForm/ContactForm';
import styles from './App.module.css';

export default function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);

  useEffect(() => {
    if (contacts.length === 0) {
      defaultContacts.forEach(contact => {
        dispatch(addContact(contact));
      });
    }
  }, [contacts.length, dispatch]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      <ContactList />
    </div>
  );
}
