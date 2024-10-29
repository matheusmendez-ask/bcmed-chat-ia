const { logger } = require('~/config');
const mongoose = require('mongoose');

const bannerSchema = mongoose.Schema(
  {
    bannerId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    displayFrom: {
      type: Date,
      required: true,
      default: Date.now,
    },
    displayTo: {
      type: Date,
    },
    type: {
      type: String,
      enum: ['banner', 'popup'],
      default: 'banner',
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true },
);

const Banner = mongoose.model('Banner', bannerSchema);

Banner.on('index', (error) => {
  if (error) {
    logger.error(`Failed to create Banner index ${error}`);
  }
});

module.exports = Banner;
