const expect = require('chai').expect;
const request = require('request');

describe("Check home page", function () {
    const url = "http://localhost:3000/";
    it("Return 200 if api works", function (done) {
        request(url, function (err, res, body) {
            //console.log(res);
            //console.log(`Err : ${err}`);
            //console.log(`Body : ${body}`);
            expect(res.statusCode).to.equal(200);
            done();
        })
    })
})

describe("Check food page", () => {
    const url = "http://localhost:3000/search";
    it("Return 200 if api works FOOD PAGE", (done) => {
        request(url, (err, res, body) => {
            expect(res.statusCode).to.equal(200);
            done();
        })
    })
})
describe("Check requests page", () => {
    const url = "http://localhost:3000/search_request";
    it("Return 200 if api works REQUEST PAGE", (done) => {
        request(url, (err, res, body) => {
            expect(res.statusCode).to.equal(200);
            done();
        })
    })
})