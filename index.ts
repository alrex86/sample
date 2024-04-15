
import { defineStore } from 'pinia'
import Axios from 'axios';
import { responseType } from '../Common/types';


export const useStore = defineStore('store', {
    state: () => {
        return { 
            count: 0,
            loggedIn: false,
            page: 'login',
			testBuild: false,
			pathFinal: '',
            userData: {
              token: '',
			  username: ''
            },
			globalVars: {
				ipAdd: '192.168.143.16',
				port: 5000	
			}
        }
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
		increment(amt: number) {
			this.count++
		},
		async apiCall(url: string, data: any): Promise<responseType>{
			let response = await Axios({
				method: 'post',
				url: url,
				data: data,
				headers: {
					'x-access-token': this.userData.token,
					'Access-Control-Allow-Origin': '*'
					// 'version': state.appData.version,
					// 'sosyal-version': state.appData.versionSosyal,
				}    
			}) 

			return response.data;
		},
		async getUserData(){
			console.log('get user data');
			let response = await this.apiCall(this.pathFinal + 'user/getUserData/', null)
			console.log('response: ', response); 
			if(response.status == 1){
				this.storeUserData(response.payload);
				this.loggedIn = true;
				this.page = 'Home';
			}	
		},

		async test(){
			console.log('get user data');
			let response = await this.apiCall(this.pathFinal + 'test', null)
			console.log('response: ', response); 
			// if(response.status == 1){
			// 	this.loggedIn = true;
			// }	
		},
		storeUserData(userData: any){
			this.userData.username = userData.username
		}
    },
  })
  