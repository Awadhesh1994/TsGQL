import * as SparkPost from 'sparkpost';
const client = new SparkPost(process.env.SPARKPOST_API_KEY);

export const emailSend = async (recipient: string, url: string) => {
    const res = await client.transmissions.send({
        options: {
            sandbox: true
        },
        content: {
            from: 'testing@sparkpostbox.com',
            subject: 'Confirm Your Email',
            html: `<html><head> <title></title> <style type="text/css"> body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}table, td{mso-table-lspace: 0pt; mso-table-rspace: 0pt;}img{-ms-interpolation-mode: bicubic;}img{border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;}table{border-collapse: collapse !important;}body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}a[x-apple-data-detectors]{color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important;}@media screen and (max-width:600px){h1{font-size: 32px !important; line-height: 32px !important;}}div[style*="margin: 16px 0;"]{margin: 0 !important;}</style></head><body style="background-color: #f3f5f7; margin: 0 !important; padding: 0 !important;" data-gr-c-s-loaded="true"> <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account. </div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tbody> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" align="center" style="padding: 0px 10px 0px 10px;"> <tbody> <tr> <td align="center" valign="top" style="padding: 80px 10px 80px 10px;"> <img alt="Logo" src="https://www.shareicon.net/download/2015/08/30/93008_email_512x512.png" style="display: block; font-family: 'Lato', Helvetica, Arial, sans-serif; color: #ffffff; font-size: 18px;" border="0"> </td></tr><tr> <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;"> <h1 style="font-size: 42px;     text-transform: capitalize;font-weight: 400; margin: 0;">Hi, Awadhesh Kumar </h1> </td></tr><tr> <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 25px;"> <p style="margin: 0;"></p></td></tr><tr> <td bgcolor="#ffffff" align="left"> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tbody> <tr> <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;"> <table border="0" cellspacing="0" cellpadding="0"> <tbody> <tr> <td align="center" style="border-radius: 3px;" bgcolor="#33cabb"> <a href="${url}" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 12px 50px; border-radius: 2px; border: 1px solid #33cabb; display: inline-block;">Confirm Account</a> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr><tr> <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 25px;"> <p style="margin: 0;">Awadhesh Kumar, <br>Tech Blog Team</p></td></tr></tbody> </table> </tbody> </table></body></html>`
        },
        recipients: [
            { address: recipient }
        ]
    });

    console.log(res);

};
