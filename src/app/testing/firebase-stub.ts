export const firebaseAuthStub = {
    createUserWithEmailAndPassword(email: string, password: string){
        return new Promise((resolve, reject) => {
            if(email == 'user@mail.com' && password == 'secret'){
                return resolve(true);
            }

            reject(false);
        });
    },
    currentUser: {
        updateProfile(value: any){
            return new Promise((resolve, reject) => {
                resolve(true);
            });
        }
    },
    signInWithEmailAndPassword(email: string, password: string){
        return new Promise((resolve, reject) => {
            if(email == 'user@mail.com' && password == 'secret'){
                return resolve(true);
            }

            reject(false);
        });
    }
};

export const AuthProviderStub = {
    successful: true,
    addScope(scope: string){}
};
