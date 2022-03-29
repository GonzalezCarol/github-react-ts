import React, { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import './App.css';
export interface GithubApiCall {
  avatar_url: string;
  login: string;
  name: string;
  html_url: string;
  followers: string;
  public_repos: string;
  repos_url: string;
}

function App() {
  const [githubData, setGithubData] = useState<GithubApiCall[]>([]);
  const [profileName, setNameProfile] = useState('');
  const githubApiCall = async (userName: string): Promise<GithubApiCall> => {
    try {
      const response = await fetch(`https://api.github.com/users/${userName}`);
      const data = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  };

  const setDataToState = () => {
    githubApiCall(profileName).then((dataApi) => {
      setGithubData([dataApi]);
    });
  };

  const handleValueInput = (event: any) => {
    const value = event.target.value.trim();
    setNameProfile(value);
  };

  return (
    <div>
      <nav
        className='navbar navbar-light'
        style={{ 'background-color': '#e3f2fd' }}
      >
        Github Profile
      </nav>

      <div className='input-button-container'>
        <input
          id='githubProfileName'
          className='input-search'
          type='text'
          required
          onChange={handleValueInput}
        />
        <button className='button-search' onClick={() => setDataToState()}>
          Buscar
        </button>
      </div>
      <div>
        {githubData.map((value, index) => (
          <div className='infos-container' key={index}>
            <img src={value.avatar_url} />
            <li>{value.avatar_url}</li>
            <li>{value.login}</li>
            <li>{value.name}</li>
            <li>{value.html_url}</li>
            <li>{value.followers}</li>
            <li>{value.public_repos}</li>
            <li>{value.repos_url}</li>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
