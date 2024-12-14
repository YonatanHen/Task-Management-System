import smtplib
import os

def send_email(task: str) -> None:
    """
    Function sends emails when a new task is added.

    Args:
        task (str): The name of the task that recently added.
    """
    SENDER_EMAIL_ID = os.environ.get("SENDER_EMAIL_ID")
    SENDER_EMAIL_PASSWORD = os.environ.get("SENDER_EMAIL_PASSWORD")
    RECIEVER_EMAIL = os.environ.get("RECIEVER_EMAIL")
    s = smtplib.SMTP('smtp.gmail.com', 587)
    
    s.starttls()
    
    s.login(SENDER_EMAIL_ID, SENDER_EMAIL_PASSWORD)
    
    subject = "New Task Notification"
    body = f"New task added: {task}"
    message = f"Subject: {subject}\n\n{body}"

    s.sendmail(SENDER_EMAIL_ID, RECIEVER_EMAIL, message)
    
    s.quit()