import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';

import Form from 'react-bootstrap/Form';
import {Container, Row, Col, Button, ButtonGroup } from 'react-bootstrap';


import 'bootstrap/dist/css/bootstrap.min.css';
import Navs from './component/navs.js'
import VisualKeyboard from './component/VisualKeyboard';

function App() {

  const [searchCity, setSearchCity] = useState("");
  const [cidOptions, setCidOptions] = useState([]); // Initial empty array
  const [defaultCidValue, setDefaultCidValue] = useState("");


  const [input, setInput] = useState('');

  const specialChars = [
    'ã', 'ẽ', 'ĩ', 'õ', 'ũ', 'ɛ', 'ɩ', 'ʋ',
    'ç', 'â', 'à', 'ê', 'è', 'ë', 'é', 'î',
    'ï', 'ô', 'û', 'ù', 'ü'
  ];

  const [searchQuery, setSearchQuery] = useState('');

  const handleAddChar = (char) => {
    setInput(input+char);
  };

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
          console.error("Error fetching cid options:", error);
        });
    }
  }, [searchCity]);

  const handleOnChange = (e) => {
    const newValue = e.target.value;

    handleAddChar(newValue);
    setSearchCity(newValue);
    setInput(newValue)
  }

  return (

    <div className="App">
      <Navs/>
      <Container className="mt-5">
        <Row>
          <Col className="me-3">
            <Row className="mb-3">
              <Form.Select aria-label="cid_s" value={defaultCidValue}>
              <option>Détection de langue</option>
              <option value='ms'>Mooré</option>
              <option value='fr'>Français</option>
            
              </Form.Select>
            </Row>
            <Row>
              <Form.Control
                as="textarea"
                rows={10}
                id="source"
                aria-describedby="passwordHelpBlock"
                value={input}
                onChange={handleOnChange}
                
              />
            </Row>
            
          </Col>

          <Col>
          <Row className="mb-3">
              <Form.Select aria-label="cid_c">
                <option>Choix de la lange cible</option>
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

      <div className="special-chars-div">
        <ButtonGroup className='mt-5'>
          {specialChars.map((char, index) => (
            <Button
              variant='dark'
              key={index}
              className="spbutton"
              onClick={() => handleAddChar(char)}
            >
              {char}
            </Button>
          ))}

        </ButtonGroup>
        
      </div>

      </div>
    
  );
}

export default App;
