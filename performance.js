import http from 'k6/http';
import { check, sleep } from 'k6';
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

export function handleSummary(data) {
    return {
      "report.html": htmlReport(data),
    };
  };
