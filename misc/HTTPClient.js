import Configuration from './config'

class HTTPClient {
    constructor(){
        this.config = new Configuration()
    }

    get = async (name='', only='', reputation, page=null, per_page=10) => {

    }
}

export default HTTPClient