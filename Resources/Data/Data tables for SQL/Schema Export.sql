-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/v9lXvw
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "Market" (
    "Market_id" INT   NOT NULL,
    "Market_name" VARCHAR   NOT NULL,
    "Market_state" VARCHAR   NOT NULL,
    "State_code" VARCHAR   NOT NULL,
    "FIPS_code" VARCHAR   NOT NULL,
    "Lat" FLOAT   NOT NULL,
    "Long" FLOAT   NOT NULL,
    CONSTRAINT "pk_Market" PRIMARY KEY (
        "Market_id"
     )
);

CREATE TABLE "Avocado_Market_Data" (
    "Date" VARCHAR   NOT NULL,
    "Quarter" VARCHAR   NOT NULL,
    "Year" INT   NOT NULL,
    "Market_id" INT   NOT NULL,
    "AveragePrice" FLOAT   NOT NULL,
    "Total_Vol" FLOAT   NOT NULL,
    "Small_Vol" FLOAT   NOT NULL,
    "Large_Vol" FLOAT   NOT NULL,
    "XLarge_Vol" FLOAT   NOT NULL,
    "Type" VARCHAR   NOT NULL
);

CREATE TABLE "Avocado_TotalUS_Data" (
    "Date" VARCHAR   NOT NULL,
    "Quarter" VARCHAR   NOT NULL,
    "Year" INT   NOT NULL,
    "Average_Price" FLOAT   NOT NULL,
    "Total_Volume" FLOAT   NOT NULL,
    "Small_Vol" FLOAT   NOT NULL,
    "Large_Vol" FLOAT   NOT NULL,
    "Ex_Large_Vol" FLOAT   NOT NULL,
    "Type" VARCHAR   NOT NULL
);

CREATE TABLE "Demographic_2015" (
    "Market_id" INT   NOT NULL,
    "Lat" FLOAT   NOT NULL,
    "Long" FLOAT   NOT NULL,
    "Total_population" FLOAT   NOT NULL,
    "Non_White_pop" FLOAT   NOT NULL,
    "Diversity%" FLOAT   NOT NULL,
    "Millenial_pop" FLOAT   NOT NULL,
    "Millenial%" FLOAT   NOT NULL,
    "Median_income" FLOAT   NOT NULL
);

CREATE TABLE "Demographic_2016" (
    "Market_id" INT   NOT NULL,
    "Lat" FLOAT   NOT NULL,
    "Long" FLOAT   NOT NULL,
    "Total_population" FLOAT   NOT NULL,
    "Non_White_pop" FLOAT   NOT NULL,
    "Diversity%" FLOAT   NOT NULL,
    "Millenial_pop" FLOAT   NOT NULL,
    "Millenial%" FLOAT   NOT NULL,
    "Median_income" FLOAT   NOT NULL
);

CREATE TABLE "Demographic_2017" (
    "Market_id" INT   NOT NULL,
    "Lat" FLOAT   NOT NULL,
    "Long" FLOAT   NOT NULL,
    "Total_population" FLOAT   NOT NULL,
    "Non_White_pop" FLOAT   NOT NULL,
    "Diversity%" FLOAT   NOT NULL,
    "Millenial_pop" FLOAT   NOT NULL,
    "Millenial%" FLOAT   NOT NULL,
    "Median_income" FLOAT   NOT NULL
);

CREATE TABLE "TotalUS_demo" (
    "Year" INT   NOT NULL,
    "Total_population" FLOAT   NOT NULL,
    "Non_White_pop" FLOAT   NOT NULL,
    "Diversity%" FLOAT   NOT NULL,
    "Millenial_pop" FLOAT   NOT NULL,
    "Millenial%" FLOAT   NOT NULL,
    "Median_income" FLOAT   NOT NULL
);

ALTER TABLE "Avocado_Market_Data" ADD CONSTRAINT "fk_Avocado_Market_Data_Market_id" FOREIGN KEY("Market_id")
REFERENCES "Market" ("Market_id");

ALTER TABLE "Demographic_2015" ADD CONSTRAINT "fk_Demographic_2015_Market_id" FOREIGN KEY("Market_id")
REFERENCES "Market" ("Market_id");

ALTER TABLE "Demographic_2016" ADD CONSTRAINT "fk_Demographic_2016_Market_id" FOREIGN KEY("Market_id")
REFERENCES "Market" ("Market_id");

ALTER TABLE "Demographic_2017" ADD CONSTRAINT "fk_Demographic_2017_Market_id" FOREIGN KEY("Market_id")
REFERENCES "Market" ("Market_id");


