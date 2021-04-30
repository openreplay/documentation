const awsCloudfrontInvalidate = require('aws-cloudfront-invalidate');
const distributionId = process.env.AWS_DISTRIBUTION_ID;
awsCloudfrontInvalidate(distributionId).then((data) => {
    console.log('invalidation created', data.Invalidation.Id);
});
