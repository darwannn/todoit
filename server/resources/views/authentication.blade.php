<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <link href="https://fonts.cdnfonts.com/css/gelion?styles=117682,117686,117678,117676" rel="stylesheet">
</head>

    <body
    style='font-family:Gelion, sans-serif; font-size: 18px;text-align: center; background-color: #f3f4f6; margin: 0; padding: 0;'>
    <table style='width: 100%;'>
        <tr>
            <td style='  vertical-align: middle;'>
                <table style=' margin:0 auto; padding: 50px 20px 80px 20px;'>
                    <tr>
                        <td>
                            <h2>ToDoIt</h2>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table
                                style='background-color: white!important; border-radius: 15px; padding: 100px 20px; width: 500px;'>
                                <tr>
                                    <td style='color:black!important; font-size: 14px;'>
                                        {{ $data['body'] }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <button style='width: 100%; margin: 20px 0; font-weight: 700px;  font-size: 16px;padding: 15px 0; border-radius: 10px;border:none;background-color: #9ca3af; color: white;'> <a style =' color: white; text-decoration: none' href={{ $data['link'] }}>Continue</a></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td style='color:black!important; font-size:13px!important;'>
                                        If the button does not work for any reason, you can <br> also paste the
                                        following into your browser:
                                    </td>
                                </tr>
                                <tr>
                                    <td style='padding-top:15px; color:black!important;'>
                                    <a style='font-size:13px!important; overflow-wrap: break-word;'  href= {{ $data['link'] }} >{{ $data['link'] }}</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr >
                        <td style='font-size:12px; padding-top:15px;'>
                            The link will expire after 15 minutes.
                        </td>
                    </tr>
                    <tr>
                        <td style='opacity: 0;'>
                            <script>
                                document.write(Date.now())
                            </script>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
