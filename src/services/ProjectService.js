import axios from 'axios'

const PROJECT_BASE_REST_API_URL = 'http://localhost:8080/api/v1/project'

class ProjectService {

    getAllProjects(){
        return axios.get(PROJECT_BASE_REST_API_URL+'/find-all')
    }

    saveProject(project){
        return axios.post(PROJECT_BASE_REST_API_URL+'/save',project);
    }

    getProjectById(projectId){
        return axios.get(PROJECT_BASE_REST_API_URL+'/'+projectId);
    }

    updateProject(projectId,project){
        return axios.put(PROJECT_BASE_REST_API_URL+'/update/'+projectId,project);
    }

    deleteProject(projectId){
        return axios.delete(PROJECT_BASE_REST_API_URL+'/delete/'+projectId)
    }
}

export default new ProjectService();