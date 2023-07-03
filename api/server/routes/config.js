const express = require('express');
const router = express.Router();

router.get('/', async function (req, res) {
  try {
    const appTitle = process.env.APP_TITLE || 'LibreChat';
    const googleLoginEnabled = !!process.env.GOOGLE_CLIENT_ID && !!process.env.GOOGLE_CLIENT_SECRET;
    const openidLoginEnabled = !!process.env.OPENID_CLIENT_ID
      && !!process.env.OPENID_CLIENT_SECRET
      && !!process.env.OPENID_ISSUER
      && !!process.env.OPENID_SESSION_SECRET;
    const openidLabel = process.env.OPENID_BUTTON_LABEL || 'Login with OpenID';
    const openidImageUrl = process.env.OPENID_IMAGE_URL;
    const serverDomain = process.env.DOMAIN_SERVER || 'http://localhost:3080';
    const registrationEnabled = process.env.ALLOW_REGISTRATION === 'true';

    return res.status(200).send({appTitle, googleLoginEnabled, openidLoginEnabled, openidLabel, openidImageUrl, serverDomain, registrationEnabled});
  } catch (err) {
    console.error(err);
    return res.status(500).send({error: err.message});
  }
});

module.exports = router;
