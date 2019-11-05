from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models


class UserManager(BaseUserManager):

   def create_user(self, username, email, password=None):
      if not email:
         raise ValueError("User must have an email address!")

      email = self.normalize_email(email)
      user = self.model(email=email, username=username)
      user.set_password(password)
      user.save(using=self._db)

      return user

   def create_superuser(self, username, email, password):
      user = self.create_user(email, username, password)
      user.is_superuser = True
      user.is_staff = True
      user.save(using=self._db)

      return user


class User(AbstractUser):
    email = models.EmailField(unique=True, verbose_name="E-mail Address")
    username = models.CharField(unique=True, max_length=150, blank=True)

    REQUIRED_FIELDS = ['username']
    USERNAME_FIELD = "email"

    objects = UserManager()

    def save(self, *args, **kwargs):
        if not self.username:
            import re
            self.username = re.sub("[^\w.@+-]", "", self.email.split("@")[0])

        from django.db import transaction

        with transaction.atomic():
            super().save(*args, **kwargs)

            from rest_framework.authtoken.models import Token

            Token.objects.get_or_create(user=self)

    def get_full_name(self):
        return f'{self.username}'.strip()

    def __str__(self):
        return  self.email

    class Meta:
        ordering = ("email",)
