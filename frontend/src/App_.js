import React, { useState, useEffect } from 'react';
import './App.css';

import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navs from './component/navs.js';
import VisualKeyboard from './component/VisualKeyboard';

function App() {
  const [searchCity, setSearchCity] = useState('');
  const [cidOptions, setCidOptions] = useState([]); // Initial empty array
  const [defaultCidValue, setDefaultCidValue] = useState('');

  const [input, setInput] = useState('');

  useEffect(() => {
    if (searchCity.length >= 6) {
      fetch(`http://localhost:8000/cid/bonjour${searchCity}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          // Assuming data is an array of objects with id and label properties
          setCidOptions(data);
          setDefaultCidValue(data[0].value);
        })
        .catch((error) => {
          console.error('Error fetching cid options:', error);
        });
    }
  }, [searchCity]);

  const handleGlobalKeyPress = (event) => {
    if (event.key === 'Backspace') {
      setInput((prevInput) => prevInput.slice(0, -1));
    } else {
      setInput((prevInput) => prevInput + event.key);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleGlobalKeyPress);

    return () => {
      window.removeEventListener('keydown', handleGlobalKeyPress);
    };
  }, []);

  const handleKeyPress = (key) => {
    if (key === 'Backspace') {
      setInput((prevInput) => prevInput.slice(0, -1));
    } else {
      setInput((prevInput) => prevInput + key);
    }
  };

  return (
    <div className="App">
      <Navs />
      <Container className="mt-5">
        <Row>
          <Col className="me-3">
            <Row className="mb-3">
              <Form.Select aria-label="cid_s" value={defaultCidValue}>
                <option>Détection de langue</option>
                <option value="ms">Mooré</option>
                <option value="fr">Français</option>
              </Form.Select>
            </Row>
            <Row>
              <Form.Control
                as="textarea"
                rows={10}
                id="source"
                aria-describedby="passwordHelpBlock"
                value={input}
              />
            </Row>
            <Row>
              <Form.Control
                type="text"  // Utilisez le type approprié pour votre input
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
              />
            </Row>
          </Col>

          <Col>
            <Row className="mb-3">
              <Form.Select aria-label="cid_c">
                <option>Choix de la langue cible</option>
                <option value="1">Mooré</option>
                <option value="2">Français</option>
              </Form.Select>
            </Row>
            <Row>
              <Form.Control
                as="textarea"
                rows={10}
                id="cible"
                aria-describedby="passwordHelpBlock"
              />
            </Row>
          </Col>
        </Row>
      </Container>

      <VisualKeyboard onKeyPress={handleKeyPress} />
    </div>
  );
}

export default App;
