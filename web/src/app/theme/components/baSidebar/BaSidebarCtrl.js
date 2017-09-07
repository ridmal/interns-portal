(function() {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .controller('BaSidebarCtrl', BaSidebarCtrl);

    /** @ngInject */
    function BaSidebarCtrl($scope, baSidebarService, AuthenticationService) {

        var removeIntern = [
            {name: "addtasks"}, {name: "register"}, {name: "viewuser"},{name:"internstasks"},{name:"home"},{name:"addReview"},{name:"registerinterviewee"}]; // removed routes for intern 
        var removePublic = [
            {name:"addtasks"},{name: "register"},{name:"profile"},{name:"viewuser"},{name:"viewtasks"},{name:"internstasks"}
            ,{name:"home"},{name:"addReview"}]; // removed routes for public user 
        var removeAdmins = [{name : "viewtasks"},{name : "internstasks"}]; // removed routes for  Admin
        var removeInterviwer = [{name:"addtasks"},{name: "register"},{name:"profile"},{name:"viewuser"},{name:"viewtasks"},{name:"internstasks"}
            ,{name:"home"},{name:"addReview"}]; // removed routes for Interviwer 

        $scope.menuItems = baSidebarService.getMenuItems();
        $scope.defaultSidebarState = $scope.menuItems[0].stateRef;
        var admin = AuthenticationService.isAdmin();
        var role = AuthenticationService.getRole();

        if (role==='INTERN'){
          _.each(removeIntern, function(item) {
              $scope.menuItems = _.without($scope.menuItems, _.findWhere($scope.menuItems, item));
          });
        }
        else if(role==='PUBLIC'){
        _.each(removePublic, function(item) {
              $scope.menuItems = _.without($scope.menuItems, _.findWhere($scope.menuItems, item));
          });
        }
        else if(role==='ADMIN') {
          _.each(removeAdmins, function(item) {
              $scope.menuItems = _.without($scope.menuItems, _.findWhere($scope.menuItems, item));
          });

        }
        else if(role==='INTERVIEWER'){
            _.each(removeInterviwer, function(item) {
                $scope.menuItems = _.without($scope.menuItems, _.findWhere($scope.menuItems, item));
          });
        }

        $scope.hoverItem = function($event) {
            $scope.showHoverElem = true;
            $scope.hoverElemHeight = $event.currentTarget.clientHeight;
            var menuTopValue = 66;
            $scope.hoverElemTop = $event.currentTarget.getBoundingClientRect().top - menuTopValue;
        };

        $scope.$on('$stateChangeSuccess', function() {
            if (baSidebarService.canSidebarBeHidden()) {
                baSidebarService.setMenuCollapsed(true);
            }
        });
    }
})();
