const Link = require('../models/LinkModel');
const shortId = require('shortid');

const shortLinkGenrater = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    console.log(originalUrl);

    if (!originalUrl) {
      return res.status(400).json({ message: 'Please provide a URL' });
    }

    // Check if the original URL already exists in the database
    const existingLink = await Link.findOne({ originalUrl });
    if (existingLink) {
      return res.status(400).json({ message: 'URL already shortened' });
    }

    // Generate a short URL
    const shortUrl = shortId.generate();
    console.log('Generated short URL:', shortUrl);

    // Check if the short URL already exists in the database
    const existingShortUrl = await Link.findOne({ shortUrl });
    if (existingShortUrl) {
      // If the short URL is taken, generate a new one
      return shortLinkGenrater(req, res); // Recursive call to generate a new unique short URL
    }

    // Create and save the new URL
    const newUrl = new Link({
      originalUrl,
      shortUrl,
    });

    const newUrlSave = await newUrl.save();
    if (newUrlSave) {
      return res.status(200).json({
        message: 'URL created successfully',
        Data: shortUrl,
      });
    }

    res.status(400).json({ message: 'Error in creating URL' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error', Error: err });
  }
};


const redirectToOriginalUrl = async (req, res) => {
    try {
      const { shortUrl } = req.params; 
      const link = await Link.findOne({ shortUrl:shortUrl });
      console.log(link);
      if (!link) {
        return res.status(404).json({ message: 'Short URL not found' });
      }
  
      
      link.clickCount += 1;
      link.clicks.push({
        ipAddress: req.ip,  
        accessedAt: new Date(),  
      });
  
      await link.save();
    
  res.redirect(link.originalUrl);

    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error', error: err });
    }
  };
  




module.exports = { shortLinkGenrater, redirectToOriginalUrl};
