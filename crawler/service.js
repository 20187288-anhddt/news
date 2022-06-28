import axios from 'axios';

class Service {

    constructor(serviceURL){
        this.serviceURL = serviceURL
    }

    getAPI(entityName){
        const api = axios.create({
            baseURL: this.serviceURL + entityName
        });

        return api
    }

}

export default Service;
