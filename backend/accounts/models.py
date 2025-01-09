from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class CustomUserManager(BaseUserManager):
    """Custom manager for the user model."""
    def create_user(self, user_id, role, password=None, **extra_fields):
        if not user_id:
            raise ValueError("The User ID must be provided")
        if not role:
            raise ValueError("The Role must be provided")
        
        user = self.model(user_id=user_id, role=role, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, user_id, role, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(user_id, role, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    """Custom User model."""
    ROLE_CHOICES = [
        ('student', 'Student'),
        ('teacher', 'Teacher'),
        ('staff', 'Staff'),
    ]
    
    user_id = models.CharField(max_length=10, unique=True,primary_key=True)  # Unique ID for the user
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)  # Role of the user
    is_active = models.BooleanField(default=True)  # Active status
    is_staff = models.BooleanField(default=False)  # Staff status for admin access
    is_superuser = models.BooleanField(default=False)  # Superuser access

    objects = CustomUserManager()

    USERNAME_FIELD = 'user_id'  # Field used for login
    REQUIRED_FIELDS = ['role']  # Required fields when creating a user

    def __str__(self):
        return f"{self.user_id} ({self.role})"
