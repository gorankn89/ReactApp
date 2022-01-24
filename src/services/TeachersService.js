import HttpService from "./HttpService";

class TeachersService extends HttpService {
  getTeachers = async (name = "") => {
    let endpoint = "/teachers";
    if (name) {
      endpoint += `?name=${name}`;
    }
    const { data } = await this.client.get(endpoint);
    return data;
  };

 getTeacher = async (id) => {
    const { data } = await this.client.get(`teachers/${id}`);
    return data;
  };

getFreeTeachers= async () => {
    const { data } = await this.client.get("/gradebooks/freeteachers");
    return data;
  };

}

const teachersService = new TeachersService();
export default teachersService;