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
                "https://fred.stlouisfed.org/series/LNS11300001"]},
    {"id": "une",
     "links": ["https://fred.stlouisfed.org/series/LNU04027662",
                "https://fred.stlouisfed.org/series/LNS14027660",
                "https://fred.stlouisfed.org/series/LNU04027659"]},
    {"id": "wag",
     "links": ["https://fred.stlouisfed.org/series/WASCUR",
                "https://fred.stlouisfed.org/series/A038RC1Q027SBEA"]},
    {"id": "job",
     "links": ["https://fred.stlouisfed.org/series/LMJVTTUVUSM647S",
                "https://fred.stlouisfed.org/series/JTS1000HIL"]},
    {"id": "ear",
     "links": ["https://lehd.ces.census.gov/data/pseo_beta.html"]}

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

@app.route("/wages")
def wages():
    return render_template('wages.html', title="Wages - Salary and Benefits", data_sources=data_sources, unique_id="wag")

@app.route("/vacancies")
def vacancies():
    return render_template('vacancies.html', title="Job Vacancies vs. Hires", data_sources=data_sources, unique_id="job")

@app.route("/earnings_b_t")
def earnings_b_t():
    return render_template('earnings_b_t.html', title="Earnings by Degree - Bachelors (Top 20)", data_sources=data_sources, unique_id="ear")

@app.route("/earnings_b_b")
def earnings_b_b():
    return render_template('earnings_b_b.html', title="Earnings by Degree - Bachelors (Bottom 20)", data_sources=data_sources, unique_id="ear")

@app.route("/earnings_m")
def earnings_m():
    return render_template('earnings_m.html', title="Earnings by Degree - Masters", data_sources=data_sources, unique_id="ear")

@app.route("/earnings_d")
def earnings_d():
    return render_template('earnings_d.html', title="Earnings by Degree - Doctorate", data_sources=data_sources, unique_id="ear")

@app.route("/data_page")
def data_page():
    return render_template('data.html', title="Data")

if __name__ == "__main__":
    app.run(debug=True)


