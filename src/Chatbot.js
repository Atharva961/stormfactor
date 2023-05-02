import React, { useState, useRef, useEffect } from "react";
// import './Chatbot.css';

function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
 
    const chatContainerRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom of the chat container
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(message);
        fetch('http://localhost:5000/api/openai/talk', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        })
            .then((res) => res.json())
            .then((data) => {
                const newMessages = [...messages, { message, response: data.message }];
                setMessages(newMessages);
            });
        e.target.reset();
    }

    return (
        <div className="container">
            <h1 className="text-center mb-4 text-success">FarmerBot</h1>
            <form className="mb-4" onSubmit={handleSubmit}>
                <textarea className="form-control mb-2" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message here"></textarea>
                <button className="btn btn-success" type="submit">Submit</button>
            </form>

            <div className="overflow-auto bg-white rounded text-left" style={{ height: '400px' }} ref = {chatContainerRef}>
                {messages.map((msg, index) => (
                    <div key={index} className="border-bottom pb-2 mb-2 text-left">
                        <p className="font-weight-bold mb-0 text-success">User: {msg.message}</p>
                        <p className="mb-0">Response: {msg.response}</p>
                    </div>
                ))}
            </div>


        </div>
    )

}

export default Chatbot;
