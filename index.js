const http = require('http');
const fs = require("fs");
const fetch = require("node-fetch");
const express = require('express');
const app = express();
const path = require("path");



let resText;
let resObj;
let resArr = [];
let cityName;
const data = fs.readFileSync('index.html', 'utf8');
let replaceData;

const loadData = (tempData, orgData) => {

    replaceData = tempData.replace("{%cityName%}", orgData.resolvedAddress);
    let TempVal = orgData.days[0].temp;
    let tempConvert = Math.round(((TempVal - 32) / 1.8));
    replaceData = replaceData.replace("{%temPerature%}", tempConvert);
    replaceData = replaceData.replace("{%icon%}", orgData.days[0].icon);



    console.log(replaceData);
}





http.createServer((req, res) => {


    if (req.url === "/") {

        res.setHeader('Content-type', 'text/html');
        res.write(replaceData);


        app.post("/", (req, res) => {


            console.log(req.body);


        })

        // try {
        //     console.log(req.body);
        // } catch (err) {
        //     console.log(err);
        // } finally {
        //     res.end();
        // }


        res.statusCode = 200;
        res.end();

    } else if (req.url == '/style.css') {
        res.setHeader('Content-type', 'text/css');
        res.write(fs.readFileSync('style.css'));
        res.end();
    } else if (req.url == '/images/weatherBack.jpg') {
        res.setHeader('Content-type', 'text/css');
        res.write(fs.readFileSync('images/weatherBack.jpg'));
        res.end();
    } else {
        res.write("invalid request")
        res.end();
    }
}).listen(3000);



fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Jaipur/?key=CPHC9J6WCKE4NYTHJMA3FKQMP')
    .then(res => res.json())
    .then(text => {

        resText = JSON.stringify(text);
        resObj = JSON.parse(resText);
        resArr = [resObj];

        // console.log(resArr);
        resArr.map((mapData, index) => loadData(data, mapData));


        // cityName = resArr[0].name;
        // temperature = resArr[0].main.temp;

        // loadData(data, cityName);
        // loadData(data, temperature);

        // console.log(cityName);

    });