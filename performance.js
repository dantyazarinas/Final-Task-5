import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export let options = {
    vus: 1000,
    duration: '30s',
    iterations: 3500,
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
        'Response time is less than 2s': (r) => r.timings.duration < 2000,
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
        'Response time is less than 2s': (r) => r.timings.duration < 2000,
    });
    sleep(1);
}

export function handleSummary(data) {
    return {
      "report.html": htmlReport(data),
    };
  }
