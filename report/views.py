from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import BookReport
from .serializer import BookReportSerializer

class ReportView(APIView):
    def get(self, request):
        users = BookReport.objects.all()
        serializer = BookReportSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = BookReportSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
