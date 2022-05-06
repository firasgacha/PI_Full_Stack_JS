import React,{ useEffect, useState } from 'react'
const axios = require('axios').default;

export default function Translate() {
  const [options, setOptions] = useState([]);
  const [to, setTo] = useState('en');
  const [from, setFrom] = useState('en');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const params = new URLSearchParams();
  params.append('q', '<p class="green">Hello!</p>');
  params.append('source', 'auto');
  params.append('target', 'ar');
  params.append('api_key','xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
  const translate = () => {
    axios.post('https://libretranslate.de/translate',params,
      {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      }).then(res => setOutput(res.data.translatedText));
  };
  
  return (
    <div>
    <div>
      From ({from}) :
      <select onChange={e => setFrom(e.target.value)}>
        {options.map(option => <option key={option.code} value={option.code}>{option.name}</option>)}
      </select>
      To ({to}) :
      <select onChange={e => setTo(e.target.value)}>
        {options.map(option => <option key={option.code} value={option.code}>{option.name}</option>)}
      </select>
    </div>
    <div>
      <textarea cols="50" rows="8" onInput={e => setInput(e.target.value)}></textarea>
    </div>
    <div>
      <textarea cols="50" rows="8" value={output}></textarea>
    </div>
    <div>
      <button onClick={translate}>Translate</button>
    </div>
  </div>
  )
}
