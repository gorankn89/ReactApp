import HttpService from "./HttpService";

class GradebooksService extends HttpService {
  getGradebooks = async (name= "",page=1) => {
    let endpoint = "/gradebooks"; 
    let query=[];
    if (name) {
      query.push(`name=${name}`);
    }
    if (page) {
      query.push(`page=${page}`);
    } 
let query2=query.join("&");
   endpoint += `?${query2}`;
    const { data } = await this.client.get(endpoint);
    return data;
  };

getGradebook = async (id) => {
    const { data } = await this.client.get(`gradebooks/${id}`);
    return data;
  };

  createGradebook = async (gradebookData) => {
    const { data } = await this.client.post("/gradebooks", gradebookData);
    return data;
  };

  createStudent = async (id,studentData) => {
    const { data } = await this.client.post(`/gradebooks/${id}/students`, studentData);
    return data;
  };

  createComment = async (id,commentData) => {
    const { data } = await this.client.post(`/gradebooks/${id}/comments`, commentData);
    return data;
  };

  deleteComment = async (id) => {
    const { data } = await this.client.delete(`/comments/${id}`);
    return data;
  };

   deleteGradebook = async (id) => {
    const { data } = await this.client.delete(`/gradebooks/${id}`);
    return data;
  };

  deleteStudent = async (id) => {
    const { data } = await this.client.delete(`/students/${id}`);
    return data;
  };

getMyGradebook = async () => {
    const { data } = await this.client.get(`/my-gradebook`);
    return data;
  };

}

const gradebooksService = new GradebooksService();
export default gradebooksService;