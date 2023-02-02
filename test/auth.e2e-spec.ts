import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';
import { AuthDto } from '../src/auth/dto/auth.dto';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from '../src/auth/auth.constants';

const loginDto: AuthDto = {
	login: 'a2@a.ru',
	password: '1'
}

describe('Auth (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/auth/login (POST) - success', (done) => {
		request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDto)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.access_token).toBeDefined()
				done()
			})
	});

	it('/auth/login (POST) - email fail', () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({...loginDto, login: 'b'})
			.expect(401,{
				statusCode: 401,
				message: USER_NOT_FOUND_ERROR,
				error: "Unauthorized"
			})
	});

	it('/auth/login (POST) - password fail', () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({...loginDto, password: '34'})
			.expect(401,{
				statusCode: 401,
				message: WRONG_PASSWORD_ERROR,
				error: "Unauthorized"
			})
	});

	afterAll(() => {
		disconnect();
	})
});
