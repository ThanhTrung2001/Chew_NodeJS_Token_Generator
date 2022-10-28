const express = require('express');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');
const dotenv = require('dotenv');
const app = express();
dotenv.config(); // su dung cac bien .env
const port = process.env.PORT
const appID = process.env.APP_ID
const appCerti = process.env.APP_CERTIFICATE

const nocache = (_, res, next) => { // Middeware check kieu app, khong phai route
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
}

//generate token
const generateRTCToken = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const channelName = req.params.channel;
    if (!channelName) {
        return res.status(500).json({ 'error': 'channel is required' });
    }
    let uid = req.params.uid;
    if (!uid || uid === '') {
        return res.status(500).json({ 'error': 'uid is required' });
    }
    // get role
    let role;
    if (req.params.role === 'publisher') {
        role = RtcRole.PUBLISHER;
    } else if (req.params.role === 'audience') {
        role = RtcRole.SUBSCRIBER
    } else {
        return res.status(500).json({ 'error': 'role is incorrect' });
    }
    //expiretime
    let expireTime = req.query.expiry;
    if (!expireTime || expireTime === '') {
        expireTime = 3600;
    } else {
        expireTime = parseInt(expireTime, 10);
    }

    //
    const currentTime = Math.floor(Date.now() / 1000);
    const privilegeExpireTime = currentTime + expireTime;
    //build token
    let token;
    if (req.params.tokentype === 'userAccount') {
        token = RtcTokenBuilder.buildTokenWithAccount(appID, appCerti, channelName, uid, role, privilegeExpireTime);
    } else if (req.params.tokentype === 'uid') {
        token = RtcTokenBuilder.buildTokenWithUid(appID, appCerti, channelName, uid, role, privilegeExpireTime);
    } else {
        return res.status(500).json({ 'error': 'token type is invalid' });
    }
    //return token
    return res.json({ 'rtcToken': token });
}

app.get('/rtc/:channel/:role/:tokentype/:uid', nocache, generateRTCToken)

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});