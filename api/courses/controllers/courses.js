'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      data.teacher = ctx.state.user.id;
      entity = await strapi.services.courses.create(data, { files });
    } else {
      ctx.request.body.teacher = ctx.state.user.id;
      entity = await strapi.services.courses.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.courses });
  },

  async update(ctx) {
    const { id } = ctx.params;

    let entity;

    const [courses] = await strapi.services.courses.find({
      id: ctx.params.id,
      'teacher.id': ctx.state.user.id,
    });

    if (!courses) {
      return ctx.unauthorized(`You can't update this entry`);
    }

    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.courses.update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.courses.update({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.courses });
  },
};
