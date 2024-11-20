from django.urls import path
from . import views


urlpatterns = [
    path("houses/", views.HouseListCreate.as_view(), name="house-list"),
    path("houses/delete/<int:pk>/", views.HouseDelete.as_view(),name="delete-house"),
]
