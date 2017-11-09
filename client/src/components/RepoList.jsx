import React from 'react';
import RepoListEntry from './RepoListEntry.jsx'

const RepoList = (props) => (
  <div>
    <div className='NumRepos'>
      <h4> Repo List Component </h4>
      There are {props.repos.length} repos.
    </div>
    <div className='RepoList'>
     {props.repos.map(repoObj => 
        <RepoListEntry repoObj={repoObj}/>
      )}
    </div>
  </div>
)

export default RepoList;