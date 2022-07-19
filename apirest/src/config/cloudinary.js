const cloudinary = require("cloudinary").v2;
cloudinary.config({ 
    cloud_name: 'hlapsy6v6', 
    api_key: '641649634373135', 
    api_secret: 'CinBQY3xLJNPiJOV0qRlL-plKXE' 
});

module.exports = cloudinary;