import React, { useState, useEffect } from 'react'
import { fetchBreeds } from '../lib/api'

const BreedList = ({ dispatchBreedChange }) => {
  const [value, setValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [breeds, setBreeds] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const handleChange = (e) => {
    setValue(e.target.value)

    if (dispatchBreedChange) {
      dispatchBreedChange(e.target.value)
    }
  }

  const handlePageClick = (newPageNumber) => {
    if (newPageNumber < 0 || newPageNumber >= totalPages) {
      return
    }

    setCurrentPage(newPageNumber)
  }

  useEffect(() => {
    ;(async () => {
      setIsLoading((loading) => !loading)
      const breedsData = await fetchBreeds(currentPage, 15)
      console.log(breedsData)
      setBreeds(breedsData.breeds)
      setTotalPages(parseInt(Math.ceil(breedsData.totalBreeds / 15)))
      setIsLoading((loading) => !loading)
    })()
  }, [currentPage])

  return (
    <>
      {isLoading && (
        <progress className="progress is-link is-medium" max="100">
          60%
        </progress>
      )}

      {!isLoading && (
        <>
          <div className="field breed-list">
            <div className="control">
              {breeds.map((breed) => (
                <label className="radio" key={breed.id}>
                  <input
                    type="radio"
                    value={breed.id}
                    checked={value === breed.id.toString()}
					onChange={handleChange}
                    name="breed"
                  />
                  {breed.name}
                </label>
              ))}
            </div>
          </div>
          <br />
          <nav
            role="pagination"
            aria-label="pagination"
            className="pagination is-rounded"
          >

            <a
              className="pagination-previous"
              href="#"
              onClick={() => handlePageClick(currentPage - 1)}
              disabled={currentPage <= 0}
            >
              Previous Page
            </a>
            <a
              className="pagination-next"
              href="#"
              onClick={() => handlePageClick(currentPage + 1)}
              disabled={currentPage + 1 >= totalPages}
            >
              Next Page
            </a>
          </nav>
        </>
      )}
    </>
  )
}

export default BreedList
