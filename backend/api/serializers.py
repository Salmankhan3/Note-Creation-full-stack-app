# The `UserSerializer` class is a Django REST framework serializer for the User model with fields for
# id, username, email, and password, and a create method to create a user instance.
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note


class UserSerializer(serializers.ModelSerializer):
    class Meta:
      model=User
      fields=['id','username','password']
      extra_kwargs={'password':{'write_only': True}}
    def create(self,validated_data):
       user=User.objects.create_user(**validated_data)
       return user

class NoteSerializer(serializers.ModelSerializer):
   class Meta:
      model=Note
      fields=['id','title','content','created_at','auther']
      extra_kwargs={'auther': {'read_only':True}}