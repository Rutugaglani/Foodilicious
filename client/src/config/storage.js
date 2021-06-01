import axios from 'axios';
import store from '../redux/store'
import { SET_AUTHENTICATED} from '../redux/types';


const Storage=()=>{
    const config=()=>{
        const token = localStorage.Token;
        if(token){
          store.dispatch ({ type: SET_AUTHENTICATED});
            axios.interceptors.request.use(
                config =>{
                  config.headers.authorization=`Bearer ${token}`;
                  return config;
                },
                error =>{
                  return Promise.reject(error);
                }
              )}
        }
       const setAuthorizationHeader= async token  => {
          console.log(token)
      localStorage.setItem('Token',token);
      axios.interceptors.request.use(
          config =>{
            config.headers.authorization=`Bearer ${token}`;
            return config;
          },
          error =>{
            return Promise.reject(error);
          }
        )}
      return{
          config,
          setAuthorizationHeader
      }

}
export default Storage;