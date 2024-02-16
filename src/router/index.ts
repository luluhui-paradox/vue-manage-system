import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { usePermissStore } from '../store/permiss';
import Home from '../views/home.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/dashboard',
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                meta: {
                    title: '系统首页',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/dashboard.vue'),
            },
            {
                path: '/usermanage',
                name: 'usermanage',
                meta: {
                    title: '用户管理',
                    permiss: '2',
                },
                component: () => import(/* webpackChunkName: "table" */ '../views/usermanage.vue'),
            },
            {
                path: '/tabs',
                name: 'tabs',
                meta: {
                    title: '站内消息',
                    permiss: '3',
                },
                component: () => import(/* webpackChunkName: "tabs" */ '../views/tabs.vue'),
            },
            {
                path: '/user',
                name: 'user',
                meta: {
                    title: '个人中心',
                },
                component: () => import(/* webpackChunkName: "user" */ '../views/user.vue'),
            },
            {
                path: '/stereomatch',
                name: 'stereomatch',
                meta: {
                    title: '林木三维测量',
                },
                component: () => import(/* webpackChunkName: "stereomatch" */ '../views/stereomatch.vue'),
            },
            {
                path: '/leafRecognize',
                name: 'leafRecognize',
                meta: {
                    title: '林木叶片识别',
                },
                component: () => import(/* webpackChunkName: "leafRecognize" */ '../views/leafRecognize.vue'),
            },
            {
                path: '/workHistory',
                name: 'workHistory',
                meta: {
                    title: '历史查询',
                },
                component: () => import(/* webpackChunkName: "leafRecognize" */ '../views/workHistory.vue'),
            },
        ],
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '登录',
        },
        component: () => import(/* webpackChunkName: "login" */ '../views/login.vue'),
    },
    {
        path: '/403',
        name: '403',
        meta: {
            title: '没有权限',
        },
        component: () => import(/* webpackChunkName: "403" */ '../views/403.vue'),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('ms_username');
    const permiss = usePermissStore();
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permiss && !permiss.key.includes(to.meta.permiss)) {
        // 如果没有权限，则进入403
        next('/403');
    } else {
        next();
    }
});

export default router;
