import { expect } from 'chai';
import request from 'supertest';
import app from '../src/server';

describe('Server Status', () => {
  it('should login successfully with valid credentials', (done) => {
    request(app)
      .get('/')
      .end((err, res) => {
        console.log('res>>>>>>>', res);
        expect(res.body.message).to.equal('Hello, Restify with TypeScript!');
        done();
      });
  });
});

// describe('Login API', () => {
//   it('should login successfully with valid credentials', (done) => {
//     request(app)
//       .post('/api/login')
//       .send({ username: 'user1', password: 'password1' })
//       .end((err, res) => {
//         expect(res.status).to.equal(200);
//         expect(res.body.message).to.equal('Login successful');
//         done();
//       });
//   });

//   it('should fail login with invalid credentials', (done) => {
//     request(app)
//       .post('/api/login')
//       .send({ username: 'user1', password: 'wrongpassword' })
//       .end((err, res) => {
//         expect(res.status).to.equal(401);
//         expect(res.body.message).to.equal('Invalid credentials');
//         done();
//       });
//   });

//   it('should fail login with non-existent user', (done) => {
//     request(app)
//       .post('/api/login')
//       .send({ username: 'nonexistent', password: 'password' })
//       .end((err, res) => {
//         expect(res.status).to.equal(401);
//         expect(res.body.message).to.equal('Invalid credentials');
//         done();
//       });
//   });
// });
