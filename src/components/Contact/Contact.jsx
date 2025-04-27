import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';
import { FaUser, FaPhone } from 'react-icons/fa';
import styles from './Contact.module.css';

export default function Contact({ id, name, number }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

  return (
    <li className={styles.contact}>
      <div className={styles.info}>
        <p className={styles.name}>
          <FaUser />
          {name}
        </p>
        <p className={styles.number}>
          <FaPhone />
          {number}
        </p>
      </div>
      <button className={styles.button} onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
}
