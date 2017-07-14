angular
  .module('thrallbro')
  .component('characterList', {
    templateUrl: 'components/character-list/character-list.template.html',
    controllerAs: 'the',
    controller: function characterListController($http, $routeParams){
      // this.characters = [
      //   {
      //     //SAMPLE DATA
      //     name: 'nullsoldier',
      //     level: 5,
      //     is_online: false,
      //     steam_id: 123124352523,
      //     conan_id: 1,
      //     server_id: 1,
      //     last_online: 14322352,
      //     last_killed_by: null,
      //     x: 45.545,
      //     y: 8347.43,
      //     z: 232.64,
      //   }, {
      //     name: 'immotal',
      //     level: 34,
      //     is_online: true,
      //     steam_id: 67642313,
      //     conan_id: 2,
      //     server_id: 1,
      //     last_online: 1632200,
      //     last_killed_by: 1,
      //     x: 876.343,
      //     y: 6464.232,
      //     z: 1232.434,
      //   }
      // ];
      var self = this;

      self.isloading = true;
      function loadCharacterData() {
        $http.get('https://serverthrallapi.herokuapp.com/api/' + $routeParams.serverId + '/characters?private_secret=200cd768-5b1d-11e7-9e82-d60626067254').then(function(response) {
            self.characters = response.data;
            self.isloading = false;
            console.log(_.minBy(self.characters, 'conan_id'));
        })
        .catch(function(respone) {
          console.log("Error: Invalid charId in URL")
          self.isloading = false;
          self.fail = true;
        });
      }

      self.serverId = $routeParams.serverId;

      loadCharacterData();
      setInterval(loadCharacterData, 62000);

      this.roundConcatXYZ = function(x, y, z) {
        var xx = Math.round(x);
        var yy = Math.round(y);
        var zz = Math.round(z);
        var xyz = "(" + xx + ", " + yy + ", " + zz + ")";

        return xyz;
      }
    }
  });