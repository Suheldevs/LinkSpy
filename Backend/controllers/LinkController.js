const Link = require('../models/LinkModel');
const shortId = require('shortid');

const shortLinkGenrater = async (req, res) => {
  try {
    const { originalUrl ,email} = req.body;

    if (!originalUrl) {
      return res.status(400).json({ message: 'Please provide a URL' });
    }
    if (!email) {
      return res.status(400).json({ message: 'Please provide a Email' });
    }

    // Check if the original URL already exists in the database
    const existingLink = await Link.findOne({ originalUrl });
    if (existingLink) {
      return res.status(400).json({ message: 'URL already shortened' });
    }

    // Generate a short URL
    const shortUrl = shortId.generate();

    // Check if the short URL already exists in the database
    const existingShortUrl = await Link.findOne({ shortUrl });
    if (existingShortUrl) {
      // If the short URL is taken, generate a new one
      return shortLinkGenrater(req, res); // Recursive call to generate a new unique short URL
    }

    // Create and save the new URL
    const newUrl = new Link({
      email,
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
    res.status(500).json({ message: 'Internal server error', Error: err });
  }
};


const redirectToOriginalUrl = async (req, res) => {
    try {
      const { shortUrl } = req.params; 
      const link = await Link.findOne({shortUrl:shortUrl });
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      if (!link) {
        return res.status(404).json({ message: 'Short URL not found' });
      }
  
      
      link.clickCount += 1;
      link.clicks.push({
        ipAddress: ip,  
        accessedAt: new Date(),  
      });
  
      await link.save();
    
  res.redirect(link.originalUrl);

    } catch (err) {
      res.status(500).json({ message: 'Internal server error', error: err });
    }
  };
  
//get Shorturl by email
const shortUrlGetByEmail = async(req,res)=>{
try{
  const {email} = req.params;
  if(!email){
    return res.status(400).json({message:'Please provide a email'})
  }
  const links = await Link.find({email});
  if (links.length === 0) {
    return res.status(404).json({ message: 'No links found for the provided email' });
  }
  res.status(200).json({message:'Short url featch succefully',LinkData:links})
}
catch(err){
  res.status(500).json({message:'Internal server Error',Error:err});
}
}



module.exports = { shortLinkGenrater, redirectToOriginalUrl,shortUrlGetByEmail};
