import pandas as pd
from splinter import Browser
from bs4 import BeautifulSoup
import pymongo








def init_browser():
    
    executable_path = {'executable_path': '/c/Users/Will/Anaconda3/Scripts/chromedriver'}
    return Browser('chrome', headless=True)


def scrape_article():
    browser = init_browser()
    article = {}

    url='https://mars.nasa.gov/news/?page=0&per_page=40&order=publish_date+desc%2Ccreated_at+desc&search=&category=19%2C165%2C184%2C204&blank_scope=Latest'

    browser.visit(url)

    html = browser.html
    soup = BeautifulSoup(html, "html.parser")

    article['title'] = soup.find("div", class_="content_title").get_text()
    article['p'] = soup.find("div", class_="article_teaser_body").get_text()
    
    return article

def scrape_jpl():
    browser = init_browser()
    url= 'https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
    browser.visit(url)

    html = browser.html
    soup = BeautifulSoup(html, "html.parser")

    image_soup = soup.find("a", class_="button fancybox")

    image_partial = image_soup['data-fancybox-href']
    image_link = f"https://www.jpl.nasa.gov{image_partial}"
    image_dict = {"link": image_link}
    
    return image_dict

def scrape_weather():
    browser = init_browser()
    url = 'https://twitter.com/marswxreport?lang=en'
    browser.visit(url)
    
    html = browser.html
    soup = BeautifulSoup(html, "html.parser")
    
    url = 'https://twitter.com/marswxreport?lang=en'
    browser.visit(url)
    
    html = browser.html
    soup = BeautifulSoup(html, "html.parser")
    
    weather_scrape = soup.find("li", {"data-item-type": "tweet"})
    weather_content = weather_scrape.find("p", {"class": "TweetTextSize TweetTextSize--normal js-tweet-text tweet-text"})
    images_in_text = weather_scrape.find_all("a", class_="twitter-timeline-link u-hidden")
    weather_text = weather_content.text
    for image in images_in_text:
        weather_text = weather_content.replace(image.text, '')
    
    weather_dict = {'info': weather_text}

    return weather_dict
    
def scrape_facts():
    url = 'https://space-facts.com/mars/'
    fact_table = pd.read_html(url)
    fact_df = pd.DataFrame(fact_table[0])
    fact_html = fact_df.to_html(header=False, index=False)
    fact_dict = {'facts': fact_html}
    
    return fact_dict

def scrape_image():
    browser = init_browser()
    url = 'http://www.planetary.org/multimedia/space-images/mars/'
    browser.visit(url)

    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')

    image_scrape = soup.find_all('ul', class_='grid')

    image_block= image_scrape[0].find_all('img')

    image_list = []
    for image in image_block:
        image_dict = {}
        image_dict['caption'] = image['alt']
        image_dict['link'] = image['src']
        image_list.append(image_dict)

    return image_list
