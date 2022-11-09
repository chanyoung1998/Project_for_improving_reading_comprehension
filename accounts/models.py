from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator


class User(AbstractUser):
    nickname = models.CharField(max_length=45, null=False, default="")
    name = models.CharField(max_length=45, null=False, default="")
    school = models.CharField(max_length=45, null=False, default="")
    introduction = models.TextField(max_length=255, blank=True, default="")
    ability = ArrayField(
        models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(100)]),
        size=5,                                     # 이해(퀴즈점수), 맞춤법(hanspell점수), 표현, 구성, 내용
        default=list([0,0,0,0,0])
    )
    genres = ArrayField(
        models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(100)]),
        size=5,                                     # 소설, 수필, 희곡, 전기, 비문학
        default=list([0,0,0,0,0])
    )
    tier = models.SmallIntegerField(default=0)

    def __str__(self):
        return self.nickname