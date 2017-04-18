from django.shortcuts import render
from mongoengine import *
from django.http import HttpResponse
from .models import *
from pymongo import *
import sys
from django.core import serializers
from django.http import JsonResponse
from bson.json_util import dumps
import re
from bson.objectid import ObjectId
import bson
from django.core import serializers
import json
import time
from collections import OrderedDict
import math



############# VIEW FUNCTIONS #####################
def startpage(request):
    return render(request, "startpage.html")

def presentRecipe(request): #Queries and renders a recipe based on an objectid
    print("present recipe: ", request.method)
    if request.method == "GET": #When the page is retrieved
        print("present recipe, get request")
        req_id = request.path[-24:] #Extracts the id from the path
        recipe_response = recipe.objects.get(_id = ObjectId(req_id))#Runs query with the request ID
        return render(request, "presenterarecept.html", {"recipe": recipe_response})
    if request.method == "POST":
        pass

def retrieveRecipes(request): #queries user inputs on database (mapped collection and query_recipe)
    print("retrieve recipe: ", request.method)
    if request.method == "GET":
        input = request.COOKIES.get('input').split(',') #Splits the query based on ,
        for element in input:
            element = sanitize(element) #Sanitizses !! IMPORTANT !!


        query_mapped = mapped.objects(id__in=input).only('value').key_frequency() #queries from the mapped colletion and does a key_frequency check
        ##if we want, we can add a new computed field to query_mapped which adds a parameter for relevance (such as clicks*rating*match % )

        sorted_list = OrderedDict(reversed(sorted(query_mapped.items(), key=lambda x: (x[1]['frequency']/x[1]['ing_count'], x[1]['clicks'], x[1]['rating'])))) #Sorts list based on frequency

        return render(request, "recipes.html", {"recipe_array": sorted_list})
    else:
        startpage(request)

def autocorrect(request): #autocorrect implementation
    input = sanitize(request.POST['input'])  # gets the user input and sanitizses using sanitize()
    if (len(input) > 0):

        array = []
        foods = food_ref.objects(food__istartswith=input)  # checks if any word starts with the user input
        for element in foods:
            array.append(element.food)  # appends matches to an initially empty array
        array = dumps(array)  # dumps the aray to JSON format
        return JsonResponse(array, safe=False)  # returns a JSONResponse to client-side
    else:
        return render(request, "startpage.html") #if there is no input, do as before


############# HELPER FUNCTIONS #############
def sanitize(user_string):
    user_string = re.sub("[^a-öA-Ö],[^-]","", user_string) #removes non alphabetic characters but allows whitespcae and single dash
    user_string = re.sub("--", "", user_string)#removes double dash to prevent injections
    return user_string




