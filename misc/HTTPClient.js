import Configuration from '../config/config'


/*
    HTTPClient: clase que se encarga de hacer las query a uno o varios endpoint de la API.
*/

class HTTPClient {
    constructor() {
        this.config = new Configuration()
    }

    getProviders = async ({ name = '', only = '', reputation = '' , page = 1}) => {

        var config = {
            method: 'GET',
        }

        const urlParams = getQueryString({ name, only, reputation, page})
        const endpointProviders = '/providers?'
        const url = this.config.API_URL + endpointProviders + urlParams
        var response = await fetch(url, config)

        if (response.ok) {
            var res = await response.json();
            var data = res.result.providers.data

            const institutionsData = data.filter( (d) => d.user == null)
            const specialistsData = data.filter( (d) => d.institution == null)
            const lastPage = res.result.providers.last_page

            const results = {institutions: institutionsData , specialists: specialistsData, last_page: lastPage}
            return (results)
        }
        else {
            return (
                {
                    ok: false,
                    message: 'error'
                }
            )
        }


    }
}

//Parseador de parámetros para ingresarlos por URL

const getQueryString = (params) => {
    return Object
        .keys(params)
        .map(k => {
            if (Array.isArray(params[k])) {
                return params[k]
                    .map(val => `${encodeURIComponent(k)}[]=${encodeURIComponent(val)}`)
                    .join('&')
            }

            return `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`
        })
        .join('&')
}


export default HTTPClient