import axios from "axios";

const baseUrl="http://localhost:8080";

const api = axios.create({
    baseURL:baseUrl,
    headers:{
       'Content-Type':'application/json',
    },
   });

   api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });
  const userServices = {
    getUser:async(email)=>{
      try{
        const response = await api.get(`/user/get?email=${email}`);
        //console.log("My api res",response.data);
        return response.data;
        
        
      } catch (error) {
        throw error;
      } 
    }
  }

  const authService={
    signup: async(User)=>{
        try{
            const response=await api.post("/user/register",User);
            return response.data;
        }catch(error) {
          throw error;
        }
    },

    login: async(loginRequest)=>{
        try{
           const response = await api.post("/user/login",loginRequest);
           return response.data;
        }catch(error){
           throw error;
        }
    },
    otpforpassword:async(email)=>{
      const data = {
        "email":email
      }
      try {
        const response = await api.post("/user/otp",data);
        return response.data;
        
      } catch (error) {
        throw error
      }
    },
    resetPassword:async(email,otp,newpassword)=>{
      const data ={
        "email":email,
        "otp":otp,
        "newPassword":newpassword
      }
      try{
        const response = await api.post("/user/passwordreset",data)
        return response.data;
      }catch(e){
        throw e;
      }
      }
      
  };

  const taskManagement = {
    createTask:async (taskRequest)=>{
      try{
        const response = await api.post("/task/add",taskRequest);
        console.log('this is dat',taskRequest);
        return response.data;
      }catch(e){
        throw e;
      }

    },

    getAll : async (email)=>{
      try {
        const response = await api.get(`/task/getAll?email=${email}`)
        
        return response.data;
        
        
      } catch (error) {
        throw error;
      }

    },
    add:async (task)=>{
      try{
        const response = await api.post("/task/add",task);
        console.log("DataPosted", response.data);
        return response.data;


      }catch (error) {
        console.log("Error in  adding task", error)
        throw error;

      }
    },
    deleteTask: async (taskId)=>{
      try {
        const response = await api.delete(`/task/delete?taskId=${taskId}`);
        console.log("DataDeleted",response);
      } catch (error) {
        console.log("Error in  adding task", error)
        throw error;
        
      }
    },
    updateTask: async(taskId,updatedTask)=>{
      try{
        const response = await api.put(`/task/update?taskId=${taskId}`,updatedTask);
        console.log(response);
      }catch(e){
        console.log("Unable to update task because of error:",e)
        throw e;
      }
    }

  }

  const productivityServices = {
    getProductivity:async (email)=>{
      try {
        const response = await api.get(`/productivity/get-productivity?email=${email}`)
        console.log("Here the response is -->",response.status)
        console.log("My respomsent is -->",response.data)

        return response.data
      } catch (error) {
        throw error
      }
    },
    // updateProductivity :async(email)=>{
    //   const _data ={
    //     "email": email,
    //     "date":new Date().toISOString().substring(0,10),
    //     "completedTask":1,

    //   }

    // }
    // ,
    setProductivity:async (email)=>{
      const _data ={
        "email":email,
        "date":new Date().toISOString().substring(0,10),
        "completedTask":"0"
      }
      
      console.log(_data);
      try {
        const response = await api.post("/productivity/create-productivity",_data)
        
        return response;
        
      } catch (error) {
        throw error
        
      }
    }
  }

  export {authService,taskManagement,userServices,productivityServices};