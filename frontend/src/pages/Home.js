// import component Bootstrap from React
import { Card, Container, Row, Col, Button } from 'react-bootstrap';

function Home() {
    return (
        <Container className='mt-3'>
            <Row>
                <Col md={12}>
                <Card className="border-0 shadow-sm">
                    <Card.Body className='p-4'>
                        <h1>Mempelajari React JS untuk Tugas Besar</h1>
                        <p class="lead">Tutorial FullStack Express.js dan React.js oleh<strong>Belajar React JS TUBES</strong></p>
                        <Button href='/' target='_blank' variant='primary' size='lg'>SELENGKAPNYA</Button>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Home;