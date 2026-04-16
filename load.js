import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 20 },  // tăng lên 20 user
    { duration: '2m', target: 50 },  // giữ 50 user
    { duration: '1m', target: 0 },   // giảm về 0
  ],
};

export default function () {
  let res = http.get('http://localhost:3000/health');

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1);
}