const routes = [
    {
        path: '/',
        component: () => import('@/layout/dashboard/DashboardLayout.vue'),
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: () => import('@/pages/Dashboard/Dashboard.vue')
            },
            {
                path: 'leads',
                name: 'Listagem de leads',
                component: () => import('@/pages/Leads/LeadsList.vue')
            },
            {
                path: 'agenda',
                name: 'Agenda',
                component: () => import('@/pages/Calendar/Calendar.vue')
            },
            {
                path: 'politica-de-privacidade',
                name: 'Política de privacidade',
                component: () => import('@/pages/PrivacyPolicy/PrivacyPolicy.vue')
            },
        ]
    },
    { path: '*', component: () => import('@/pages/NotFoundPage.vue') }
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
