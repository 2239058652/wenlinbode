import Main from '@/views/Main.vue';
import login from '@/views/login.vue';
import home_index from '@/views/home/home.vue';
import user_layout from '@/views/samples/user.vue';
import student_layout from '@/views/samples/student.vue';
import error_404 from '@/views/error-page/404.vue';
import error_403 from '@//views/error-page/403.vue';
import error_500 from '@/views/error-page/500.vue';
import locking_index from '@/views/main-components/lockscreen/components/locking-page.vue';
// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: login
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: error_404
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: error_403
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: error_500
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: locking_index
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
// export const otherRouter = {
//     path: '/',
//     name: 'otherRouter',
//     redirect: '/home',
//     component: Main,
//     children: [
//         { path: 'home', title: { i18n: 'home' }, name: 'home_index', component: resolve => { require(['@/views/home/home.vue'], resolve); } },
//         { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: resolve => { require(['@/views/own-space/own-space.vue'], resolve); } },
//         { path: 'order/:order_id', title: '订单详情', name: 'order-info', component: resolve => { require(['@/views/advanced-router/component/order-info.vue'], resolve); } }, // 用于展示动态路由
//         { path: 'shopping', title: '购物详情', name: 'shopping', component: resolve => { require(['@/views/advanced-router/component/shopping-info.vue'], resolve); } }, // 用于展示带参路由
//         { path: 'message', title: '消息中心', name: 'message_index', component: resolve => { require(['@/views/message/message.vue'], resolve); } }
//     ]
// };
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: { i18n: 'home' }, name: 'home_index', component: home_index }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/samples',
        icon: 'paper-airplane',
        name: 'samples',
        title: '管理系统',
        component: Main,
        children: [
            {
                path: 'user_layout',
                icon: 'compose',
                name: 'user_layout',
                title: '用户管理',
                component: user_layout
            },
            {
                path: 'student_layout',
                icon: 'compose',
                name: 'student_layout',
                title: '学生管理',
                component: student_layout
            }
        ]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];