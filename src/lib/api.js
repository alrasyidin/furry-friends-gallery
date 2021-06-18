import React from 'react'
import axios from 'axios'

const { SNOWPACK_PUBLIC_DOG_API_URL, SNOWPACK_PUBLIC_DOG_API_KEY} = import.meta.env

const _callApi = async (url, params = null) => {
  const requestConfig = {
    baseURL: SNOWPACK_PUBLIC_DOG_API_URL,
    headers: {
      'x-api-key': SNOWPACK_PUBLIC_DOG_API_KEY,
    },
    url,
  }

  if (params) {
    requestConfig.params = params
  }
  console.log(requestConfig)
  try {
    return await axios(requestConfig)
  } catch (error) {
    console.error(`axios encounter an error ${error}`)
  }
}

export const fetchBreeds = async (page, limit = 10) => {
const breeds = await _callApi('breeds', {
    limit,
    page,
  })

  return {
    breeds: breeds.data,
    totalBreeds: breeds.headers['pagination-count'],
  }
}

export const fetchPictures = async (breed = '', limit = 20) => {
  if (breed === '') {
    return []
  }
  const pictures = await _callApi('images/search', {
    breed, limit
  })
  return pictures.data
}
