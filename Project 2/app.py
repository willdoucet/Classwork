from flask import Flask, render_template, url_for, flash, redirect

app = Flask(__name__)

data_sources = [
    {"id": "lfa",
     "links": ["https://fred.stlouisfed.org/series/CIVPART",
            "https://fred.stlouisfed.org/series/LNS11300012",
            "https://fred.stlouisfed.org/series/LNS11300036",
            "https://fred.stlouisfed.org/series/LNS11300060",
            "https://fred.stlouisfed.org/series/LNU01324230"]},
    {"id": "lfg",
     "links": ["https://fred.stlouisfed.org/series/CIVPART",
                "https://fred.stlouisfed.org/series/LNS11300002",
                "https://fred.stlouisfed.org/series/LNS11300001"]}
]


@app.route("/")
@app.route("/home")
def home():
    return render_template('index.html', title="Project Overview")

@app.route("/visualizations")
def visualizations():
    return render_template('visualizations.html', title="Visualizations")

@app.route("/labor_age")
def labor_age():
    return render_template('labor_age.html', title="Labor Force Data by Age", data_sources=data_sources, unique_id="lfa")

@app.route("/labor_gender")
def labor_gender():
    return render_template('labor_gender.html', title="Labor Force Data by Gender", data_sources=data_sources, unique_id="lfg")

@app.route("/unemployment_education")
def unemployment_education():
    return render_template('unemployment_education.html', title="Unemployment Rate by Level of Education", data_sources=data_sources, unique_id="une")


if __name__ == "__main__":
    app.run(debug=True)


