import React, { useState } from 'react'
import useFetchJobs from './useFetchJobs'
import { Container } from 'react-bootstrap' 

import Job from './components/Job'
import JobsPagination from './components/JobsPagination'
import SearchForm from './components/SearchForm'
import './App.css'

const App = () => {
  const [params, setParams] = useState({})
  const [page, setPage] = useState(1)
  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page)

  const handleParamChange = (e) => {
    const param = e.target.name
    const value = e.target.value
    setPage(1)
    setParams(prevPraams => {
      return { ...prevPraams, [param]: value }
    })
  }

  return (
    <Container className="my-4">
      <h1 className="title"><span className="logo1">Github: </span> <span className="logo2">Jobs</span> <span className="search-logo"><i className="fas fa-search"></i></span></h1>
      <h4 className="mb-5 text-muted font-weight-light description">Discover the latest entries from Github: Jobs!</h4>
      <SearchForm params={params} onParamChange={handleParamChange} />
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
      {loading && <h6>Loading....</h6>}
      {error && <h1>Error. Try Refreshing.</h1>}
      {jobs.map(job => {
        return <Job key={job.id} job={job} />
      })}
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
    </Container>
  );
}

export default App;
