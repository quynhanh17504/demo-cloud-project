import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 20 },   // tăng dần
    { duration: '1m', target: 50 },    // giữ 50 users
    { duration: '1m', target: 100 },   // đẩy cao hơn
    { duration: '30s', target: 0 },    // giảm
  ],
};

export default function () {
  let res = http.get('http://localhost:3000/heavy');

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1);
}