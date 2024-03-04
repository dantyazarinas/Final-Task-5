import http from 'k6/http';
import { check, sleep, group } from 'k6';

export default function () {  
    group('API Create', function () {        
    const url = 'https://reqres.in/api/users';
    const payload = JSON.stringify({
        name: 'morpheus',
        job: 'leader'
    });
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    let res = http.post(url, payload, params);
    check(res, {
        'response code was 201': (res) => res.status == 201,
    });
    check(res, {
        'response name should same with requests': (res) => {
            const response = JSON.parse(res.body);
            return response.name == 'morpheus'
        },
    })
    check(res, {
        'response job should same with requests': (res) => {
            const response = JSON.parse(res.body);
            return response.job == 'leader'
        },
    });
});
    sleep(1);
    
    group('API Update', function () {
    const url = 'https://reqres.in/api/users/2';
    const payload = JSON.stringify({
        name: 'morpheus',
        job: 'zion resident'
    });
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    let res = http.put(url, payload, params);
    check(res, {
        'response code was 200': (res) => res.status == 200,
    });
    check(res, {
        'response name should same with requests': (res) => {
            const response = JSON.parse(res.body);
            return response.name == 'morpheus'
        },
    })
    check(res, {
        'response job should same with requests': (res) => {
            const response = JSON.parse(res.body);
            return response.job == 'zion resident'
        },
    });
});
    sleep(1);
}
