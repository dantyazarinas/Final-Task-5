import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export let options = {
    vus: 1000,
    iterations: 3500,
    thresholds : {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['avg<2000'], // response API max 2s
    }
};

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
export function handleSummary(data) {
    return {
      "report.html": htmlReport(data),
    };
  };
