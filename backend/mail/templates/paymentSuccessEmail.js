exports.paymentSuccessEmail = (name, amount, orderId, paymentId) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Payment Confirmation</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
  
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
  
            .message {
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 20px;
                color: #28a745;
            }
  
            .body {
                font-size: 16px;
                margin-bottom: 20px;
                text-align: left;
            }
  
            .highlight {
                font-weight: bold;
                color: #000000;
            }
  
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 30px;
                text-align: center;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <div class="message">Payment Received Successfully</div>
            <div class="body">
                <p>Dear ${name},</p>
                <p>Thank you for your payment of <span class="highlight">₹${amount}</span>. Your transaction has been successfully processed.</p>
                <p><strong>Order ID:</strong> ${orderId}<br/>
                <strong>Payment ID:</strong> ${paymentId}</p>
                <p>You can now access all the features and content associated with your enrollment.</p>
                <p>We’re excited to have you on board!</p>
            </div>
            <div class="support">
                If you have any questions or concerns, feel free to contact us at 
                <a href="mailto:pandeadarsh06@gmail.com">pandeadarsh06@gmail.com</a>.
            </div>
        </div>
    </body>
    
    </html>`;
  };
  