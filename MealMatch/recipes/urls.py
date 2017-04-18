from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.startpage, name = "startpage" ),


    url(r'^recipes', views.retrieveRecipes, name="recipes"),
    url(r'^autocorrect', views.autocorrect, name="autocorrect"),
    url(r'^presenterarecept/', views.presentRecipe, name="presenterarecept"),

    #url(r'^recipe_match', views.recipes, name="recipe_match"),


    ]