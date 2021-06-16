import axios from 'axios'

const { API_URL, API_KEY } = __SNOWPACK_ENV__

const _callApi = (url, params = null) => {
  const requestConfig = {
    baseUrl: API_URL,
    headers: {
      'x-api-key': API_KEY,
    },
    url,
  }

  if (params) {
    requestConfig.params = params
  }

  try {
    return await axios(requestConfig)
  } catch (error) {
    console.error(`axios encounter an error ${error}`)
  }
}

export const fetchBreeds = async (page, limit = 10) => {
	const breeds = await _callApi('breeds', {
		limit, page
	})

	return {
		breeds: breeds.data,
		totalBreeds: breeds.header['pagination-count']
	}
}

export const fetchPictures = async (breed = '', limit = 20) => {
	if (breed === '') {
		return []
	}

	const pictures = await _callApi('images/search', {
		limit,
		breed_id: breed
	})

	return pictures.data
}