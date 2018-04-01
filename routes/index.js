import Router from 'koa-router'
import userCtrl from '../controller/user'

const router = new Router()

router.post('/api/v1/user/register', userCtrl.register)
router.get('/api/v1/user/profile', userCtrl.profile)


export default router