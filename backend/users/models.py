from django.db import models
from django.contrib.auth.models import (BaseUserManager, AbstractBaseUser,
    PermissionsMixin)

class CustomUserManager(BaseUserManager):
    def create_user(self, univ_roll, password, name, stream):
        if not univ_roll:
            raise ValueError('University roll no. is required')

        if not stream:
            raise ValueError('Stream is required')

        if not password:
            raise ValueError('Password is required')
        user = self.model(
            univ_roll=univ_roll, stream=stream, password=password,name=name
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, univ_roll, password, stream):
        user = self.create_user(
            univ_roll, password, stream
        )
        user.set_password(password)
        user.is_staff = True
        user.is_admin = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser, PermissionsMixin):
    univ_roll = models.CharField(
        verbose_name='University roll number',
        unique=True,
        max_length=11,
    )
    name = models.CharField(
        verbose_name='Name',
        max_length=20,
    )

    stream = models.CharField(
        verbose_name='Stream',
        max_length=3,
    )

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    objects = CustomUserManager()

    USERNAME_FIELD = 'univ_roll'
    REQUIRED_FIELDS = ['stream']

    def __str__(self):
        return self.name

    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.name[:5]

    # @property
    # def is_superuser(self):
    #     return self.is_admin
    #
    # @property
    # def is_staff(self):
    #    return self.is_admin
    #
    # def has_perm(self, perm, obj=None):
    #    return self.is_admin
    #
    # def has_module_perms(self, app_label):
    #    return self.is_admin
    #
    # @is_staff.setter
    # def is_staff(self, value):
    #     self._is_staff = value
