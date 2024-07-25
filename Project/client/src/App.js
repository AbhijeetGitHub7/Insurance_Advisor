/*
import React, { useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import {
  FaUser,
  FaBriefcase,
  FaSmoking,
  FaShieldAlt,
  FaPaperPlane,
} from "react-icons/fa";

// Home Form Styles
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  // opacity: 0.7;
  background-image: url("image.png");
  backdrop-filter: blur(1000px);
`;

const FormWrapper = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  z-index: 1;
  position: relative;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const Label = styled.label`
  flex: 1;
  margin-right: 10px;
  display: flex;
  align-items: center;
  color: #333;
`;

const Input = styled.input`
  flex: 2;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Select = styled.select`
  flex: 2;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  background: #ff7e5f;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;

  &:hover {
    background: #feb47b;
  }
`;

const Error = styled.p`
  color: red;
  text-align: center;
`;

// ChatBot Styles
const ChatContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #333;
`;

const ChatWrapper = styled.div`
  background: #222;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 400px;
  display: flex;
  flex-direction: column;
  height: 90vh;
  max-height: 800px;
`;

const MessageContainer = styled.div`
  flex: 1;
  border: 1px solid #444;
  padding: 10px;
  background: #1e1e1e;
  overflow-y: auto;
  margin-bottom: 10px;
`;

const Message = styled.div`
  text-align: ${({ user }) => (user ? "right" : "left")};
  margin: 10px 0;
  padding: 10px;
  border-radius: 20px;
  background-color: ${({ user }) => (user ? "#4a90e2" : "#555")};
  color: #fff;
  max-width: 70%;
  align-self: ${({ user }) => (user ? "flex-end" : "flex-start")};
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 20px;
  margin-right: 10px;
  background: #444;
  color: #fff;
  font-size: 16px;
  &::placeholder {
    color: #888;
  }
`;

const ChatButton = styled.button`
  background: #4a90e2;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;

  &:hover {
    background: #357abd;
  }
`;

const Home = () => {
  const [age, setAge] = useState("");
  const [occupation, setOccupation] = useState("");
  const [tobacco, setTobacco] = useState("");
  const [coverage, setCoverage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (age < 18) {
      setError("Age must be above 18");
      return;
    }
    if (!occupation || !tobacco || !coverage) {
      setError("All fields are required");
      return;
    }
    setError("");

    const formData = {
      age,
      coverage_amt: coverage,
      tobacco,
      occupation,
      prompt: "Hello, I need insurance advice.",
    };

    try {
      const response = await axios.post("http://localhost:5000/res", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate("/chat", {
        state: { response: response.data, age, coverage, tobacco, occupation },
      });
    } catch (error) {
      console.error("Error submitting the form", error);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Insurance Form</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>
              <FaUser style={{ marginRight: "10px" }} /> Age:
            </Label>
            <Input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>
              <FaBriefcase style={{ marginRight: "10px" }} /> Occupation:
            </Label>
            <Select
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
            >
              <option value="">Select</option>
              <option value="salaried">Salaried</option>
              <option value="self-employed">Self Employed</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>
              <FaSmoking style={{ marginRight: "10px" }} /> Tobacco Use:
            </Label>
            <Select
              value={tobacco}
              onChange={(e) => setTobacco(e.target.value)}
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>
              <FaShieldAlt style={{ marginRight: "10px" }} /> Coverage:
            </Label>
            <Select
              value={coverage}
              onChange={(e) => setCoverage(e.target.value)}
            >
              <option value="">Select</option>
              <option value="1cr">1 Cr</option>
              <option value="1.5cr">1.5 Cr</option>
            </Select>
          </FormGroup>
          {error && <Error>{error}</Error>}
          <Button type="submit">Submit</Button>
        </Form>
      </FormWrapper>
    </Container>
  );
};

const ChatBot = () => {
  const location = useLocation();
  const { response } = location.state || {};
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, user: true }]);
      setInput("");
      // Simulate bot response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: response || "Bot response here...", user: false },
        ]);
      }, 500);
    }
  };

  return (
    <ChatContainer>
      <ChatWrapper>
        <Title>Chat with our Bot</Title>
        <MessageContainer>
          {messages.map((msg, index) => (
            <Message key={index} user={msg.user}>
              <p>{msg.text}</p>
            </Message>
          ))}
        </MessageContainer>
        <InputContainer>
          <ChatInput
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
          />
          <ChatButton onClick={handleSend}>
            <FaPaperPlane size={18} />
          </ChatButton>
        </InputContainer>
      </ChatWrapper>
    </ChatContainer>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<ChatBot />} />
    </Routes>
  );
};

export default App;
*/
import React, { useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import {
  FaUser,
  FaBriefcase,
  FaSmoking,
  FaShieldAlt,
  FaPaperPlane,
} from "react-icons/fa";

// Animation Keyframes
const cu1 = keyframes`
  0%    {-webkit-mask-size:0    0  ,0    0  ,0    0  ,auto}
  16.67%{-webkit-mask-size:18px 18px,0    0  ,0    0  ,auto}
  33.33%{-webkit-mask-size:18px 18px,18px 18px,0    0  ,auto}
  50%   {-webkit-mask-size:18px 18px,18px 18px,18px 18px,auto}
  66.67%{-webkit-mask-size:0    0  ,18px 18px,18px 18px,auto}
  83.33%{-webkit-mask-size:0    0  ,0    0  ,18px 18px,auto}
  100%  {-webkit-mask-size:0    0  ,0    0  ,0    0  ,auto}
`;

// Custom Loader Style
const Loader = styled.div`
  width: 70px;
  height: 26px;
  background: #6ef1f4;
  border-radius: 50px;
  --c: radial-gradient(farthest-side, #000 92%, #0000);
  --s: 18px 18px;
  -webkit-mask: var(--c) left 4px top 50%, var(--c) center,
    var(--c) right 4px top 50%, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  -webkit-mask-repeat: no-repeat;
  animation: ${cu1} 1.5s infinite;
`;

// Home Form Styles
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("image.png");
  backdrop-filter: blur(1000px);
  background-size:cover;
`;

const FormWrapper = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  z-index: 1;
  position: relative;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const Label = styled.label`
  flex: 1;
  margin-right: 10px;
  display: flex;
  align-items: center;
  color: #333;
`;

const Input = styled.input`
  flex: 2;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Select = styled.select`
  flex: 2;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  background: #5ad2ed;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #1fd4c4; // Darker shade for hover effect
  }
`;

const Error = styled.p`
  color: red;
  text-align: center;
`;

// ChatBot Styles
const ChatContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #333;
`;

const ChatWrapper = styled.div`
  background: #222;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 600px;
  display: flex;
  flex-direction: column;
  height: 90vh;
  max-height: 800px;
`;

const MessageContainer = styled.div`
  flex: 1;
  border: 1px solid #444;
  padding: 10px;
  background: #1e1e1e;
  overflow-y: auto;
  margin-bottom: 10px;
`;

const Message = styled.div`
  text-align: ${({ user }) => (user ? "right" : "left")};
  margin: 10px 0;
  padding: 10px;
  border-radius: 20px;
  background-color: ${({ user }) => (user ? "#4a90e2" : "#555")};
  color: #fff;
  max-width: 70%;
  align-self: ${({ user }) => (user ? "flex-end" : "flex-start")};
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 20px;
  margin-right: 10px;
  background: #444;
  color: #fff;
  font-size: 16px;
  &::placeholder {
    color: #888;
  }
`;

const ChatButton = styled.button`
  background: #4a90e2;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;

  &:hover {
    background: #357abd;
  }
`;

const Home = () => {
  const [age, setAge] = useState("");
  const [occupation, setOccupation] = useState("");
  const [tobacco, setTobacco] = useState("");
  const [coverage, setCoverage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (age < 18) {
      setError("Age must be above 18");
      return;
    }
    if (!occupation || !tobacco || !coverage) {
      setError("All fields are required");
      return;
    }
    setError("");
    setLoading(true);



    try {


      setLoading(false);
      navigate("/chat", {
        state: { age, coverage, tobacco, occupation },
      });
    } catch (error) {
      console.error("Error submitting the form", error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Enter your details</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>
              <FaUser style={{ marginRight: "10px" }} /> Age:
            </Label>
            <Input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>
              <FaBriefcase style={{ marginRight: "10px" }} /> Occupation:
            </Label>
            <Select
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
            >
              <option value="">Select</option>
              <option value="salaried">Salaried</option>
              <option value="self-employed">Self Employed</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>
              <FaSmoking style={{ marginRight: "10px" }} /> Tobacco Use:
            </Label>
            <Select
              value={tobacco}
              onChange={(e) => setTobacco(e.target.value)}
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>
              <FaShieldAlt style={{ marginRight: "10px" }} /> Coverage:
            </Label>
            <Select
              value={coverage}
              onChange={(e) => setCoverage(e.target.value)}
            >
              <option value="">Select</option>
              <option value="10000000">1 Cr</option>
              <option value="15000000">1.5 Cr</option>
            </Select>
          </FormGroup>
          {error && <Error>{error}</Error>}
          <Button type="submit">{loading ? <Loader /> : "Submit"}</Button>
        </Form>
      </FormWrapper>
    </Container>
  );
};

const ChatBot = () => {
  const location = useLocation();
  const { age, occupation, tobacco, coverage, prompt } = location.state || {};
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, user: true }]);

      const formData = {
        age,
        coverage_amt: coverage,
        tobacco,
        occupation,
        prompt: input,
      };
      const res = await axios.post("http://localhost:5000/res", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(`response ${res.data.response}`)
      setInput("");
      setResponse(res.data.response);
      console.log(response)
      console.log(`object ${res}`);
      // Simulate bot response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: `Bot Answer:${res.data.response}`, user: false },
        ]);
      }, 500);
    }
  };
  return (
    <ChatContainer>
      <ChatWrapper>
        <Title>Chat with our Bot</Title>
        <MessageContainer>
          {messages.map((msg, index) => (
            <Message key={index} user={msg.user}>
              <p>{msg.text}</p>
            </Message>
          ))}
        </MessageContainer>
        <InputContainer>
          <ChatInput
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
          />
          <ChatButton onClick={handleSend}>
            <FaPaperPlane size={18} />
          </ChatButton>
        </InputContainer>
      </ChatWrapper>
    </ChatContainer>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<ChatBot />} />
    </Routes>
  );
};

export default App;
