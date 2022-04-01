const express = require('express');
const sendGridEmail = require('@sendgrid/mail');
const sequelize = require('../../models/index');

const { EmailNotification, User, NotificationSetting } = sequelize.models;
const router = express.Router();

sendGridEmail.setApiKey(process.env.SENDGRID_API_KEY);

function getEmailHtml(
  logoText,
  logoLink,
  title,
  firstParagraph,
  secondParagraph,
  buttonLink,
  buttonText,
) {
  return `<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office"
  style="width:100%;font-family:Arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">

<head>
  <meta charset="UTF-8">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta content="telephone=no" name="format-detection">
  <title>New email template 2022-03-29</title>
  <!--[if (mso 16)]><style type="text/css">     a {text-decoration: none;}     </style><![endif]-->
  <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
  <!--[if gte mso 9]><xml> <o:OfficeDocumentSettings> <o:AllowPNG></o:AllowPNG> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]-->
  <style type="text/css">
    #outlook a {
      padding: 0;
    }

    .ExternalClass {
      width: 100%;
    }

    .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
      line-height: 100%;
    }

    .es-button {
      mso-style-priority: 100 !important;
      text-decoration: none !important;
    }

    a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
    }

    .es-desk-hidden {
      display: none;
      float: left;
      overflow: hidden;
      width: 0;
      max-height: 0;
      line-height: 0;
      mso-hide: all;
    }

    @media only screen and (max-width:600px) {

      p,
      ul li,
      ol li,
      a {
        font-size: 16px !important;
        line-height: 150% !important
      }

      h1 {
        font-size: 30px !important;
        text-align: center;
        line-height: 120% !important
      }

      h2 {
        font-size: 26px !important;
        text-align: center;
        line-height: 120% !important
      }

      h3 {
        font-size: 20px !important;
        text-align: center;
        line-height: 120% !important
      }

      h1 a {
        font-size: 30px !important
      }

      h2 a {
        font-size: 26px !important
      }

      h3 a {
        font-size: 20px !important
      }

      .es-header-body p,
      .es-header-body ul li,
      .es-header-body ol li,
      .es-header-body a {
        font-size: 16px !important
      }

      .es-footer-body p,
      .es-footer-body ul li,
      .es-footer-body ol li,
      .es-footer-body a {
        font-size: 16px !important
      }

      .es-infoblock p,
      .es-infoblock ul li,
      .es-infoblock ol li,
      .es-infoblock a {
        font-size: 12px !important
      }

      *[class="gmail-fix"] {
        display: none !important
      }

      .es-m-txt-c,
      .es-m-txt-c h1,
      .es-m-txt-c h2,
      .es-m-txt-c h3 {
        text-align: center !important
      }

      .es-m-txt-r,
      .es-m-txt-r h1,
      .es-m-txt-r h2,
      .es-m-txt-r h3 {
        text-align: right !important
      }

      .es-m-txt-l,
      .es-m-txt-l h1,
      .es-m-txt-l h2,
      .es-m-txt-l h3 {
        text-align: left !important
      }

      .es-m-txt-r img,
      .es-m-txt-c img,
      .es-m-txt-l img {
        display: inline !important
      }

      .es-button-border {
        display: block !important
      }

      .es-btn-fw {
        border-width: 10px 0px !important;
        text-align: center !important
      }

      .es-adaptive table,
      .es-btn-fw,
      .es-btn-fw-brdr,
      .es-left,
      .es-right {
        width: 100% !important
      }

      .es-content table,
      .es-header table,
      .es-footer table,
      .es-content,
      .es-footer,
      .es-header {
        width: 100% !important;
        max-width: 600px !important
      }

      .es-adapt-td {
        display: block !important;
        width: 100% !important
      }

      .adapt-img {
        width: 100% !important;
        height: auto !important
      }

      .es-m-p0 {
        padding: 0px !important
      }

      .es-m-p0r {
        padding-right: 0px !important
      }

      .es-m-p0l {
        padding-left: 0px !important
      }

      .es-m-p0t {
        padding-top: 0px !important
      }

      .es-m-p0b {
        padding-bottom: 0 !important
      }

      .es-m-p20b {
        padding-bottom: 20px !important
      }

      .es-mobile-hidden,
      .es-hidden {
        display: none !important
      }

      tr.es-desk-hidden,
      td.es-desk-hidden,
      table.es-desk-hidden {
        width: auto !important;
        overflow: visible !important;
        float: none !important;
        max-height: inherit !important;
        line-height: inherit !important
      }

      tr.es-desk-hidden {
        display: table-row !important
      }

      table.es-desk-hidden {
        display: table !important
      }

      td.es-desk-menu-hidden {
        display: table-cell !important
      }

      .es-menu td {
        width: 1% !important
      }

      table.es-table-not-adapt,
      .esd-block-html table {
        width: auto !important
      }

      table.es-social {
        display: inline-block !important
      }

      table.es-social td {
        display: inline-block !important
      }

      a.es-button,
      button.es-button {
        font-size: 20px !important;
        display: block !important;
        border-width: 10px 20px 10px 20px !important
      }
    }
  </style>
</head>

<body
  style="width:100%;font-family:Arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
  <div class="es-wrapper-color" style="background-color:#555555">
    <!--[if gte mso 9]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" color="#555555"></v:fill> </v:background><![endif]-->
    <table class="es-content" cellspacing="0" cellpadding="0" align="center"
      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
      <tr style="border-collapse:collapse">
        <td align="center" style="padding:0;Margin:0">
          <table class="es-content-body" cellspacing="0" cellpadding="0" align="center"
            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#F8F8F8;width:600px">
            <tr style="border-collapse:collapse">
              <td
                style="Margin:0;padding-left:10px;padding-right:10px;padding-top:20px;padding-bottom:20px;background-color:#191919"
                bgcolor="#191919" align="left">
                <table width="100%" cellspacing="0" cellpadding="0"
                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                  <tr style="border-collapse:collapse">
                    <td valign="top" align="center" style="padding:0;Margin:0;width:580px">
                      <table width="100%" cellspacing="0" cellpadding="0" role="presentation"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr style="border-collapse:collapse">
                          <td align="center" style="padding:0;Margin:0;font-size:0"><a target="_blank"
                              href="${logoLink}"
                              style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:Arial, sans-serif;font-size:14px;text-decoration:none;color:#3CA7F1"><h1>${logoText}</h1></a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr style="border-collapse:collapse">
              <td
                style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px;background-color:#3CA7F1"
                bgcolor="#ffcc99" align="left">
                <table width="100%" cellspacing="0" cellpadding="0"
                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                  <tr style="border-collapse:collapse">
                    <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
                      <table width="100%" cellspacing="0" cellpadding="0" role="presentation"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr style="border-collapse:collapse">
                          <td align="center" style="padding:0;Margin:0;padding-top:15px;padding-bottom:15px">
                            <div>
                              <h2
                                style="Margin:0;line-height:29px;mso-line-height-rule:exactly;font-family:Arial, sans-serif;font-size:24px;font-style:normal;font-weight:normal;color:#242424">
                                <span style="font-size:30px"><strong>${title}</strong></span><br>
                              </h2>
                            </div>
                          </td>
                        </tr>
                        <tr style="border-collapse:collapse">
                          <td align="center" style="padding:0;Margin:0;padding-left:10px">
                            <p
                              style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:Arial, sans-serif;line-height:21px;color:#242424">
                              ${firstParagraph}<br>
                            </p>
                            <p
                              style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:Arial, sans-serif;line-height:21px;color:#242424">
                              ${secondParagraph}<br></p>
                          </td>
                        </tr>
                        <tr style="border-collapse:collapse">
                          <td align="center"
                            style="Margin:0;padding-left:10px;padding-right:10px;padding-top:15px;padding-bottom:15px">
                            <span class="es-button-border"
                              style="border-style:solid;border-color:#2CB543;background:#191919 none repeat scroll 0% 0%;border-width:0px;display:inline-block;border-radius:20px;width:auto"><a
                                href="${buttonLink}" class="es-button" target="_blank"
                                style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'lucida sans unicode', 'lucida grande', sans-serif;font-size:18px;color:#FFFFFF;border-style:solid;border-color:#191919;border-width:10px 35px;display:inline-block;background:#191919 none repeat scroll 0% 0%;border-radius:20px;font-weight:normal;font-style:normal;line-height:22px;width:auto;text-align:center">
                                ${buttonText}</a></span>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr style="border-collapse:collapse">
              <td
                style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px;background-color:#F8F8F8"
                bgcolor="#f8f8f8" align="left">
                <table width="100%" cellspacing="0" cellpadding="0"
                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                  <tr style="border-collapse:collapse">
                    <td valign="top" align="center" style="padding:0;Margin:0;width:580px">
                      <table width="100%" cellspacing="0" cellpadding="0" role="presentation"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr style="border-collapse:collapse">
                          <td bgcolor="#f8f8f8" align="center"
                            style="Margin:0;padding-left:10px;padding-right:10px;padding-top:20px;padding-bottom:20px;font-size:0">
                            <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0"
                              role="presentation"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                              <tr style="border-collapse:collapse">
                                <td
                                  style="padding:0;Margin:0;border-bottom:1px solid #191919;background:#FFFFFF none repeat scroll 0% 0%;height:1px;width:100%;margin:0px">
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <table cellpadding="0" cellspacing="0" class="es-footer" align="center"
      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
      <tr style="border-collapse:collapse">
        <td align="center" style="padding:0;Margin:0">
          <table class="es-footer-body" cellspacing="0" cellpadding="0" align="center"
            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#242424;width:600px">
            <tr style="border-collapse:collapse">
              <td align="left" style="padding:20px;Margin:0">
                <table width="100%" cellspacing="0" cellpadding="0"
                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                  <tr style="border-collapse:collapse">
                    <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
                      <table width="100%" cellspacing="0" cellpadding="0"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr style="border-collapse:collapse">
                          <td align="center" style="padding:0;Margin:0;display:none"></td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <table class="es-content" cellspacing="0" cellpadding="0" align="center"
      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
      <tr style="border-collapse:collapse">
        <td align="center" style="padding:0;Margin:0">
          <table class="es-content-body"
            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px"
            cellspacing="0" cellpadding="0" align="center">
            <tr style="border-collapse:collapse">
              <td align="left"
                style="Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:30px">
                <table width="100%" cellspacing="0" cellpadding="0"
                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                  <tr style="border-collapse:collapse">
                    <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
                      <table width="100%" cellspacing="0" cellpadding="0"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr style="border-collapse:collapse">
                          <td align="center" style="padding:0;Margin:0;display:none"></td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    </td>
    </tr>
    </table>
  </div>
</body>

</html>`;
}

function getMessage(toEmailList, emailParams) {
  const {
    fromEmail,
    subject,
    logoText,
    logoLink,
    title,
    firstParagraph,
    secondParagraph,
    buttonLink,
    buttonText,
  } = emailParams;
  return {
    to: toEmailList,
    from: fromEmail,
    subject,
    html: getEmailHtml(
      logoText,
      logoLink,
      title,
      firstParagraph,
      secondParagraph,
      buttonLink,
      buttonText,
    ),
  };
}

/**
 * @openapi
 * /api/admin/send-email:
 *   post:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *     - Admin/EmailNotifications
 *     summary: Send out email to users
 *     requestBody:
 *       description: Email notification to send
 *       required: true
 *       content:
 *         application/json:
 *           examples:
 *             example1:
 *               summary: example1
 *               value:
 *                 emailNotificationId: 1
 *     responses:
 *       200:
 *         description: Emails sent
 */
router.post(
  '/admin/send-email',
  // eslint-disable-next-line consistent-return
  async (req, res) => {
    const { emailNotificationId } = req.body;

    const emailNotification = await EmailNotification.findOne({
      where: { id: emailNotificationId },
    }).catch((err) => {
      console.log('DB_ERROR: ', err);
      return res.status(500).send('INTERNAL_ERROR: ', err);
    });

    if (!emailNotification) return res.status(404).send('Email Notification Not Found');

    // get email list
    const emailListResult = await NotificationSetting.findAll({
      attributes: [],
      include: [{ model: User, attributes: ['email'] }],
      where: { setting: emailNotification.setting, enabled: true },
    });

    const toEmailList = [];
    emailListResult.forEach((n) => {
      toEmailList.push(n.User.email);
    });

    // Nobody wants this email notification
    if (toEmailList.length === 0) {
      return res.status(200).json({ message: 'Email sent successfully' });
    }

    const message = getMessage(toEmailList, emailNotification);

    try {
      await sendGridEmail.sendMultiple(message);

      // update 'sent' for this email notification
      emailNotification.sent = true;

      const savedEmailNotification = await emailNotification.save().catch((err) => {
        console.log('Error: ', err);
        res.status(500).json({ error: 'Cannot update email notification sent value at the moment!' });
      });

      if (!savedEmailNotification) return res.status(500).json({ error: 'Cannot update email notification sent value at the moment!' });
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email');
      console.error(error);
      if (error.response) {
        console.error(error.response.body);
      }
      res.status(500).json({ message: 'Error sending email' });
    }
  },
);

/**
 * @openapi
 * /api/admin/email-notifications:
 *   post:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *     - Admin/EmailNotifications
 *     summary: Create new email notification
 *     requestBody:
 *       description: Email notification content
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmailNotificationInSchema'
 *           examples:
 *             example1:
 *               summary: example1
 *               value:
 *                 setting: 'General'
 *                 fromEmail: 'resilience@inl.gov'
 *                 subject: 'Test subject'
 *                 logoText: 'INL Resilience Indicator'
 *                 logoLink: 'https://resilience.inl.gov/'
 *                 title: 'Test title'
 *                 firstParagraph: 'Test first paragraph'
 *                 secondParagraph: 'Test second paragraph'
 *                 buttonLink: 'https://www.google.com/'
 *                 buttonText: 'Test button text'
 *     responses:
 *       201:
 *         description: Email notification created
 *
 * components:
 *   schemas:
 *     EmailNotificationInSchema:
 *       title: EmailNotificationInSchema
 *       type: object
 *       properties:
 *         setting:
 *           type: string
 *           description: The setting for the email
 *         fromEmail:
 *           type: string
 *           description: The email of the sender
 *         subject:
 *           type: string
 *           description: The subject of the email
 *         logoText:
 *           type: string
 *           description: The logo text of the email
 *         logoLink:
 *           type: string
 *           description: The link for the logo
 *         title:
 *           type: string
 *           description: The title of the email
 *         firstParagraph:
 *           type: string
 *           description: The first paragraph of the email
 *         secondParagraph:
 *           type: string
 *           description: The second paragraph of the email
 *         buttonLink:
 *           type: string
 *           description: The link of the button of the email
 *         buttonText:
 *           type: string
 *           description: The text of the button of the email
 */
router.post(
  '/admin/email-notifications',
  async (req, res) => {
    const {
      setting,
      fromEmail,
      subject,
      logoText,
      logoLink,
      title,
      firstParagraph,
      secondParagraph,
      buttonLink,
      buttonText,
    } = req.body;

    const newEmailNotification = new EmailNotification({
      sent: false,
      setting,
      fromEmail,
      subject,
      logoText,
      logoLink,
      title,
      firstParagraph,
      secondParagraph,
      buttonLink,
      buttonText,
    });
    const savedEmailNotification = await newEmailNotification.save().catch((err) => {
      console.log('Error: ', err);
      res.status(500).json({ error: 'Cannot save new email notification at the moment!' });
    });

    if (!savedEmailNotification) return res.status(500).json({ error: 'Cannot save new email notification at the moment!' });
    return res.status(201).json({ message: 'Email notification created!' });
  },
);

/**
 * @openapi
 * /api/admin/email-notifications:
 *   get:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *     - Admin/EmailNotifications
 *     summary: Get all email notification objects
 *     responses:
 *       200:
 *         description: Returns all email notification objects
 */
router.get(
  '/admin/email-notifications',
  async (req, res) => {
    const results = await EmailNotification.findAll()
      .catch((err) => res.status(500).send('INTERNAL_ERROR: ', err));

    if (!results) return res.status(404).send('No results found');

    return res.status(200).json(results);
  },
);

/**
 * @openapi
 * /api/admin/email-notifications/{id}:
 *   put:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *     - Admin/EmailNotifications
 *     summary: Update email notifications
 *     parameters:
 *     - name: id
 *       description: Email notification id
 *       in: path
 *       required: true
 *       type: int
 *     requestBody:
 *       description: Updated email notification
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmailNotificationInSchema'
 *           examples:
 *             example1:
 *               summary: example1
 *               value:
 *                 setting: 'Financial'
 *                 fromEmail: 'resilience@inl.gov'
 *                 subject: 'Test updated subject'
 *                 logoText: 'INL Resilience Indicator update'
 *                 logoLink: 'https://www.google.com/'
 *                 title: 'Test updated title'
 *                 firstParagraph: 'Test updated first paragraph'
 *                 secondParagraph: 'Test updated second paragraph'
 *                 buttonLink: 'https://resilience.inl.gov/'
 *                 buttonText: 'Test updated button text'
 *     responses:
 *       200:
 *         description: Email notification updated
 */
router.put(
  '/admin/email-notifications/:id',
  async (req, res) => {
    const {
      setting,
      fromEmail,
      subject,
      logoText,
      logoLink,
      title,
      firstParagraph,
      secondParagraph,
      buttonLink,
      buttonText,
    } = req.body;

    // ensure email notification exists
    const emailNotificationResult = await EmailNotification.findOne({
      where: { id: req.params.id },
    });
    if (!emailNotificationResult) return res.status(404).send(`Email notification id ${req.params.id} Not Found`);

    // update email notification
    emailNotificationResult.setting = setting;
    emailNotificationResult.fromEmail = fromEmail;
    emailNotificationResult.subject = subject;
    emailNotificationResult.logoText = logoText;
    emailNotificationResult.logoLink = logoLink;
    emailNotificationResult.title = title;
    emailNotificationResult.firstParagraph = firstParagraph;
    emailNotificationResult.secondParagraph = secondParagraph;
    emailNotificationResult.buttonLink = buttonLink;
    emailNotificationResult.buttonText = buttonText;

    const savedEmailNotification = await emailNotificationResult.save().catch((err) => {
      console.log('Error: ', err);
      res.status(500).json({ error: 'Cannot update email notification at the moment!' });
    });

    if (!savedEmailNotification) return res.status(500).json({ error: 'Cannot update email notification at the moment!' });
    return res.status(200).json({ message: 'Email notification updated!' });
  },
);

/**
 * @openapi
 * /api/admin/email-notifications/preview/{id}:
 *   get:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *     - Admin/EmailNotifications
 *     summary: Get html preview for this email notification
 *     parameters:
 *     - name: id
 *       description: Email notification id
 *       in: path
 *       required: true
 *       type: int
 *     responses:
 *       200:
 *         description: Html for email notification
 */
router.get(
  '/admin/email-notifications/preview/:id',
  async (req, res) => {
    // ensure email notification exists
    const emailNotificationResult = await EmailNotification.findOne({
      where: { id: req.params.id },
    });
    if (!emailNotificationResult) return res.status(404).send(`Email notification id ${req.params.id} Not Found`);

    const message = getMessage([], emailNotificationResult);

    return res.status(200).json({ __html: message.html });
  },
);

/**
 * @openapi
 * /api/admin/email-notifications/{id}:
 *   delete:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *     - Admin/EmailNotifications
 *     summary: Delete email notification
 *     parameters:
 *     - name: id
 *       description: Email notification id
 *       in: path
 *       required: true
 *       type: int
 *     responses:
 *       200:
 *         description: Email notification deleted
 */
router.delete(
  '/admin/email-notifications/:id',
  async (req, res) => {
    // ensure email notification exists
    const emailNotificationResult = await EmailNotification.findOne({
      where: { id: req.params.id },
    });
    if (!emailNotificationResult) return res.status(404).send(`Email notification id ${req.params.id} Not Found`);

    // delete email notification
    const deleted = await emailNotificationResult.destroy().catch((err) => {
      console.log('Error: ', err);
      res.status(500).json({ error: 'Cannot delete email notification at the moment!' });
    });

    if (!deleted) return res.status(500).json({ error: 'Cannot delete email notification at the moment!' });
    return res.status(200).json({ message: 'Email notification deleted!' });
  },
);

/**
 * @openapi
 * /api/admin/email-notifications:
 *   delete:
 *     security:
 *       - cookieAuth: []
 *     tags:
 *     - Admin/EmailNotifications
 *     summary: Bulk delete email notifications
 *     requestBody:
 *       description: Email notification ids to be deleted
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmailNotificationsBulkDeleteInSchema'
 *           examples:
 *             example1:
 *               summary: example1
 *               value:
 *                 ids: [1, 2, 3]
 *     responses:
 *       200:
 *         description: Email notifications deleted
 *
 * components:
 *   schemas:
 *     EmailNotificationsBulkDeleteInSchema:
 *       title: EmailNotificationsBulkDeleteInSchema
 *       type: object
 *       properties:
 *         ids:
 *           type: array
 *           description: Email notification ids to be deleted
 *           items:
 *             type: int
 */
router.delete(
  '/admin/email-notifications',
  async (req, res) => {
    const { ids } = req.body;

    ids.forEach(async (id) => {
      // ensure category exists
      const emailNotificationResult = await EmailNotification.findOne({
        where: { id },
      });
      if (!emailNotificationResult) {
        console.log(`Email notification id ${req.params.id} Not Found`);
        return; // equivalent to continue in conventional for loop
      }

      // delete email notification
      const deleted = await emailNotificationResult.destroy().catch((err) => {
        console.log('Error: ', err);
        res.status(500).json({ error: 'Cannot delete email notification at the moment!' });
      });

      if (!deleted) res.status(500).json({ error: 'Cannot delete email notification at the moment!' });
    });

    return res.status(200).json({ message: 'Email notifications deleted!' });
  },
);

module.exports = router;
