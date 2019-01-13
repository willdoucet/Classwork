from flask import Flask, render_template, redirect, request
from flask_pymongo import PyMongo
from splinter.driver.flaskclient import FlaskClient
import scrape_mars
from splinter import Browser

app = Flask(__name__)

app.config['MONGO_URI'] = 'mongodb://localhost:27017/mars_db'
mongo = PyMongo(app)

@app.route('/')
def index():

    articles = mongo.db.articles.find_one()
    jpl = mongo.db.jpl.find_one()
    weather = mongo.db.weather.find_one()
    facts = mongo.db.facts.find_one()
    images = mongo.db.images.find()

    return render_template('index.html', article=articles, jpl=jpl, weather=weather, facts=facts, images=images)

@app.route('/scrape')
def scrape():

    article_info = scrape_mars.scrape_article()
    mongo.db.articles.update({}, article_info, upsert=True)

    featured = scrape_mars.scrape_jpl()
    mongo.db.jpl.update({}, featured, upsert=True)

    weather_stuff = scrape_mars.scrape_weather()
    mongo.db.weather.update({}, weather_stuff, upsert=True)

    facts = scrape_mars.scrape_facts()
    mongo.db.facts.update({}, facts, upsert=True)

    images = scrape_mars.scrape_image()
    mongo.db.images.remove({})

    for image in images:

        mongo.db.images.insert(image)



    return redirect("/")


if __name__ == "__main__":
    app.run(debug=True)