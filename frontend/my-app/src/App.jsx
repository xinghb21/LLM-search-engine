import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const SITES = {
  bilibili: 'https://www.bilibili.com/',
  wikipedia: 'https://www.wikipedia.org/',
  baidu: 'https://www.baidu.com/',
  perplexity: 'https://www.perplexity.ai/'
};

export default function App() {
  const [site, setSite] = useState(SITES.bilibili);
  const sessionId = useRef('user_' + Math.floor(Math.random() * 100000));

  useEffect(() => {
    const sendLog = (eventType, data) => {
      axios.post('http://localhost:3001/api/log', {
        sessionId: sessionId.current,
        events: [{ type: eventType, ...data }]
      });
    };

    const handleClick = e => sendLog('click', { x: e.clientX, y: e.clientY });
    const handleMove = e => sendLog('mousemove', { x: e.clientX, y: e.clientY });
    const handleScroll = () => sendLog('scroll', { y: window.scrollY });

    document.addEventListener('click', handleClick);
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <h2>Select a Search Platform</h2>
      <select onChange={e => setSite(SITES[e.target.value])}>
        <option value="bilibili">Bilibili</option>
        <option value="wikipedia">Wikipedia</option>
        <option value="baidu">Baidu</option>
        <option value="perplexity">Perplexity</option>
      </select>
      <iframe
        src={site}
        title="search-frame"
        style={{ width: '100%', height: '90vh', border: 'none', marginTop: 10 }}
      />
    </div>
  );
}