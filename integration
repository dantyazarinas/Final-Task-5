import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    let url = 'https://reqres.in/api/users';
    let payload = JSON.stringify({
        name: 'morpheus',
        job: 'leader'
    });
    let params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    let res = http.post(url, payload, params);
    check(res, {
        'API create is successful': (r) => r.status === 201,
    });
    sleep(1);
    
    url = 'https://reqres.in/api/users/2';
    payload = JSON.stringify({
        name: 'morpheus',
        job: 'zion resident'
    });
    res = http.put(url, payload, params);
    check(res, {
        'API update is successful': (r) => r.status === 200,
    });
    sleep(1);
}
