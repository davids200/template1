
<html>
    <head>
        <style>
.main{
margin-top:20px;
width:400px;
background-color:#ccc;
padding:10px;
display: flex;
justify-content: center;
display: grid;
justify-items: center;
}
        </style>
        <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
        <title>
           Equity Bank - Uganda
        </title>
    </head>
    
    <body>
        <div class="main container">
 <h3>Send Message</h3>
 
 <form action="equity.php" method="post">     
<div class="row text-left" style="width:500px">
<div class="col-sm-12">
<label class="text-danger">Subject *</label>
<input type="text" class="form-control col-sm-10 alert-danger" placeholder="Subject" required name="subject" id="subject" value=""/>    
</div>
</div>
      
            
<div class="row text-left" style="width:500px">
<div class="col-sm-12">
<label class="text-danger">From *</label>
<input type="email" class="form-control col-sm-10 alert-danger" placeholder="Email from" 
required name="from" id="from" value=""/>    
</div>
</div>

<div class="row text-left" style="width:500px">
<div class="col-sm-12" style="width:100%">
<label class="text-danger">To *</label>
<input type="email" class="form-control col-sm-10 alert-danger" placeholder="Email to" required name="to" id="to" value=""/>    
</div>
</div>

<div class="row text-left" style="width:500px">
<div class="col-sm-12" style="width:100%">
<label class="text-danger">replyTo *</label>
<input type="email" class="form-control col-sm-10 alert-danger" placeholder="Reply to" required name="replyTo" id="replyTo" value=""/>    
</div>
</div>

<div class="row text-left" style="width:500px">
<div class="col-sm-12">
<label class="">CC</label>
<input type="email" class="form-control col-sm-10 " placeholder="CC (Optional)"  name="cc" id="cc" value=""/>    
</div>
</div>
    
<div class="row text-left" style="width:500px">
<div class="col-sm-12 required">
<label class="required">BCC</label>
<input type="email" class="form-control col-sm-10" placeholder="BCC (Optional)"  name="bcc" id="bcc"  value=""/>    
</div>
</div>      
          
 
<div class="row text-left" style="width:500px">
<div class="col-sm-12">
<label class="text-danger">Message *</label>
<textarea col="30" rows="7" name="message" id="message"required class="alert-danger form-control col-sm-12"></textarea> 
</div>
</div> 

<div class="row text-left" style="width:500px">
<div class="col-sm-12 required">
<label class="required">Attachment Link</label>
<input type="url" class="form-control col-sm-10" placeholder="Attachment link" required  name="attachment" id="attachment"  value=""/>    
</div>
</div>  
  
  
  <div class="row text-left" style="width:500px">
<div class="col-sm-12"> 
<input type="submit" value="Send Mail" name="submit" id="submit" class="btn btn-success" />
</div>
</div> 

</form>      
        
 <div class="text-left " style="width:500px">
    
    
<?php

if(isset($_POST['submit'])){
    $to = $_POST['to'];
    $sender = $_POST['from'];
    $attachment = $_POST['attachment'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];
    $replyTo = $_POST['replyTo'];
 
// Email message
$message = '<html><body>';
$message .= '<h1>Hello!</h1>';
$message .= '<p>This is an HTML email with an attachment.</p>';
$message .= '</body></html>';

// Attachment file path and name
//$attachment = '/path/to/attachment.pdf';

// Read the attachment file contents into a string
$file_content = file_get_contents($attachment);

// Encode the attachment file contents in base64 format
$file_content_encoded = base64_encode($file_content);

// Email headers
$headers = "From:  ".$sender."\r\n";
$headers .= "Reply-To: ".$replyTo."\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"boundary1\"\r\n";

// Email body
$body = "--boundary1\r\n";
$body .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
$body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$body .= $message . "\r\n\r\n";
$body .= "--boundary1\r\n";
$body .= "Content-Type: application/octet-stream; name=\"" . basename($attachment) . "\"\r\n";
$body .= "Content-Transfer-Encoding: base64\r\n";
$body .= "Content-Disposition: attachment\r\n\r\n";
$body .= $file_content_encoded . "\r\n";
$body .= "--boundary1--\r\n";

// Send the email
if (mail($to, $subject, $body, $headers)) {
    echo "<p class='padding-10 alert-success'>Email sent successfully.</p><br>";
    exit;
} else {
  echo "<p class='padding-10 alert-danger'>Error: Email not sent!</p><br>";
exit;
}
}
?>


 </div>       
        
        
        
        </div> 
    </body>
</html>











