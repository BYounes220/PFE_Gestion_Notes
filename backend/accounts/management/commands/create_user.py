from django.core.management.base import BaseCommand
from accounts.models import CustomUser

class Command(BaseCommand):
    help = 'Creates a new user with the specified user ID, role, and password.'

    def add_arguments(self, parser):
        parser.add_argument('user_id', type=str, help='The unique ID for the user')
        parser.add_argument('role', type=str, help='The role of the user (student, teacher, staff)')
        parser.add_argument('password', type=str, help='The password for the user')

    def handle(self, *args, **kwargs):
        user_id = kwargs['user_id']
        role = kwargs['role']
        password = kwargs['password']

        # Create the user
        user = CustomUser.objects.create_user(
            user_id=user_id,
            role=role,
            password=password
        )

        self.stdout.write(self.style.SUCCESS(f'Successfully created user: {user}'))