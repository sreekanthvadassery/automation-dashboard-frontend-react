import axios from 'axios'

const PROJECT_BASE_REST_API_URL = 'http://localhost:8080/api/v1/project'

class ProjectService {

    getAllProjects(){
        return axios.get(PROJECT_BASE_REST_API_URL+'/find-all')
    }

    getProjectData = async (page, pageSize) => {
        try {
            //Get the API response
            const response = await fetch(
                PROJECT_BASE_REST_API_URL+`/find-all?page=${page}&size=${pageSize}`
            );
            //JSON formatted data
            const data = await response.json();
            //Return the data
            return data;
        } 
        catch (e) {
            throw new Error(`API error:${e?.message}`);
        }
    };

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