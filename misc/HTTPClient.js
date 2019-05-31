import Configuration from '../config/config'

class HTTPClient {
    constructor() {
        this.config = new Configuration()
    }

    getProviders = async ({ name = '', only = '', reputation = '' }) => {

        var config = {
            method: 'GET',
        }

        const urlParams = getQueryString({ name, only, reputation })
        const endpointProviders = '/providers?'
        const url = this.config.API_URL + endpointProviders + urlParams

        console.log(url)
        var response = await fetch(url, config)

        if (response.ok) {
            var res = await response.json();
            var data = res.result.providers.data

            const institutionsData = data.filter( (d) => d.user == null)
            const specialistsData = data.filter( (d) => d.institution == null)
            const results = {institutions: institutionsData , specialists: specialistsData}
            console.log(results)
            console.log(res.result.providers.total)
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