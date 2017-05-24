app.component('contact', {
    templateUrl: '../templates/contact.html',
    controller: Controller
});

Controller.$inject = ['$scope', '$http']
function Controller($scope, $http) {
    $scope.sent = false;
    $scope.error = "";

    $scope.contact = {
        name: "",
        email: "",
        message: ""
    }

    var validateMessage = function(){
        if($scope.contact.name.length > 0){
            if($scope.contact.email.length > 0){
                if($scope.contact.message.length > 0){
                    return true;
                }else{
                    $scope.error = "Please enter a message.";
                    return false;
                }
            }else{
                $scope.error = "Please enter an email.";
                return false;
            }
        }else{
            $scope.error = "Please enter a name.";
            return false;
        }
    }

    $scope.sendMessage = function() {
        $scope.sending = true;
        if(validateMessage()){
            $http({
                url: "http://formspree.io/" + "cathalkilleen+website" + "@" + "gmail" + "." + "com",
                data: $.param(
                    $scope.contact
                ),
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function(response){
                if(response.status == 200){
                    $scope.error = "";
                    $scope.sent = true;
                }
                console.log(response);
                $scope.sending = false;
            })
        }else{
            $scope.sending = false;
        }
    }
}
