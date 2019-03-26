const { Command } = require('discord.js-commando');
const ImageResize = require('../../lib/ImageResize');

class UpscaleCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'upscale',
      group: 'util',
      memberName: 'upscale',
      description: 'Upscale an image by a certain amount. Works best with pixel art. For anything else, it will be pixelated, but not too noticeably.',
      examples: [ '`upscale 3` - upscale an image 3 times its original size' ],
      args: [
        {
          key: 'scale',
          prompt: 'How many times the original size?',
          type: 'integer',
          min: 2
        }
      ]
    });
  }

  async run(message, { scale }) {
    if (!message.attachments.size) {
      return message.say(':warning: Please provide an image.');
    }

    const image = await message.attachments.first();
    const resizer = new ImageResize({
      id: image.id,
      url: image.url,
      originalWidth: image.width,
      originalHeight: image.height,
      width: image.width * scale,
      resamplingMethod: 'nearest',
      message,
      extension: image.filename.split('.').pop()
    });

    return resizer.init();
  }
};

module.exports = UpscaleCommand;
