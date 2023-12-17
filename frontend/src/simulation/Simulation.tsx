import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SimulationForm = () => {
    const [simulationName, setSimulationName] = useState('sumo');
    const [routePlannerFile, setRoutePlannerFile] = useState(null);
    const [selectedScenario, setSelectedScenario] = useState('scenario1');
    const [showGif, setShowGif] = useState(false);

    const [filePath, setFilePath] = useState('')

    const handleFileChange = (e) => {
        // Handle file selection here and store it in routePlannerFile state
        const file = e.target.files[0];
        setRoutePlannerFile(file);
    };

    const handleSimulateClick = () => {
        // Perform simulation logic here
        // You can display a loading GIF while simulating
        setFileName()
        setShowGif(true);

        // Simulate logic (replace with your own)
        setTimeout(() => {
            // After simulation is complete, hide the GIF
            setShowGif(false);
        }, 10000); // Simulate for 3 seconds (adjust as needed)
    };

    const setFileName = () => {
        const filePath = "gifs/" + simulationName + "-" + selectedScenario + ".gif"
        setFilePath(filePath)
        console.log(filePath)
    }

    return (
        <Container>
            <h2>Simulation Form</h2>
            <Form>
                <Form.Group as={Row} controlId="simulationName">
                    <Form.Label column sm={2}>Simulation Env:</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            as="select"
                            value={simulationName}
                            onChange={(e) => setSimulationName(e.target.value)}
                        >
                            <option value="sumo">Sumo</option>
                            <option value="carla">Carla</option>
                        </Form.Control>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="routePlannerFile">
                    <Form.Label column sm={2}>Route Planner :</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="file"
                            accept=".json" // Specify the allowed file type
                            onChange={handleFileChange}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="selectedScenario">
                    <Form.Label column sm={2}>Scenario:</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            as="select"
                            value={selectedScenario}
                            onChange={(e) => setSelectedScenario(e.target.value)}
                        >
                            <option value="scenario1">Scenario 1</option>
                            <option value="scenario2">Scenario 2</option>
                            <option value="scenario3">Scenario 3</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
                <br />
                <Form.Group as={Row} controlId="simulateButton">
                    <Col sm={{ offset: 2, span: 10 }}>
                        <Button
                            variant="primary"
                            onClick={handleSimulateClick}
                        >
                            Simulate
                        </Button>
                    </Col>
                </Form.Group>
            </Form>

            {showGif && (
                <div className="loading-gif">
                    <img src={filePath} alt="Loading" />
                </div>
            )}

            {/* {showGif && (() => {
                let filename = "gifs/" + simulationName + "-" + selectedScenario + ".gif"
                console.log(filename)
                return (
                    <div className="loading-gif">
                        <img src={filename} alt="Loading" />
                    </div>
                )
            })} */}

        </Container>
    );
}

const Simulation = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 4 }}>
                        <SimulationForm />
                    </Col>
                </Row>
            </Container>

        </>
    )
}
export default Simulation;
