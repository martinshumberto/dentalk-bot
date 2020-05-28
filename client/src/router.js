import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
    routes: [
        {
            path: '',
            component: () => import('@/layouts/FullPage.vue'),
            meta: {
                title: 'Home Page - Example App',
                rule: 'public'
            },
            children: [
                {
                    path: '/logar',
                    name: 'page-login',
                    component: () => import('@/pages/login/Login.vue'),
                    meta: {
                        rule: 'public'
                    },
                },
                {
                    path: '/recuperar-senha',
                    name: 'page-forgot-password',
                    component: () => import('@/pages/ForgotPassword.vue'),
                    meta: {
                        rule: 'public'
                    }
                },
                {
                    path: '/alterar-senha',
                    name: 'page-reset-password',
                    component: () => import('@/pages/ResetPassword.vue'),
                    meta: {
                        rule: 'admin'
                    }
                },
                {
                    path: '/error-404',
                    name: 'page-error-404',
                    component: () => import('@/pages/Error404.vue'),
                    meta: {
                        rule: 'public'
                    }
                },
                {
                    path: '/error-500',
                    name: 'page-error-500',
                    component: () => import('@/pages/Error500.vue'),
                    meta: {
                        rule: 'public'
                    }
                },
                {
                    path: '/nao-autorizado',
                    name: 'page-not-authorized',
                    component: () => import('@/pages/NotAuthorized.vue'),
                    meta: {
                        rule: 'public'
                    }
                },
                {
                    path: '/manutencao',
                    name: 'page-maintenance',
                    component: () => import('@/pages/Maintenance.vue'),
                    meta: {
                        rule: 'public'
                    }
                }
            ]
        },
    ]
});
