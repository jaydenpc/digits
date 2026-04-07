"use client";
import { Contact, Note} from '@prisma/client';
import { Card, Image, ListGroup } from 'react-bootstrap';
import NoteItem from './NoteItem';

/* Renders a single Contact. See list/page.tsx. */
const ContactCardAdmin = ({contact, notes}: { contact: Contact, notes: Note[] }) => (
  <Card className = "h-100">
    <Card.Header>
      <Image src = {contact.image} width = {75} alt = 'image' />
      <Card.Title>{contact.firstName} {contact.lastName}</Card.Title>
      <Card.Subtitle>{contact.address}</Card.Subtitle>

    </Card.Header>
    <Card.Body>
      <Card.Text>{contact.description}</Card.Text>
      <ListGroup variant="flush">
    {notes.map((note) => <NoteItem key={note.id} note={note}/>)}
      </ListGroup>
    </Card.Body>
    <Card.Footer>
      <p className = "blockquote-footer">{contact.owner}</p>
    </Card.Footer>

  </Card>
);

export default ContactCardAdmin;
