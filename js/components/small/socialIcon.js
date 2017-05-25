// social media links and info
var social = [
    {
        name: "GitHub",
        url: "https://github.com/cathal-killeen",
        username: "cathal-killeen",
        icon: "fa-github",
        id: 1
    },
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/cathalkilleen/",
        username: "cathalkilleen",
        icon: "fa-linkedin",
        id: 2
    },
    {
        name: "AngelList",
        url: "https://angel.co/cathalkilleen",
        username: "cathalkilleen",
        icon: "fa-angellist",
        id: 3
    },
    {
        name: "Twitter",
        url: "https://twitter.com/cathalkilleen",
        username: "cathalkilleen",
        icon: "fa-twitter",
        id: 4
    }
]


app.component('socialIcon', {
    templateUrl: '../templates/social-icon.html',
    controller: Controller,
    bindings: {
        name: '@'
    }
});

Controller.$inject = ['$scope'];
function Controller($scope) {
    this.$onInit = function() {
        social.forEach(network => {
            if(network.name === this.name){
                $scope.info = network;
            }
        })
    }
}
