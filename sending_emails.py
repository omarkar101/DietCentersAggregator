import smtplib

def sendEmail(emailAddress, message, subject=''):
  gmail_user = '299jaro@gmail.com'
  gmail_password = 'Jarocmps299'

  sent_from = gmail_user
  to = [emailAddress]
  body = message

  email_text = """\
  From: %s
  To: %s
  Subject: %s

  %s
  """ % (sent_from, ", ".join(to), subject, body)

  try:
    smtp_server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    smtp_server.ehlo()
    smtp_server.login(gmail_user, gmail_password)
    smtp_server.sendmail(sent_from, to, email_text)
    smtp_server.close()
    print ("Email sent successfully!")
  except Exception as ex:
    print ("Something went wrong….",ex)
