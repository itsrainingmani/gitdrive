import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";

export function GithubRepo() {
  const [user, setUser] = useState("");
  const [repo, setRepo] = useState("");
  const [loadInfo, setLoadInfo] = useState(true);

  const handleUserChange = (event) => {
    setUser(event.target.value);
  }

  const handleRepoChange = (event) => {
    setRepo(event.target.value);
  }

  return (
    <div>
      <label for="name">Userame:</label>
      <input type="text" id="git-user" name="git-user" minlength="4" onChange={handleUserChange}/>
      <label for="name">Repo:</label>
      </br>
      <input type="text" id="git-repo" name="git-repo" minlength="4" onChange={handleRepoChange}/>
      <button onClick={() => {setLoadInfo(false)}}>Generate</button>
      <br/>
      {loadInfo ? null : <RepoInfo gitUser={user} gitRepo={repo} />}
      </br>
      <button onClick={() => setLoadInfo(true)}>Clear</button>
    </div>
  );
}

function RepoInfo(props) {
  const GET_REPO_INFO = gql`
    query Repo{
      user(login: $user) {
        repository(name: $repo) {
          description
          createdAt
        }
      }
    }
  `

  const {data, loading, error} = useQuery(GET_REPO_INFO, {
    variables: {user: props.gitUser, repo: props.gitRepo},
  });

  if (loading) return "Loading ...";
  if (error) return `${error}`;

  return(
    <React.Fragment>
      <h1>Github Repository Information</h1>
      <p>
        <div>
          {data && data.user && data.user.repository ? `The ${gitRepo} repo has the following description ${data.user.repository.description} and was created at ${data.user.repository.createdAt}` : null}
        </div>
      </p>
    </React.Fragment>
  );
}