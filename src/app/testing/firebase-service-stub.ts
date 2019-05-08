import {of} from 'rxjs';

export const FirebaseServiceStub = {
    createNote(value: any, color: string){
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    },
    getNotes(){
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
            },
            {
                payload: {
                    doc: {
                        id: '2',
                        data: () => ({
                            color: '#71CAC4',
                            title: 'This is a second title',
                            content: 'This is the second content'
                        })
                    }
                }
            },
            {
                payload: {
                    doc: {
                        id: '3',
                        data: () => ({
                            color: '#E2E647',
                            title: 'This is a third title',
                            content: 'This is the third content'
                        })
                    }
                }
            }
        ]);
    },
    deleteNote(id: string){
        return new Promise((resolve, reject) => {
            if(id == '1'){
                return resolve(true);
            }

            reject(false);
        });
    },
    updateNote(id: string, value: any){
        return new Promise((resolve, reject) => {
            if(id == '1'){
                return resolve(true);
            }

            reject(false);
        });
    }
}
