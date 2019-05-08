export const AuthServiceStub = {
    successful: true,
    doRegister(value){
        return new Promise((resolve, reject) => {
            if(value.email == 'user@mail.com' && value.password == 'secret'){
                return resolve(true);
            }

            reject(false);
        })
    },
    doLogin(value){
        return new Promise((resolve, reject) => {
            if(value.email == 'user@mail.com' && value.password == 'secret'){
                return resolve(true);
            }

            reject(false);
        })
    },
    doGoogleLogin(){
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    },
    doFacebookLogin(){
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    },
    doTwitterLogin(){
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    },
    doLogout(){
        return new Promise((resolve, reject) => {
            if(this.successful){
                return resolve(true);
            }

            reject(false);
        });
    }
}
