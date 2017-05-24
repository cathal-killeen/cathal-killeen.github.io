// social media links and info
var social = [
    {
        name: "GitHub",
        url: "https://github.com/cathal-killeen",
        username: "cathal-killeen",
        icon: "fa-github"
    },
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/cathalkilleen/",
        username: "cathalkilleen",
        icon: "fa-linkedin"
    },
    {
        name: "AngelList",
        url: "https://angel.co/cathalkilleen",
        username: "cathalkilleen",
        icon: "fa-angellist"
    },
    {
        name: "Twitter",
        url: "https://twitter.com/cathalkilleen",
        username: "cathalkilleen",
        icon: "fa-twitter"
    }
]


app.component('socialIcon', {
    template: '<a ng-show="$ctrl.info" ng-href="{{$ctrl.info.url}}" target="_blank"><i class="fa" ng-class="$ctrl.info.icon"></i></a>',
    controller: function() {
        this.$onInit = function() {
            social.forEach(network => {
                if(network.name === this.name){
                    this.info = network;
                }
            })
        }
    },
    bindings: {
        name: '@'
    }
})
