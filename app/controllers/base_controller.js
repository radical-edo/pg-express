'use strict';

class BaseController {
  before(name, options = { only: null, except: null }) {
    const { only, except } = options;
    this.__beforeFilters.push({ name, only, except });
  }

  reply(body, status = 200) {
    this.res.status(status).send(body);
    return null;
  }

  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.__beforeFilters = [];
  }
}

module.exports = BaseController;
