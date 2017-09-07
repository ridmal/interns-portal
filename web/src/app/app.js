'use strict';

angular.module('BlurAdmin', [
        'ngAnimate',
        'ui.bootstrap',
        'ui.sortable',
        'ui.router',
        'ngTouch',
        'toastr',
        'smart-table',
        'xeditable',
        'ui.slimscroll',
        'ngJsTree',
        'permission', 'permission.ui',
        'angular-progress-button-styles',
        'BlurAdmin.authService',
        'BlurAdmin.printService',
        'BlurAdmin.S3UploadService',
        'BlurAdmin.commonservice',
        'BlurAdmin.signin',
        'BlurAdmin.theme',
        'BlurAdmin.pages',
        'ngFileUpload', // added for file uploads s3 backet
        'BlurAdmin.theme.components',
        'angular-loading-bar'

    ]).config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
    }])
    .run(function($rootScope, $state, PermRoleStore, AuthenticationService) {
        PermRoleStore.defineRole('AUTHORIZED', function() {
            return AuthenticationService.isLoggedIn();
        });

        PermRoleStore.defineRole('ADMIN', function() {
            let role =  AuthenticationService.getRole();
            if(role==='ADMIN')
            return true;
            else
            return false;
        });
        PermRoleStore.defineRole('INTERVIEWER', function() {
            let role =  AuthenticationService.getRole();
            if(role==='INTERVIEWER')
            return true;
            else
            return false;
        });
         PermRoleStore.defineRole('PUBLIC', function() {
            let role =  AuthenticationService.getRole();
            console.log(role);
            if(role==='PUBLIC')
            return true;
            else
            return false;
        });
         PermRoleStore.defineRole('INTERN', function() {
            let role =  AuthenticationService.getRole();
            if(role==='INTERN')
            return true;
            else
            return false;
        });

        $rootScope.$on('$stateChangeStart', function(evt, to, params) {
            if (to.redirectTo) {
                evt.preventDefault();
                $state.go(to.redirectTo, params, {
                    location: 'replace'
                });
            }
        });
    });
