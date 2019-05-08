import {of} from 'rxjs';

export const AngularFirestoreStub = {
    collection: (name: string) => ({
        add(value: any){
            return new Promise((resolve, reject) => {
                resolve(true);
            });
        },
        snapshotChanges(){
            return of([
                {
                    payload: {
                        doc: {
                            id: '1',
                            data: () => ({
                                color: '#F3778F',
                                title: 'This is a title',
                                content: 'This is the content'
                            })
                        }
                    }
                }
            ]);
        },
        doc: (key: string) => ({
            snapshotChanges(){
                return of({
                    payload: {
                        id: '1',
                        data: () => ({
                            color: '#F3778F',
                            title: 'This is a title',
                            content: 'This is the content'
                        })
                    }
                });
            },
            set(value: any){
                return new Promise((resolve, reject) => {
                    resolve(true);
                });
            },
            delete(){
                return new Promise((resolve, reject) => {
                    resolve(true);
                });
            }
        })
    })
};
