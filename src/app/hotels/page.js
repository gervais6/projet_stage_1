"use client";

import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button, Form, FormControl, Card, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import avatar from '../avatar.png';
import VECTOR from '../Vector.png';
import before from '../before.png';
import SVG from '../SVG.png';
import { IoMdNotificationsOutline } from "react-icons/io";
import { Search } from 'react-bootstrap-icons';
import Link from 'next/link';
import './hotel.css';

const Hotel = () => {
  const [hovered, setHovered] = useState(null);
  const handleMouseEnter = (index) => setHovered(index);
  const handleMouseLeave = () => setHovered(null);

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch('https://projet-stage-1-3.onrender.com/hotels/hotels');
        const data = await response.json();
        setHotels(data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hotel.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex' }}>
      {/* Navbar */}
      <Navbar bg="white" fixed="top" expand="lg" className="shadow-sm">
        <Container fluid>
          <Navbar.Brand href="#" className="fw-bold">Liste des hôtels</Navbar.Brand>
          <Form className="d-flex mx-auto">
            <FormControl
              type="search"
              placeholder="Recherche..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="me-2"
              style={{ borderRadius: '10000px' }}
            />
            <Button variant="outline-secondary">
              <Search />
            </Button>
          </Form>
          <Nav className="ms-auto">
            <Nav.Link href="#"><IoMdNotificationsOutline size={24} /></Nav.Link>
            <Nav.Link href="#"><Image src={avatar} width={30} height={30} alt="avatar" /></Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Sidebar */}
      <div className="d-flex flex-column vh-100" style={{ width: '280px', backgroundColor: 'rgba(2, 2, 2, 0.7)', position: 'fixed', top: 0, zIndex: 1 }}>
        <div className="text-center py-4">
          <Image src={SVG} alt="Product Icon" width={30} height={30} />
          <h6 className="text-white mt-2 fw-bold">RED PRODUCT</h6>
        </div>
        <Nav className="flex-column text-white px-4">
          <Link href="/dashboard" passHref>
            <Nav.Link className="text-white">Dashboard</Nav.Link>
          </Link>
          <Link href="/hotels" passHref>
            <Nav.Link className="text-white">Liste des hôtels</Nav.Link>
          </Link>
        </Nav>
        <div className="mt-auto text-white p-4 text-center">
          <Image src={avatar} className="rounded-circle" width={50} height={50} alt="User Avatar" />
          <h6 className="mt-2">Mouhamet Badiane</h6>
          <p className="text-muted">En ligne</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1" style={{ marginLeft: '280px', marginTop: '80px', padding: '20px' }}>
        {loading ? (
          <h6 className="text-center">Chargement des hôtels...</h6>
        ) : (
          <Container>
            <Row>
              {filteredHotels.map((hotel) => (
                <Col md={4} lg={3} key={hotel.id} className="mb-4">
                  <Card className="shadow-sm" style={{ borderRadius: '14px' }}>
                    <Card.Img
                      variant="top"
                      src={hotel.photo ? `https://projet-stage-1-3.onrender.com/uploads/${hotel.photo}` : './1.png'}
                      style={{ borderRadius: '10px 10px 0 0', height: '200px', objectFit: 'cover' }}
                    />
                    <Card.Body>
                      <Card.Text className="text-muted small">{hotel.address}</Card.Text>
                      <Card.Title className="h6 fw-bold">{hotel.name}</Card.Title>
                      <Card.Text className="text-muted">
                        {hotel.pricePerNight} {hotel.currency} par nuit
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        )}
      </div>
    </div>
  );
};

export default Hotel;
