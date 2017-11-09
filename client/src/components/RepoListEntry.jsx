import React from 'react';

const RepoListEntry = (props) => (
  <div className='Entry'>
    <h4>{props.repoObj.username}</h4>
    <a href={props.repoObj.repoUrl}  target="_blank">{props.repoObj.repoUrl}</a>
    <p>#Forks : {props.repoObj.forks}</p>
  </div>
)

export default RepoListEntry;