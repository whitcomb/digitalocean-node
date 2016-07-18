(function() {
  var slice = [].slice,
    util = require('./util');

  /**
    * Domain resource
    * @class Domain
    */
  var Domain = (function() {
    function Domain(client) {
      this.client = client;
    }

    /**
     * List domain objects.
     *
     * @param {(number|object)} [page or queryObject] - page number to retrieve or key value pairs of query parameters
     * @param {number} [perPage] - number of result per page to retrieve
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof Domain
     */
    Domain.prototype.list = function() {
      var args = util.extractListArguments(arguments, 0);
      return this.client.get.apply(this.client, ['/domains', {}].concat(slice.call(args.params), [200, 'domains', args.callback]));
    };

    /**
     * Create a domain object.
     *
     * @param {object} attributes - The attributes with which to create the domain. See the {@link https://developers.digitalocean.com/documentation/v2/#domains|official docs} for valid attributes.
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof Domain
     */
    Domain.prototype.create = function(attributes, callback) {
      return this.client.post('/domains', attributes, 201, 'domain', callback);
    };

    /**
     * Get the identified domain object.
     *
     * @param {string} name - The name of the domain to retrieve
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof Domain
     */
    Domain.prototype.get = function(name, callback) {
      var url = util.safeUrl('domains', name);
      return this.client.get(url, {}, 200, 'domain', callback);
    };

    /**
     * Delete the identified domain object.
     *
     * @param {string} name - The name of the domain to delete
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof Domain
     */
    Domain.prototype.delete = function(name, callback) {
      var url = util.safeUrl('domains', name);
      return this.client.delete(url, {}, 204, [], callback);
    };

    /**
     * List domain record objects.
     *
     * @param {string} domainName - name of domain for which to retrieve records
     * @param {(number|object)} [page or queryObject] - page number to retrieve or key value pairs of query parameters
     * @param {number} [perPage] - number of result per page to retrieve
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof Domain
     */
    Domain.prototype.listRecords = function() {
      var args = util.extractListArguments(arguments, 1);
      var url = util.safeUrl('domains', args.identifier, 'records');

      return this.client.get.apply(this.client, [url, {}].concat(slice.call(args.params), [200, 'domain_records', args.callback]));
    };

    /**
     * Get the identified domain record object.
     *
     * @param {string} domainName - The name of the domain for which to retrieve a record
     * @param {number} id - The id of the domain record to retrieve
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof Domain
     */
    Domain.prototype.getRecord = function(domainName, id, callback) {
      var url = util.safeUrl('domains', domainName, 'records', id);
      return this.client.get(url, {}, 200, 'domain_record', callback);
    };

    /**
     * Create a record object in a domain.
     *
     * @param {string} domainName - The name of the domain for which to create a record
     * @param {object} attributes - The attributes with which to create the domain record. See the {@link https://developers.digitalocean.com/documentation/v2/#domain-records|official docs} for valid attributes.
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof Domain
     */
    Domain.prototype.createRecord = function(domainName, attributes, callback) {
      var url = util.safeUrl('domains', domainName, 'records');
      return this.client.post(url, attributes, 201, 'domain_record', callback);
    };

    /**
     * Update the identified record object in a domain.
     *
     * @param {string} domainName - The name of the domain for which to update the record
     * @param {number} id - The id of the domain record to retrieve
     * @param {object} attributes - The attributes with which to update the domain record. See the {@link https://developers.digitalocean.com/documentation/v2/#domain-records|official docs} for valid attributes.
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof Domain
     */
    Domain.prototype.updateRecord = function(domainName, id, attributes, callback) {
      var url = util.safeUrl('domains', domainName, 'records', id);
      return this.client.put(url, attributes, 200, 'domain_record', callback);
    };

    /**
     * Delete the identified domain record object.
     *
     * @param {string} domainName - The name of the domain for which to delete a record
     * @param {number} id - The id of the domain record to retrieve
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof Domain
     */
    Domain.prototype.deleteRecord = function(domainName, id, callback) {
      var url = util.safeUrl('domains', domainName, 'records', id);
      return this.client.delete(url, {}, 204, [], callback);
    };

    return Domain;
  })();

  module.exports = Domain;
}).call(this);