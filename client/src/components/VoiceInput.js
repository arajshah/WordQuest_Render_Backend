import React, { useState, useRef, useEffect } from 'react';

function VoiceInput({ onResult }) {
  const [supported, setSupported] = useState(true);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check if SpeechRecognition API is available
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript.trim();
      onResult(transcript);
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
  }, [onResult]);

  const startListening = () => {
    if (!recognitionRef.current) return;
    setListening(true);
    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (!recognitionRef.current) return;
    setListening(false);
    recognitionRef.current.stop();
  };

  if (!supported) {
    return <p>Voice recognition not supported in this browser.</p>;
  }

  return (
    <div style={{ marginTop: '10px' }}>
      {listening ? (
        <button onClick={stopListening}>Stop Listening</button>
      ) : (
        <button onClick={startListening}>Start Voice Input</button>
      )}
    </div>
  );
}

export default VoiceInput;
