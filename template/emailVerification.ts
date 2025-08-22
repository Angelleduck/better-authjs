export function EmailVerification(link: string) {
  return `
<html
  dir="ltr"
  lang="en">
  
  <body
    style="background-color:#ffffff">
    <table
      border="0"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      align="center">
      <tbody>
        <tr>
          <td
            style="background-color:#ffffff;font-family:HelveticaNeue,Helvetica,Arial,sans-serif">
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="max-width:360px;background-color:#ffffff;border:1px solid #eee;border-radius:5px;box-shadow:0 5px 10px rgba(20,50,70,.2);margin-top:20px;margin:0 auto;padding:68px 0 130px">
              <tbody>
                <tr style="width:100%">
                  <td>
                    
                    <p
                      style="font-size:11px;line-height:16px;color:#0a85ea;font-weight:700;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;height:16px;letter-spacing:0;margin:16px 8px 8px 8px;text-transform:uppercase;text-align:center;margin-top:16px;margin-right:8px;margin-bottom:8px;margin-left:8px ">
                      Verify Your Identity
                    </p>
                    <h1
                      style="color:#000;display:inline-block;font-family:HelveticaNeue-Medium,Helvetica,Arial,sans-serif;font-size:20px;font-weight:500;line-height:24px;margin-bottom:0;margin-top:0;text-align:center">
                      Click on the following link to verify your email.
                    </h1>
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="background:rgba(0,0,0,.05);border-radius:4px;margin:16px auto 14px;vertical-align:middle;width:280px">
                      <tbody>
                        <tr>
                          <td>
                            <a href="${link}" target="_blank"
                              style="font-size:32px;line-height:40px;color:#000;font-family:HelveticaNeue-Bold;font-weight:700;letter-spacing:6px;padding-bottom:8px;padding-top:8px;margin:0 auto;display:block;text-align:center;margin-top:0;margin-right:auto;margin-bottom:0;margin-left:auto;text-decoration:none">
                              verify
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <p
                      style="font-size:15px;line-height:23px;color:#444;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;letter-spacing:0;padding:0 40px;margin:0;text-align:center;margin-top:0;margin-bottom:0;margin-left:0;margin-right:0">
                      Not expecting this email?
                    </p>
                    <p
                      style="font-size:15px;line-height:23px;color:#444;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;letter-spacing:0;padding:0 40px;margin:0;text-align:center;margin-top:0;margin-bottom:0;margin-left:0;margin-right:0">
                      Ignore it
                      
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <p
              style="font-size:12px;line-height:23px;color:#000;font-weight:800;letter-spacing:0;margin:0;margin-top:20px;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;text-align:center;text-transform:uppercase;margin-bottom:0;margin-left:0;margin-right:0">
              Securely powered by Plaid.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <!--/$-->
  </body>
</html>
`;
}
