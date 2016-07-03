'use strict';

class BaseController {
  before(name, options = {}) {
    const { only, except } = options;
    this.__beforeFilters.push({ name, only, except });
  }

  reply(body, status = 200) {
    this.res.status(status).send(body);
  }

  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.__beforeFilters = [];
  }
}

module.exports = BaseController;
