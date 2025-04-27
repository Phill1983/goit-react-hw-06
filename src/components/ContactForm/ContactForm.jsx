import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contactsSlice';
import styles from './ContactForm.module.css';

const ContactSchema = Yup.object().shape({
  name: Yup.string().min(3, 'Too short!').max(50, 'Too long!').required('Required'),
  number: Yup.string().min(3, 'Too short!').max(50, 'Too long!').required('Required'),
});

export default function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);

  const handleSubmit = (values, actions) => {
    const isDuplicate = Array.isArray(contacts) && contacts.some(
      contact => typeof contact.name === 'string' && contact.name.toLowerCase() === values.name.toLowerCase()
    );

    if (isDuplicate) {
      alert(`${values.name} is already in contacts.`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name: values.name,
      number: values.number,
    };

    dispatch(addContact(newContact));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={ContactSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form} autoComplete="off">
        <label className={styles.label} htmlFor="name">
          Name
          <Field id="name" type="text" name="name" className={styles.input} autoComplete="off" />
          <ErrorMessage name="name" component="div" className={styles.error} />
        </label>

        <label className={styles.label} htmlFor="number">
          Number
          <Field id="number" type="text" name="number" className={styles.input} autoComplete="off" />
          <ErrorMessage name="number" component="div" className={styles.error} />
        </label>

        <button type="submit" className={styles.button}>Add contact</button>
      </Form>
    </Formik>
  );
}

