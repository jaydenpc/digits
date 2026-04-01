import { Col, Container, Row} from 'react-bootstrap';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';
import { Contact } from '@/lib/validationSchemas';
import ContactCard from '@/components/ContactCard';
import { prisma } from '@/lib/prisma';

/** Render a list of stuff for the logged in user. */
const ListPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await auth();
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );
  //const owner = (session && session.user && session.user.email) || '';
  //const stuff = await prisma.stuff.findMany({
  //  where: {
  //    owner,
  //  },
  //});
  // console.log(stuff);
  const contacts: Contact[] = await prisma.contact.findMany({
    where: {
      owner: session?.user?.email || '',
    },
  });

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Container>
        <Row>
          <Col>
            <h2 className = "text-center">List Contacts</h2>
            <Row xs={1} md={2} lg={3} className="g-4">
              {contacts.map((contact, index) => (
                <Col key={index}>
                  <ContactCard contact={contact} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
        </Container>
      </Container>
    </main>
  );
};

export default ListPage;
