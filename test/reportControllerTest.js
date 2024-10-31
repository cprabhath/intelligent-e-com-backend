const expect = require('chai').expect;
const { createDailyReport, createMonthlyReport, createYearlyReport } = require('../controller/ReportController');

describe('Report Controller Tests', function() {

  describe('Daily Report Test', function() {
    it('should create a daily report', async function() {
      // Setup mock request and response
      let req = {};
      let res = {
        status: function(code) {
          return this;
        },
        json: function(data) {
          // Assert
          expect(data).to.be.an('object');
          // Add more assertions here based on what you expect in 'data'
        }
      };
      // Call the function
      await createDailyReport(req, res);
    }).timeout(100000);
  });

  describe('Monthly Report Test', function() {
    it('should create a monthly report', async function() {
      // Setup mock request and response
      let req = {};
      let res = {
        status: function(code) {
          return this;
        },
        json: function(data) {
          // Assert
          expect(data).to.be.an('object');
          // Add more assertions here based on what you expect in 'data'
        }
      };
      // Call the function
      await createMonthlyReport(req, res);
    }).timeout(100000);
  });

  describe('Yearly Report Test', function() {
    it('should create a yearly report', async function() {
      // Setup mock request and response
      let req = {};
      let res = {
        status: function(code) {
          return this;
        },
        json: function(data) {
          // Assert
          expect(data).to.be.an('object');
          // Add more assertions here based on what you expect in 'data'
        }
      };
      // Call the function
      await createYearlyReport(req, res);
    }).timeout(100000);
  });
});
