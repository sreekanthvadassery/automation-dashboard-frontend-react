import axios from 'axios'

const PROJECT_BASE_REST_API_URL = 'http://localhost:8080/api/v1/project'

class ProjectService {

    getAllProjects(){
        return axios.get(PROJECT_BASE_REST_API_URL+'/find-all')
    }
}

export default new ProjectService();