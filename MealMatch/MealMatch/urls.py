"""MealMatch URL Configuration
"""
from django.conf.urls import include, url
from rest_framework_mongoengine import routers

# from MealMatch.recipes.viewsets import viewsets
from recipes.viewsets import *

router = routers.DefaultRouter()

### here we register the different api sites ###
router.register(r'recipe', recipeViewSet,r"recipe")
router.register(r'mapped', mappedViewSet,r"mapped")

urlpatterns = [

    ##main application urls
    url(r'^recipes/', include("recipes.urls")),
    url(r'^account_functions/', include("account_functions.urls")),
    url(r'^', include("recipes.urls")), #varför har vi två länkar som inklucerar recipes?

    ##API urls
    url(r'^api/', include(router.urls, namespace = 'api') )

]


