import {of} from 'rxjs';

export const ActivatedRouteStub = {
    data: of({
        data: {
            name: 'Test User',
            provider: 'password'
        },
        note: {
            payload: {
                id: '1',
                data: () => ({
                    color: '#F3778F',
                    title: 'This is a title',
                    content: 'This is the content'
                })
            }
        }
    })
};
