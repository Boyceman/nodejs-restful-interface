import Router from 'koa-router'
import UserCtrl from '../controller/user'
import MediaCtrl from '../controller/media'

const router = new Router({ prefix: '/api/v1' })

router.post('/user/register', UserCtrl.register)
router.post('/user/login', UserCtrl.login)
router.get('/user/profile/:id', UserCtrl.profile)
router.get('/media', MediaCtrl.list)

export default router