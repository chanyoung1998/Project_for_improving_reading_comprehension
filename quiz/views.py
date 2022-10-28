from rest_framework import generics, status
from rest_framework.exceptions import ParseError
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Quiz
from .serializer import QuizSerializer, AnswerSerializer

class QuizView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, title, chapter):
        if not 'quiz_number' in request.GET:
            raise ParseError("query is not correct - \"/?quiz_number=<int>\"")

        quiz_number = request.GET['quiz_number']
        if not Quiz.objects.filter(content__book__title=title, content__chapter=chapter, quiz_number=quiz_number):
            return Response(status=status.HTTP_404_NOT_FOUND)
        quiz = Quiz.objects.filter(content__book__title=title, content__chapter=chapter).get(quiz_number=quiz_number)
        serializer = QuizSerializer(quiz)
        return Response(serializer.data)

    def put(self, request, title, chapter):
        quiz_number = request.POST['quiz_number']
        answer = request.POST['answer']
        quiz = Quiz.objects.filter(content__book__title=title, content__chapter=chapter).get(quiz_number=quiz_number)
        serializer = AnswerSerializer(data={
            "user": request.user,
            "quiz": quiz,
            "answer": answer
        })
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data)
