    import { useState, useRef } from "react";
    import { Nav, Navbar, Container } from "react-bootstrap";
    import { Routes, Route } from "react-router-dom";
    import BookingForm from '../booking/BookingForm';
    import BookingList from '../booking/BookingList';
    import { Mesh, MeshBasicMaterial  } from 'three';
    import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
    import { Text, OrbitControls } from "@react-three/drei"; // Import OrbitControls

    import { Canvas, useFrame, useLoader } from '@react-three/fiber';

    // Define a simple 3D cube component
    const Box = () => {
        const meshRef = useRef<Mesh>(null);

        useFrame(() => {
            if (meshRef.current) {
                meshRef.current.rotation.x += 0.1;
                meshRef.current.rotation.y += 0.1;
            }
        });

        return (
            <mesh ref={meshRef}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={'orange'} />
            </mesh>
        );
    };


    const MyModel = ({ setRotationAngles }) => {
        const meshRef = useRef<Mesh>(null);
        const obj = useLoader(OBJLoader, '/track.obj'); // Adjust the path to your .obj file

        useFrame(() => {
            if (meshRef.current) {
                // Remove the automatic rotation, as it will be controlled by OrbitControls
                // meshRef.current.rotation.x += 0.1;
                // meshRef.current.rotation.y += 0.1;

                // Convert rotation angles to numbers before storing in state
                setRotationAngles({
                    x: Number(meshRef.current.rotation.x.toFixed(2)),
                    y: Number(meshRef.current.rotation.y.toFixed(2)),
                    z: Number(meshRef.current.rotation.z.toFixed(2)),
                });
            }
        });

        // Scale, rotate, and position adjustments if needed
        obj.scale.set(0.1, 0.1, 0.1); // Adjust scale if necessary
        obj.position.set(0, 0, 0); // Adjust position if necessary
        obj.rotation.set(0, Math.PI, - 2*Math.PI); // Adjust rotation if necessary

        // Apply a black material to the OBJ model using MeshBasicMaterial
        const blackMaterial = new MeshBasicMaterial({ color: 'black' });
        obj.traverse((child) => {
            if (child instanceof Mesh) {
                child.material = blackMaterial;
            }
        });
        
        return <primitive ref={meshRef} object={obj} />;
    };
    const Home = () => {

        return (
            <>
                <Header />
                <Body />
                <Footer />
            </>
        )
    }

    const Header = () => {
        return (
            <div className="Header">
                <NavBar />
            </div>
        )
    }

    const Footer = () => {
        return (
            <div className="Footer">
            </div>
        )
    }

    const NavBar = () => {
        return (
            <>
                <Navbar >
                    <Container>
                        <Navbar.Brand href="/">Home</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="/booking">Booking</Nav.Link>
                            <Nav.Link href="/simulation">Simulation</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </>
        )
    }
    const Car = () => {
        const carRef = useRef<Mesh>(null);
        const car = useLoader(OBJLoader, '/car.obj'); // Load the 3D model of the car
      
        useFrame(() => {
          // Animate the car's position along the track here
          // You can update the car's position based on time or other factors
        });
      
        // Apply materials, scale, and initial position as needed
        car.scale.set(0.1, 0.1, 0.1); // Adjust scale if necessary
        car.position.set(0, 0, 0); // Adjust initial position if necessary
      
        // Apply materials to the car model
        const carMaterial = new MeshBasicMaterial({ color: 'red' });
        car.traverse((child) => {
          if (child instanceof Mesh) {
            child.material = carMaterial;
          }
        });
      
        return <primitive ref={carRef} object={car} />;
      };
    const Body = () => {

        const [bookings, setBookings] = useState([]);
        const [rotationAngles, setRotationAngles] = useState({ x: 0, y: 0, z: 0 });

        // Function to add a new booking to the list
        const addBooking = (newBooking) => {
        setBookings([...bookings, newBooking]);
        };
    
        // Function to remove a booking from the list
        const removeBooking = (id) => {
        const updatedBookings = bookings.filter((booking) => booking.id !== id);
        setBookings(updatedBookings);
        };

        return (
            <>
                <p>Hi</p>
                {/* Canvas for 3D rendering */}
                <Canvas
                    style={{ width: '100%', height: '500px' }} // Set the canvas size with CSS
                >
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    <Box />
                    <Car /> {/* Add the Car component to the scene */}

                    <Text
                        position={[3, 0, 0]} // Adjust the position as needed
                        rotation={[0, 0, 0]} // Rotate the text to be vertical
                        color="white"
                        fontSize={0.15}
                    >
                        Rotation X: {rotationAngles.x}
                        {"\n"}
                        Rotation Y: {rotationAngles.y}
                        {"\n"}
                        Rotation Z: {rotationAngles.z}
                    </Text>

                    <MyModel setRotationAngles={setRotationAngles} />

                    {/* Use OrbitControls to limit rotation */}
                    <OrbitControls
                        enablePan={false} // Disable panning
                        maxPolarAngle={Math.PI} // Limit the rotation to +10 degrees (in radians)
                        minPolarAngle={2*Math.PI/3} // Limit the rotation to -10 degrees (in radians)
                        rotateSpeed={0.5} // Adjust the rotation speed as needed
                    />
                </Canvas>
                {/* ... */}
            </>
        );
    }

    export default Home;
