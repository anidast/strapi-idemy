'use strict';

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#cron-tasks
 */

module.exports = {
  '*/1 * * * *': async () => {
    // fetch articles to publish
    const draftArticleToPublish = await strapi.api.courses.services.courses.find({
      _publicationState: 'preview',
      publish_at_lt: new Date(),
    });

    // update published_at of articles
    draftArticleToPublish.forEach(async courses => {
      await strapi.api.courses.services.courses.update(
        { id: courses.id },
        { published_at: new Date() }
      );
    });
  },
};
