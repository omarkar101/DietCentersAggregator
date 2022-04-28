import smtplib
  
def sendEmail(emailAddress, message):
  senderEmail = "299jaro@gmail.com"
  senderPassword = "Jarocmps299"
  # creates SMTP session
  s = smtplib.SMTP('smtp.gmail.com', 587)
  # start TLS for security
  s.starttls()
  # Authentication
  s.login(senderEmail,senderPassword)
  # sending the mail
  s.sendmail(senderEmail, emailAddress, message)
  # terminating the session
  s.quit()

