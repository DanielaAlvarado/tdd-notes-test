export const AngularFireAuthStub = {
    auth: {
        signInWithPopup(provider: any){
            return new Promise((resolve, reject) => {
                if(provider.successful){
                    return resolve(true);
                }

                reject(false);
            });
        },
        signOut(){}
    }
}
