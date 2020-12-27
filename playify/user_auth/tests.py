from django.test import TestCase
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
# Create your tests here.

URL = "http://127.0.0.1:8000/"
LOGIN = "/login/"
REGISTER = "/register/"


class AuthTest (APITestCase):

    def test_create_user_1(self):
        # Every data is correct. 201 Creted response expected.
        url = reverse('register')
        data = {'username': 'exuser', 'password': 'acceptablepass123456',
                'password2': 'acceptablepass123456', 'email': 'exuser@example.com'}
        request = self.client.post(url, data, format='json')
        self.assertEqual(request.status_code, status.HTTP_201_CREATED)

    def test_create_user_2(self):
        # password2 doesn't match password. BAD Request expected.
        url = reverse('register')
        data = {'username': 'exuser', 'password': 'acceptablepass123456',
                'password2': 'notacceptablepass123456', 'email': 'exuser@example.com'}
        request = self.client.post(url, data, format='json')
        self.assertEqual(request.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_user_3(self):
        # Try to crete 2 user with same username. First request 201, second 400
        url = reverse('register')
        data = {'username': 'exuser3', 'password': 'acceptablepass123456',
                'password2': 'acceptablepass123456', 'email': 'difemail@example.com'}
        request = self.client.post(url, data, format='json')
        request2 = self.client.post(url, data, format='json')
        self.assertEqual(request.status_code, status.HTTP_201_CREATED)
        self.assertEqual(request2.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_user_4(self):
        # Unaccepted password: shortone. BAD request expected.
        url = reverse('register')
        data = {'username': 'exuser4', 'password': '123',
                'password2': '123', 'email': 'exuser@example.com'}
        request = self.client.post(url, data, format='json')
        self.assertEqual(request.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_1(self):
        # First create a user and then try to access to it. First 201 then 200 expected
        url_register = reverse('register')
        url_login = reverse('login')
        data_register = {'username': 'exuser', 'password': 'acceptablepass123456',
                         'password2': 'acceptablepass123456', 'email': 'exuser@example.com'}
        data_login = {'username': 'exuser', 'password': 'acceptablepass123456'}
        request_register = self.client.post(
            url_register, data_register, format='json')
        request_login = self.client.post(url_login, data_login, format='json')
        self.assertEqual(request_register.status_code, status.HTTP_201_CREATED)
        self.assertEqual(request_login.status_code, status.HTTP_200_OK)

    def test_login_2(self):
        # Try to join with wrong username. 201 -> 400 -> 200 Expected respectively.
        url_register = reverse('register')
        url_login = reverse('login')
        data_register = {'username': 'exuser', 'password': 'acceptablepass123456',
                         'password2': 'acceptablepass123456', 'email': 'exuser@example.com'}
        data_login_right = {'username': 'exuser',
                            'password': 'acceptablepass123456'}
        data_login_wrong = {'username': 'exuser222',
                            'password': 'acceptablepass123456'}
        request_register = self.client.post(
            url_register, data_register, format='json')
        # Wrong one
        request_login_wrong = self.client.post(
            url_login, data_login_wrong, format='json')
        # Right one
        request_login_right = self.client.post(
            url_login, data_login_right, format='json')
        self.assertEqual(request_register.status_code, status.HTTP_201_CREATED)
        self.assertEqual(request_login_wrong.status_code,
                         status.HTTP_400_BAD_REQUEST)
        self.assertEqual(request_login_right.status_code, status.HTTP_200_OK)

    def test_login_3(self):
        # Try to login with wrong password. 201 -> 400 -> 200 Expected respectively.
        url_register = reverse('register')
        url_login = reverse('login')
        data_register = {'username': 'exuser', 'password': 'acceptablepass123456',
                         'password2': 'acceptablepass123456', 'email': 'exuser@example.com'}
        data_login_right = {'username': 'exuser',
                            'password': 'acceptablepass123456'}
        data_login_wrong = {'username': 'exuser',
                            'password': 'wrongpass123456'}
        request_register = self.client.post(
            url_register, data_register, format='json')
        # Wrong one
        request_login_wrong = self.client.post(
            url_login, data_login_wrong, format='json')
        # Right one
        request_login_right = self.client.post(
            url_login, data_login_right, format='json')
        self.assertEqual(request_register.status_code, status.HTTP_201_CREATED)
        self.assertEqual(request_login_wrong.status_code,
                         status.HTTP_400_BAD_REQUEST)
        self.assertEqual(request_login_right.status_code, status.HTTP_200_OK)
