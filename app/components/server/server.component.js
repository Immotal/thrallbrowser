angular
  .module('thrallbrowser')
  .component('server', {
    templateUrl: 'components/server/server.template.html',
    controllerAs: 'serverCtrl',
    controller: function serverController($q, $routeParams, serverthrallapi) {
      var self = this;

      self.isloading = true;
      self.serverId = $routeParams.serverId;
      self.sortLastOnline = '-last_online';
      self.sortOnline = '-is_online';
      self.server = null;
      self.characters = null;
      self.lastWipeDate = null;

      function loadData() {
        serverPromise = serverthrallapi.getServer(self.serverId);
        charPromise = serverthrallapi.getCharacters(self.serverId);

        $q.all([serverPromise, charPromise])
          .then(function(results) {
            server = results[0]
            characters = _.filter(results[1], function(c) {return c.is_online;});

            firstCharacter = _.minBy(characters, 'conan_id');
            if(firstCharacter != null) {
              self.lastWipeDate = moment.unix(firstCharacter.created).format('LL');
            }
            self.characters = characters;
            self.server = server
            self.isloading = false;
          })
          .catch(function(respone) {
            self.isloading = false;
            self.fail = true;
          });
      }

      loadData();
      setInterval(loadData, 62000);
    }
  });
