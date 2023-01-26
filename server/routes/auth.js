import express from 'express';
import {login} from '../controller/auth';

const router = express.Router();

router.post('/login',login)